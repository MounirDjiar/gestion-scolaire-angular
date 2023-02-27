import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Teacher} from "../models/teacher.model";
import {environment} from "../environments/environment.development";
import {Lesson} from "../models/lesson.model";
import {Clazz} from "../models/clazz.model";
import {Schedule} from "../models/schedule.model";




@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl = environment.production ? environment.apiUrl +'/teachers' : environment.teacherMock;

  constructor(private httpTeacher: HttpClient) { }

  add(value: Teacher): Observable<Teacher> {
    return this.httpTeacher.post<Teacher>(`${this.apiUrl}`, value)
  }

  delete(id: number): Observable<void> {
    return this.httpTeacher.delete<void>(`${this.apiUrl}/${id}`)
  }

  getAll(): Observable<Teacher[]> {
    return this.httpTeacher.get<Teacher[]>(this.apiUrl);
  }

  getOne(id: number): Observable<Teacher> {
    return this.httpTeacher.get<Teacher>(`${this.apiUrl}/${id}`);
  }
  getTaughtLessonsByTeacherId(id: number): Observable<Lesson[]> {
    return this.httpTeacher.get<Lesson[]>(`${this.apiUrl}/${id}/taughtlessons`);
  }
  getMainClazzsByTeacherId(id: number): Observable<Clazz[]> {
    return this.httpTeacher.get<Clazz[]>(`${this.apiUrl}/${id}/mainclazzs`);
  }

  getTotalMainClazzByTeacherId(id: number): Observable<number> {
    return this.httpTeacher.get<number>(`${this.apiUrl}/${id}/totalmainclazzs`);
  }
  getSchedulesByTeacherId(id: number): Observable<Schedule[]> {
    return this.httpTeacher.get<Schedule[]>(`${this.apiUrl}/${id}/schedules`);
  }
}
