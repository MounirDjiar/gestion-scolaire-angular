import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Clazz} from "../models/clazz.model";
import {environment} from "../environments/environment.development";
import {Teacher} from "../models/teacher.model";
import {Schedule} from "../models/schedule.model";


@Injectable({
  providedIn: 'root'
})
export class ClazzService {

  private apiUrl = environment.production ? environment.apiUrl+'/clazzs' : environment.clazzMock;

  constructor(private httpClazz: HttpClient) { }

  add(value: Clazz): Observable<Clazz> {
    return this.httpClazz.post<Clazz>(`${this.apiUrl}`, value)
  }

  delete(id: number): Observable<void> {
    return this.httpClazz.delete<void>(`${this.apiUrl}/${id}`)
  }

  getAll(): Observable<Clazz[]> {
    return this.httpClazz.get<Clazz[]>(this.apiUrl);
  }

  getOne(id: number): Observable<Clazz> {
    return this.httpClazz.get<Clazz>(`${this.apiUrl}/${id}`);
  }
  getMainTeacher(id:number): Observable<Teacher>{
    return this.httpClazz.get<Teacher>(`${this.apiUrl}/${id}/mainteacher`);
  }
  getSchedules(id:number): Observable<Schedule[]>{
    return this.httpClazz.get<Schedule[]>(`${this.apiUrl}/${id}/schedules`);
  }
}
