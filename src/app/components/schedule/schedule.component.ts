import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements AfterViewInit , OnInit {

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
  form!: FormGroup;
  currentModal: NgbModalRef | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private schoolService: SchoolService,
    private scheduleService: ScheduleService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ){
  }

  ngOnInit(): void {
    // Get school id from url
    this.schoolID = this.activatedRoute.snapshot.paramMap.get('schoolId') || '';

    this.schoolService.findClazzsBySchoolId(Number(this.schoolID)).subscribe(
    clazzsList => {
      this.clazzsList = clazzsList;
    });

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
      })
    });

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
      start: '2023-02-20', // lundi
      end: '2023-02-26', // samedi
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

    //const title = `${this.form.value.lesson} - ${this.form.value.teacher} - ${this.form.value.clazz} - ${this.form.value.classroom}`;
    const title = "Hello";
    const day = moment(this.form.value.day, 'YYYY-MM-DD');
    const startingHour = moment(this.form.value.startingHour, 'HH:mm');
    const endingHour = moment(this.form.value.endingHour, 'HH:mm');
    const calendarApi = this.calendarComponent.getApi();

    const startDate = day.clone().set({
      hour: startingHour.hour(),
      minute: startingHour.minute(),
      second: 0,
      millisecond: 0
    });

    const endDate = day.clone().set({
      hour: startingHour.hour(),
      minute: startingHour.minute(),
      second: 0,
      millisecond: 0
    });

    calendarApi.addEvent({
      title,
      color: "green",
      editable: true,
      durationEditable: true,
      startEditable: true,
      start: startDate.toISOString(),
      end: endDate.toISOString()
    });

    this.scheduleService.add(this.form.value)
      .subscribe(val => {
        console.log('Event created:', val);
      });

  }

  open(content: any) {
    this.currentModal = this.modalService.open(content)
  }

  clazzSelected(target:any) {

    // Get lessons list
    this.scheduleService.findLessonsBySchoolIdAndClazzId(Number(this.schoolID), Number(this.clazzID)).subscribe(
      lessons => {
        this.lessonsList = lessons;
        this.displayLessons = true;
      });
  }

  lessonSelected(target:any) {
    // Get teachers list
    this.scheduleService.findTeachersBySchoolIdAndClazzIDAndLessonId(Number(this.schoolID), Number(this.clazzID), Number(this.lessonID)).subscribe(
      teachers => {
        this.teachersList = teachers;
        this.displayTeachers = true;
      });
  }

  teacherSelected(target:any) {
    // Get classrooms list
    this.scheduleService.findClassroomsBySchoolIdAndClazzIdAndLessonIdAndTeacherID(
              Number(this.schoolID),
              Number(this.clazzID),
              Number(this.lessonID),
              Number(this.teacherID)
    ).subscribe(
      classrooms => {
        this.classroomsList = classrooms;
        this.displayClassrooms = true;
      });
  }

  classroomSelected(target:any) {

  }

}
