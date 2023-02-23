import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {School} from "../models/school.model";



@Injectable({
  providedIn: 'root'
})

export class SchoolService {

  url: string = 'http://localhost:8087/gestionscolaire/schools';

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<School[]> {
    return this.http.get<School[]>(this.url);
  }

  public findById(id: number): Observable<School> {
    return this.http.get<School>(`${this.url}/${id}`);
  }

  public addSchool(value: School): Observable<School> {
    return this.http.post<School>(this.url, value);
  }

  public deleteSchool(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
