import {AfterViewInit, Component, Inject, Input, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, DateSelectArg} from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import {FullCalendarComponent} from "@fullcalendar/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {Teacher} from "../../../models/teacher.model";
import {Lesson} from "../../../models/lesson.model";
import {Clazz} from "../../../models/clazz.model";
import {Classroom} from "../../../models/classroom.model";
import {SchoolService} from "../../../services/school.service";

import * as moment from "moment";
import {ScheduleService} from "../../../services/schedule.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Schedule} from "../../../models/schedule.model";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import {ClazzService} from "../../../services/clazz.service";
import {ClassroomService} from "../../../services/classroom.service";
import {LessonService} from "../../../services/lesson.service";
import {TeacherListComponent} from "../teacher-list/teacher-list.component";
import {TeacherService} from "../../../services/teacher.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements AfterViewInit , OnInit {

  // Le type du planning
  @Input()
  typePlanning: string = '';

  currentClazz: Clazz | undefined;
  currentTeacher :Teacher | undefined;

  displayTeachers = false;
  displayLessons = false;
  displayClassrooms = false;
  displayClazzs = false;

  classroomID!: string
  teacherID:string = ''
  clazzID: string = ''
  lessonID!: string

  schoolID!:string;
  teachersList: Teacher[] = [];
  lessonsList: Lesson[] = [];
  clazzsList: Clazz[] = [];
  classroomsList: Classroom[] = [];
  schedules: Schedule[] = [];

  form!: FormGroup;

  currentModal: NgbModalRef | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private schoolService: SchoolService,
    private scheduleService: ScheduleService,
    private clazzService: ClazzService,
    private classroomService: ClassroomService,
    private lessonService: LessonService,
    private teacherService: TeacherService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    @Inject(LOCALE_ID) public locale: string
  ){
  }

  ngOnInit(): void {

    // Get school id from url
    this.schoolID = this.activatedRoute.snapshot.paramMap.get('schoolId') || '';
    this.typePlanning = this.activatedRoute.snapshot.paramMap.get('type') || '';

    switch (this.typePlanning) {
      case 'clazz':
        this.clazzID = this.activatedRoute.snapshot.paramMap.get('id') || '';
        this.clazzService.getOne(Number(this.clazzID)).subscribe(
          clazz => this.currentClazz = clazz
        );
        break;
      case 'teacher':
        this.teacherID = this.activatedRoute.snapshot.paramMap.get('id') || '';
        this.teacherService.getOne(Number(this.teacherID)).subscribe(
          teacher => this.currentTeacher = teacher
        );
        break;
    }

    this.form = this.formBuilder.group({
      day:'',
      startingHour:'',
      endingHour:'',
      lesson: this.formBuilder.group({
        id: ''
      }),
      teacher:  this.formBuilder.group({
        id: this.teacherID
      }),
      classroom:  this.formBuilder.group({
        id: ''
      }),
      clazz:  this.formBuilder.group({
        id: this.clazzID
      }),
      school: this.formBuilder.group({
        id: this.schoolID
      })
    });

    // Get the schedules list
    this.getSchedulesByType();
  }

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  ngAfterViewInit() {
    this.calendarComponent.getApi().render();
  }

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    titleFormat: {  weekday: 'short' },
    hiddenDays: [0],
    allDaySlot: false,
    slotDuration: '01:00',
    slotLabelInterval: '01:00',
    slotLabelFormat: { hour: 'numeric', minute: '2-digit', hour12: false },
    eventTimeFormat: { hour: 'numeric', minute: '2-digit', hour12: false },
    dayHeaders: true,
    height: 'auto',
    slotMinTime: '08:00',
    slotMaxTime: '19:00',
    visibleRange: {
      start: '2023-02-27', // lundi
      end: '2023-03-05', // samedi
    },
    locale: 'fr',
    dayHeaderFormat: { weekday: 'long' },
    headerToolbar: {
      left: '',
      center: '',
      right: ''
    },
    select: this.handleSelect.bind(this),
    selectable: true,
    selectMirror: true,
    eventResizableFromStart: true,
    plugins: [timeGridPlugin, interactionPlugin],
    events: [
    ],
    eventDrop: (info) => {
      console.log(info);
    },
    eventResize: (info) => {
      console.log(info);
    }
  };

  handleEventClick(eventInfo: any) {
    console.log(eventInfo);
  }

  handleSelect(selectInfo: any) {


    switch (this.typePlanning) {
      case 'clazz':
        this.displayTeachers = false;
        this.displayLessons = true;
        this.displayClassrooms = false;
        this.form.get('teacher')?.get('id')?.setValue('');
        break;
      case 'teacher':
        this.displayTeachers = false;
        this.displayLessons = false;
        this.displayClassrooms = false;
        this.displayClazzs = true;
        this.form.get('clazz')?.get('id')?.setValue('');
        break;
    }

    this.form.get('lesson')?.get('id')?.setValue('');
    this.form.get('classroom')?.get('id')?.setValue('');


    this.form.get('startingHour')?.setValue(selectInfo.start.getHours()+":"+selectInfo.start.getMinutes() +"0") ;
    this.form.get('endingHour')?.setValue(selectInfo.end.getHours()+":"+selectInfo.end.getMinutes() +"0") ;
    this.form.get('day')?.setValue(formatDate(selectInfo.start, "YYYY-MM-dd", this.locale));
  }

  createEvent() {
    this.scheduleService.add(this.form.value)
      .subscribe(schedule => {
          this.scheduleService.findById(schedule.id).subscribe(
              resSchedule => {
                this.displaySchedule(resSchedule)

              }
          );
        }
      );
  }

  open(content: any) {
    this.currentModal = this.modalService.open(content);
  }

  clazzSelected(target:any) {

    if(!this.teacherID){
      // Get lessons list
      this.schoolService.findLessonsBySchoolId(Number(this.schoolID)).subscribe(
        lessons => {
          this.lessonsList = lessons;
          this.displayLessons = true;
        });
    } else {
      // Get lessons list by teacher
      this.scheduleService.findLessonsByTeacherID(Number(this.teacherID)).subscribe(
        lessons => {
          this.lessonsList = lessons;
          this.displayLessons = true;
        });
    }

  }

  lessonSelected(target:any) {
    switch (this.typePlanning) {
      case 'clazz':
        // Get teachers list
        this.scheduleService.findTeachersByLessonId(
            Number(this.schoolID),
            Number(this.form.value.lesson.id)
        ).subscribe(
          teachers => {
            this.teachersList = teachers;
            this.displayTeachers = true;
          });
        break;
      case 'teacher':
        this.schoolService.findClassroomsBySchoolId(Number(this.schoolID)).subscribe(
          classrooms => {
            this.classroomsList = classrooms;
            this.displayClassrooms = true;
          });

        /*
        this.scheduleService.findClassroomsBySchoolIdAndLessonId(
          Number(this.schoolID),
          Number(this.form.value.lesson.id),
        ).subscribe(
          classrooms => {
            this.classroomsList = classrooms;
            this.displayClassrooms = true;
          });
         */

        break;
    }
  }

  teacherSelected(target:any) {

    switch (this.typePlanning) {
      case 'clazz':
        // Get classrooms list

        this.schoolService.findClassroomsBySchoolId(Number(this.schoolID)).subscribe(
          classrooms => {
            this.classroomsList = classrooms;
            this.displayClassrooms = true;
          });

        /*
        this.scheduleService.findClassroomsBySchoolIdAndLessonId(
          Number(this.schoolID),
          Number(this.form.value.lesson.id),
        ).subscribe(
          classrooms => {
            this.classroomsList = classrooms;
            this.displayClassrooms = true;
          })
          */
        break;
      case 'teacher':

        // Get clazzs list
        this.scheduleService.findClazzsBySchoolId(
          Number(this.schoolID)
        ).subscribe(
          clazzs => {
            this.clazzsList = clazzs;
            this.displayClazzs = true;
          })

        break;
    }
  }

  classroomSelected(target:any) {

  }

  private getSchedulesByType() {

    switch (this.typePlanning) {
      case 'clazz':
        this.displayLessons = true;
        this.form.value.clazz.id = this.clazzID;

        this.clazzSelected(this.clazzID);

        // Get the schedules list of the current clazz
        this.scheduleService.findSchedulesBySchoolIDAndClazzID(Number(this.schoolID), Number(this.clazzID))
          .subscribe(schedules => {
            this.schedules = schedules;
            // Display the schedules on the calendar
            this.displaySchedules();
            }
          );
        break;
      case 'teacher':

        // Get teacher id from url
        //this.teacherID = this.activatedRoute.snapshot.paramMap.get('id') || '';
        this.form.value.teacher.id = this.teacherID;
        this.teacherSelected(this.teacherID);

        // Get the schedules list of the current clazz
        this.scheduleService.findSchedulesBySchoolIDAndTeacherID(Number(this.schoolID), Number(this.teacherID))
          .subscribe(schedules => {
              this.schedules = schedules;
              // Display the schedules on the calendar
              this.displaySchedules();
            }
          );
        break;
    }
  }

  private displaySchedules() {

    for (let schedule of this.schedules) {
      // Display and format one schedule
      this.displaySchedule(schedule);
    }
  }

  private displaySchedule(schedule: Schedule): any {

    const calendarApi = this.calendarComponent.getApi();

    const day = moment(schedule.day, 'YYYY-MM-DD');
    const startingHour = moment(schedule.startingHour, 'HH:mm');
    const endingHour = moment(schedule.endingHour, 'HH:mm');

    const startDate = day.clone().set({
      hour: startingHour.hour(),
      minute: startingHour.minute(),
      second: 0,
      millisecond: 0
    });

    const endDate = day.clone().set({
      hour: endingHour.hour(),
      minute: endingHour.minute(),
      second: 0,
      millisecond: 0
    });

    calendarApi.addEvent( {
      title: this.getTitleOfSchedule(schedule),
      color: schedule.lesson.color,
      editable: true,
      durationEditable: true,
      startEditable: true,
      start: startDate.toISOString(),
      end: endDate.toISOString()
    });
  }

  private getTitleOfSchedule(schedule: Schedule) : string {

    let title = "";
    let classroomName = schedule.classroom.name;
    let lessonName = schedule.lesson.name;
    let clazzName = schedule.clazz.name;
    let teacherLastName = schedule.teacher.lastName;

    switch (this.typePlanning) {
      case 'clazz':
        title = lessonName + "-" + teacherLastName + "-" + classroomName;
        break;
      case 'teacher':
        title = lessonName + "-" + clazzName + "-" + classroomName;
        break;
    }
    return title;
  }

  generatePDF() {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    const element = this.calendarComponent.getApi().el;

    // Convertir le calendrier en image
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // Ajouter l'image au PDF
      const width = doc.internal.pageSize.width - 20;
      doc.addImage(imgData, 'PNG', 10, 10, width, 0);

      // Enregistrer le fichier PDF
      doc.save('mon_calendrier.pdf');
    });
  }
}
