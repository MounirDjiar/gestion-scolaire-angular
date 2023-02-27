import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment.development";
import {Schedule} from "../models/schedule.model";
import {Teacher} from "../models/teacher.model";
import {Classroom} from "../models/classroom.model";
import {Clazz} from "../models/clazz.model";
import {Lesson} from "../models/lesson.model";

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


  // A FAIRE //////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  findClassroomsBySchoolIdAndLessonId(schoolID: number, lessonID: number) : Observable<Classroom[]> {
    return this.httpSchedule.get<Classroom[]>(`http://localhost:8087/gestionscolaire/schools/${schoolID}/lessons/${lessonID}/classrooms/`);
  }
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  findTeachersByLessonId(schoolID: number, lessonID: number) : Observable<Teacher[]> {
    return this.httpSchedule.get<Teacher[]>(`http://localhost:8087/gestionscolaire/teachers/lessons/${lessonID}`);
  }


  findSchedulesBySchoolIDAndClazzID(schoolID: number, clazzId: number) : Observable<Schedule[]> {
      return this.httpSchedule.get<Schedule[]>(`http://localhost:8087/gestionscolaire/schools/${schoolID}/schedules/clazzs/${clazzId}`);
  }

  findSchedulesBySchoolIDAndTeacherID(schoolID: number, teacherId: number) {
    return this.httpSchedule.get<Schedule[]>(`http://localhost:8087/gestionscolaire/schools/${schoolID}/schedules/teachers/${teacherId}`);
  }

  findClazzsBySchoolId(schoolID: number): Observable<Clazz[]> {
    return this.httpSchedule.get<Clazz[]>(`http://localhost:8087/gestionscolaire/schools/${schoolID}/clazzs`);
  }

  findLessonsByTeacherID(teacherID: number): Observable<Lesson[]> {
    return this.httpSchedule.get<Lesson[]>(`http://localhost:8087/gestionscolaire/lessons/teachers/${teacherID}/`);
  }
}
