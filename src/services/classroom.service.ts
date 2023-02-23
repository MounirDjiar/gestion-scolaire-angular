import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Classroom} from "../models/classroom.model";
import {environment} from "../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  private apiUrl = environment.production ? environment.apiUrl+'/classrooms' : environment.classroomMock;

  constructor(private httpClassroom: HttpClient) { }

  add(value: Classroom): Observable<Classroom> {
    return this.httpClassroom.post<Classroom>(`${this.apiUrl}`, value)
  }

  delete(id: number): Observable<void> {
    return this.httpClassroom.delete<void>(`${this.apiUrl}/${id}`)
  }

  getAll(): Observable<Classroom[]> {
    return this.httpClassroom.get<Classroom[]>(this.apiUrl);
  }

  getOne(id: number): Observable<Classroom> {
    return this.httpClassroom.get<Classroom>(`${this.apiUrl}/${id}`);
  }
}
