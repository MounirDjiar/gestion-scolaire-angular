import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment.development";
import {Schedule} from "../models/schedule.model";
import {Clazz} from "../models/clazz.model";
import {Lesson} from "../models/lesson.model";
import {Teacher} from "../models/teacher.model";
import {Classroom} from "../models/classroom.model";

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

  findLessonsBySchoolIdAndClazzId(schoolID: number, clazzID: number) : Observable<Lesson[]> {
    return this.httpSchedule.get<Lesson[]>(`http://localhost:8087/gestionscolaire/schools/${schoolID}/lessons`);

  }

  findTeachersBySchoolIdAndClazzIDAndLessonId(schoolID: number, clazzID: number, lessonID: number) : Observable<Teacher[]> {
    return this.httpSchedule.get<Teacher[]>(`http://localhost:8087/gestionscolaire/schools/${schoolID}/teachers`);
  }

  findClassroomsBySchoolIdAndClazzIdAndLessonIdAndTeacherID(schoolID: number, clazzID: number, lessonID: number, teacherID: number) : Observable<Classroom[]> {
    return this.httpSchedule.get<Classroom[]>(`http://localhost:8087/gestionscolaire/schools/${schoolID}/classrooms`);
  }
}
