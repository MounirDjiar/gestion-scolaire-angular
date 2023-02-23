import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    titleFormat: { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' },
    slotDuration: '01:00:00',
    slotLabelInterval: '01:00:00',
    slotLabelFormat: { hour: 'numeric', minute: '2-digit', hour12: true },
    dayHeaders: true,
    height: 'auto',
    plugins: [timeGridPlugin],
    events: [
      {
        title: 'Cours de Physique avec les 6ème B',
        start: '2023-03-06T09:00:00',
        end: '2023-03-06T12:00:00',
        extendedProps: {
          salle: 'B102',
          professeur: 'Martin'
        }
      }
      // liste des événements
    ]

  };

}

/*
    initialView: 'timeGrid',
    columnHeader: false,
    titleFormat: { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' },
    slotDuration: '01:00:00',
    slotLabelInterval: '01:00:00',
    slotLabelFormat: { hour: 'numeric', minute: '2-digit', hour12: true },
    weekends: false,
    allDaySlot: false,
    height: 'auto'
    */
