import { Injectable } from '@angular/core';
import {environment} from "../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Classroom} from "../models/classroom.model";
import {Observable} from "rxjs";
import {Logo} from "../models/logo.model";

@Injectable({
  providedIn: 'root'
})
export class LogoService {

  private apiUrl = environment.production ? environment.apiUrl+'/logos/upload' : environment.classroomMock;
  constructor(private httpLogo: HttpClient){}

  addLogo(value: FormData): Observable<FormData> {
    return this.httpLogo.post<FormData>(`${this.apiUrl}`, value)
  }
}
