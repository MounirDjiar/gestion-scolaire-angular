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

import {en} from "@fullcalendar/core/internal-common";
import * as moment from "moment";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements AfterViewInit , OnInit {

  schoolID!:string;
  teachersList: Teacher[] = [];
  lessonsList: Lesson[] = [];
  clazzsList: Clazz[] = [];
  classroomsList: Classroom[] = [];
  showForm = true;
  form: any = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private schoolService: SchoolService
  ){
  }

  ngOnInit(): void {
    // Get school id from url
    this.schoolID = this.activatedRoute.snapshot.paramMap.get('schoolId') || '';

    this.schoolService.findClassroomsBySchoolId(Number(this.schoolID)).subscribe(
      classrooms => {
        this.classroomsList = classrooms;
      });

    this.schoolService.findLessonsBySchoolId(Number(this.schoolID)).subscribe(
      lessonsList => {
        this.lessonsList = lessonsList;
      });

    this.schoolService.findClazzsBySchoolId(Number(this.schoolID)).subscribe(
      clazzsList => {
        this.clazzsList = clazzsList;
      });

    this.schoolService.findTeachersBySchoolId(Number(this.schoolID)).subscribe(
      teachersList => {
        this.teachersList = teachersList;
      });

    this.form = {
      title: '',
      teacher: '',
      classroom: '',
      studentClass: '',

    };


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
    slotMinTime: '07:00:00',
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

      {
        title: 'Cours de Physique avec les 6ème B',
        start: '2023-02-20T08:00:00',
        end: '2023-02-20T10:00:00',
        color: '#378006',
        textColor: 'white',
        editable: true,
        durationEditable: true,
        startEditable: true,
        extendedProps: [{
          salle: 'B102',
          professeur: 'Martin'
        }]
      }
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

  /*
    handleSelect(selectInfo: any) {


      const title = prompt('Event Title:');
      const teacher = prompt('Prof:');
      const classroom = prompt('Salle de classe:');
      const studentClass = prompt('Classe d\' élèves:');
      const calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
      if (title) {
        calendarApi.addEvent({
          title,
          teacher,
          classroom,
          studentClass,
          color: "green",
          editable: true,
          durationEditable: true,
          startEditable: true,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
        });
      }
    }

  */
  handleSelect(selectInfo: any) {
    this.form = {
      day:'',
      start:'',
      end:'',
      teacher: '',
      lesson: '',
      classroom: '',
      clazz: ''
    };
    this.showForm = true;
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    console.log("here")
    console.log(this.showForm)
  }

  createEvent() {
    const title = `${this.form.lesson} - ${this.form.teacher} - ${this.form.clazz} - ${this.form.classroom}`;

    const day = moment(this.form.day, 'YYYY-MM-DD');
    const start = moment(this.form.start, 'HH:mm');
    const end = moment(this.form.end, 'HH:mm');
    const calendarApi = this.calendarComponent.getApi();

    const startDate = day.clone().set({
      hour: start.hour(),
      minute: start.minute(),
      second: 0,
      millisecond: 0
    });
    const endDate = day.clone().set({
      hour: end.hour(),
      minute: end.minute(),
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

    this.showForm = true;
  }



  /*
  handleEventClick(clickInfo: any) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'?`
      )
    ) {
      clickInfo.event.remove();
    }
  }
  */

}
