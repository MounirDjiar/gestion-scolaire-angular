import { Injectable } from '@angular/core';
import {environment} from "../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Lesson} from "../models/lesson.model";
import {Observable} from "rxjs";
import {Schedule} from "../models/schedule.model";
import {Classroom} from "../models/classroom.model";
import {Teacher} from "../models/teacher.model";
import {School} from "../models/school.model";
import {Clazz} from "../models/clazz.model";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private apiUrl = environment.production ? environment.apiUrl +'/schedules' : environment.scheduleMock;
  constructor(private httpSchedule: HttpClient) { }

  add(value: Schedule): Observable<Schedule> {
    return this.httpSchedule.post<Schedule>(`${this.apiUrl}`, value)
  }

  delete(id: number): Observable<void> {
    return this.httpSchedule.delete<void>(`${this.apiUrl}/${id}`)
  }

  getAll(): Observable<Schedule[]> {
    return this.httpSchedule.get<Schedule[]>(this.apiUrl);
  }

  getOne(id: number): Observable<Schedule> {
    return this.httpSchedule.get<Schedule>(`${this.apiUrl}/${id}`);
  }

  getTeacherByScheduleId(id:number): Observable<Teacher> {
    return this.httpSchedule.get<Teacher>(`${this.apiUrl}/${id}/teacher`);
  }
  getSchoolByScheduleId(id:number): Observable<School> {
    return this.httpSchedule.get<School>(`${this.apiUrl}/${id}/school`);
  }
  getClazzByScheduleId(id:number): Observable<Clazz> {
    return this.httpSchedule.get<Clazz>(`${this.apiUrl}/${id}/clazz`);
  }
}
