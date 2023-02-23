import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {School} from "../models/school.model";
import {environment} from "../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private apiUrl = environment.production ? environment.apiUrl+'/schools' : environment.schoolMock;

  constructor(private httpSchool: HttpClient) { }

  add(value: School): Observable<School> {
    return this.httpSchool.post<School>(`${this.apiUrl}`, value)
  }

  delete(id: number): Observable<void> {
    return this.httpSchool.delete<void>(`${this.apiUrl}/${id}`)
  }

  getAll(): Observable<School[]> {
    return this.httpSchool.get<School[]>(this.apiUrl);
  }

  getOne(id: number): Observable<School> {
    return this.httpSchool.get<School>(`${this.apiUrl}/${id}`);
  }
}
