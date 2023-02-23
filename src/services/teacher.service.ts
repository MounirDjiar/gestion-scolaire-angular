import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Teacher} from "../models/teacher.model";
import {environment} from "../environments/environment.development";




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
}
