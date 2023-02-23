import {Component, OnInit} from '@angular/core';
import {Classroom} from "../../../models/classroom.model";
import {ClassroomService} from "../../../services/classroom.service";
import {ActivatedRoute} from "@angular/router";
import {SchoolService} from "../../../services/school.service";

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css']
})
export class ClassroomListComponent implements OnInit {

  classrooms : Classroom[] = []
  schoolID!:string;

  constructor(
      private schoolService: SchoolService,
      private activatedRoute: ActivatedRoute
    ){
  }
  ngOnInit(): void {

    // Get school id from url
    this.schoolID = this.activatedRoute.snapshot.paramMap.get('schoolId') || '';

    this.schoolService.findClassroomsBySchoolId(Number(this.schoolID)).subscribe(
      classrooms => {
        this.classrooms = classrooms;
      });
  }
}
