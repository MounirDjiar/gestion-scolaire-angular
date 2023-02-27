import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {School} from "../models/school.model";
import {Classroom} from "../models/classroom.model";
import {Lesson} from "../models/lesson.model";
import {Clazz} from "../models/clazz.model";
import {Teacher} from "../models/teacher.model";
import {environment} from "../environments/environment.development";

@Injectable({
  providedIn: 'root'
})

export class SchoolService {

  private url = environment.production ? environment.apiUrl +'/schools' : environment.schoolMock;

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<School[]> {
    return this.http.get<School[]>(this.url);
  }

  public findById(id: number): Observable<School> {
    return this.http.get<School>(`${this.url}/${id}`);
  }

  public findClassroomsBySchoolId(id: number): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(`${this.url}/${id}/classrooms`);
  }

  public findLessonsBySchoolId(id: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.url}/${id}/lessons`);
  }

  public findClazzsBySchoolId(id: number): Observable<Clazz[]> {
    return this.http.get<Clazz[]>(`${this.url}/${id}/clazzs`);
  }

  public findTeachersBySchoolId(id: number): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.url}/${id}/teachers`);
  }

  public addSchool(value: School): Observable<School> {
    return this.http.post<School>(this.url, value);
  }

  public deleteSchool(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
