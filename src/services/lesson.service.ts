import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Lesson} from "../models/lesson.model";
import {environment} from "../environments/environment.development";
import {Classroom} from "../models/classroom.model";
import {Teacher} from "../models/teacher.model";

@Injectable({
  providedIn: 'root'
})
export class LessonService {

    private apiUrl = environment.production ? environment.apiUrl +'/lessons' : environment.lessonMock;

    constructor(private httpLesson: HttpClient) { }

    add(value: Lesson): Observable<Lesson> {
      return this.httpLesson.post<Lesson>(`${this.apiUrl}`, value)
    }

    delete(id: number): Observable<void> {
      return this.httpLesson.delete<void>(`${this.apiUrl}/${id}`)
    }

    getAll(): Observable<Lesson[]> {
      return this.httpLesson.get<Lesson[]>(this.apiUrl);
    }

    getOne(id: number): Observable<Lesson> {
      return this.httpLesson.get<Lesson>(`${this.apiUrl}/${id}`);
    }

    getExcludedClassrooms(id:number): Observable<Classroom[]> {
      return this.httpLesson.get<Classroom[]>(`${this.apiUrl}/${id}/excludedclassrooms`);
    }
    getAuthorisedClassrooms(id:number): Observable<Classroom[]>{
      return this.httpLesson.get<Classroom[]>(`${this.apiUrl}/${id}/nonexcludedclassrooms`);
    }
  getTeachingTeachers(id:number): Observable<Teacher[]>{
    return this.httpLesson.get<Teacher[]>(`${this.apiUrl}/${id}/teachers`);
  }
}
