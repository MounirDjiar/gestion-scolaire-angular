import {Component, OnInit} from '@angular/core';
import {Classroom} from "../../../models/classroom.model";
import {ClassroomService} from "../../../services/classroom.service";
import {Teacher} from "../../../models/teacher.model";
import {TeacherService} from "../../../services/teacher.service";
import {ActivatedRoute} from "@angular/router";
import {SchoolService} from "../../../services/school.service";

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  teachers : Teacher[] = []
  schoolID!:string;

  constructor(
      private schoolService: SchoolService,
      private activatedRoute: ActivatedRoute
    ){
  }
  ngOnInit(): void {

    // Get school id from url
    this.schoolID = this.activatedRoute.snapshot.paramMap.get('schoolId') || '';

    this.schoolService.findTeachersBySchoolId(Number(this.schoolID)).subscribe(
      teachers => {
        this.teachers = teachers;
      });
  }
}
