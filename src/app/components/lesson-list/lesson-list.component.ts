import {Component, OnInit} from '@angular/core';
import {LessonService} from "../../../services/lesson.service";
import {Lesson} from "../../../models/lesson.model";
import {ActivatedRoute} from "@angular/router";
import {SchoolService} from "../../../services/school.service";

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent implements OnInit {
  lessons : Lesson[] = []
  schoolID!:string;

  constructor(
        private lessonService: LessonService,
        private schoolService: SchoolService,
        private activatedRoute: ActivatedRoute
      ){
  }

  ngOnInit(): void {

    // Get school id from url
    this.schoolID = this.activatedRoute.snapshot.paramMap.get('schoolId') || '';

    this.schoolService.findLessonsBySchoolId(Number(this.schoolID)).subscribe(
      lessonsList => {
        this.lessons = lessonsList;
      });
  }
}
