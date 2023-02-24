import {Component, OnInit} from '@angular/core';
import {Classroom} from "../../../models/classroom.model";
import {ClassroomService} from "../../../services/classroom.service";
import {Clazz} from "../../../models/clazz.model";
import {ClazzService} from "../../../services/clazz.service";
import {ActivatedRoute} from "@angular/router";
import {SchoolService} from "../../../services/school.service";

@Component({
  selector: 'app-clazz-list',
  templateUrl: './clazz-list.component.html',
  styleUrls: ['./clazz-list.component.css']
})
export class ClazzListComponent implements OnInit{
  clazzs : Clazz[] = []
  schoolID!:string;

  constructor(
      private schoolService: SchoolService,
      private activatedRoute: ActivatedRoute
    ){
  }
  ngOnInit(): void {

    // Get school id from url
    this.schoolID = this.activatedRoute.snapshot.paramMap.get('schoolId') || '';

    this.schoolService.findClazzsBySchoolId(Number(this.schoolID)).subscribe(
      clazzs => {
        this.clazzs = clazzs;
      });
  }

}
