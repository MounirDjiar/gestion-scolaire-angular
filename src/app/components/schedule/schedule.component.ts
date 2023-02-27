import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, DateSelectArg} from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import {FullCalendarComponent} from "@fullcalendar/angular";
import {ActivatedRoute} from "@angular/router";
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

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements AfterViewInit , OnInit {

  // Le type du planning
  @Input()
  typePlanning: string = '';

  displayTeachers = false;
  displayLessons = false;
  displayClassrooms = false;
  displayClazzs = false;

  classroomID!: string
  teacherID!:string
  clazzID!: string
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
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ){
  }

  ngOnInit(): void {

    // Get school id from url
    this.schoolID = this.activatedRoute.snapshot.paramMap.get('schoolId') || '';
    this.typePlanning = this.activatedRoute.snapshot.paramMap.get('type') || '';
    this.form = this.formBuilder.group({
      day:'',
      startingHour:'',
      endingHour:'',
      lesson: this.formBuilder.group({
        id: ''
      }),
      teacher:  this.formBuilder.group({
        id: ''
      }),
      classroom:  this.formBuilder.group({
        id: ''
      }),
      clazz:  this.formBuilder.group({
        id: ''
      }),
      school: {
        id: this.schoolID
      }
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
    slotDuration: '01:00:00',
    slotLabelInterval: '01:00:00',
    slotLabelFormat: { hour: 'numeric', minute: '2-digit', hour12: false },
    eventTimeFormat: { hour: 'numeric', minute: '2-digit', hour12: false },
    dayHeaders: true,
    height: 'auto',
    slotMinTime: '08:00:00',
    slotMaxTime: '19:00:00',
    visibleRange: {
      start: '2023-02-27', // lundi
      end: '2023-03-05', // samedi
    },
    dayHeaderFormat: { weekday: 'long' }, // afficher le jour en français
    headerToolbar: {
      left: '',
      center: '',
      right: ''
    },
    selectable: true,
    selectMirror: true,
    eventResizableFromStart: true,
    select: this.handleSelect,
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
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
  }

  createEvent() {

   switch (this.typePlanning) {
      case 'clazz':
        this.form.value.clazz.id = this.clazzID;
        break;
      case 'teacher':
        this.form.value.teacher.id = this.teacherID;
        break;
    }

    this.scheduleService.add(this.form.value)
      .subscribe(schedule =>
        this.displaySchedule(schedule)
      );
  }

  open(content: any) {
    this.currentModal = this.modalService.open(content)
  }

  clazzSelected(target:any) {

    if(!this.teacherID){

      console.log("PAS DE TEACHER JE SUIS DANS CLAZZ")

      // Get lessons list
      this.schoolService.findLessonsBySchoolId(Number(this.schoolID)).subscribe(
        lessons => {
          this.lessonsList = lessons;
          this.displayLessons = true;
        });
    } else {

      console.log("JE SUIS DANS TECHER")

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
        this.scheduleService.findClassroomsBySchoolIdAndLessonId(
          Number(this.schoolID),
          Number(this.form.value.lesson.id),
        ).subscribe(
          classrooms => {
            this.classroomsList = classrooms;
            this.displayClassrooms = true;
          });
        break;
    }
  }

  teacherSelected(target:any) {

    switch (this.typePlanning) {
      case 'clazz':
        // Get classrooms list
        this.scheduleService.findClassroomsBySchoolIdAndLessonId(
          Number(this.schoolID),
          Number(this.form.value.lesson.id),
        ).subscribe(
          classrooms => {
            this.classroomsList = classrooms;
            this.displayClassrooms = true;
          })
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
        // Get class id from url
        this.clazzID = this.activatedRoute.snapshot.paramMap.get('id') || '';
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
        this.teacherID = this.activatedRoute.snapshot.paramMap.get('id') || '';
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

    const calendarApi = this.calendarComponent.getApi();

    for (let schedule of this.schedules) {

      // Display and format one schedule
      calendarApi.addEvent(this.displaySchedule(schedule));
    }
  }

  private displaySchedule(schedule: Schedule): any {

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

    return {
      title: this.getTitleOfSchedule(schedule),
      color: schedule.lesson.color,
      editable: true,
      durationEditable: true,
      startEditable: true,
      start: startDate.toISOString(),
      end: endDate.toISOString()
    }
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
