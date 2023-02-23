import {Component, OnInit} from '@angular/core';
import {School} from "../../../models/school.model";
import {SchoolService} from "../../../services/school.service";
import {ActivatedRoute} from "@angular/router";
import {Classroom} from "../../../models/classroom.model";
import {Lesson} from "../../../models/lesson.model";
import {Clazz} from "../../../models/clazz.model";
import {Teacher} from "../../../models/teacher.model";

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.css']
})
export class SchoolDetailsComponent implements OnInit {

  school!: School;
  classroomsList: Classroom[] = [];
  lessonsList: Lesson[] = [];
  clazzsList: Clazz[] = [];
  teachersList: Teacher[] = [];

  constructor(
      private schoolService: SchoolService,
      private activateRoute: ActivatedRoute,
   ){
  }

  ngOnInit(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id') || '';
    if (id != '') {
      this.schoolService.findById(Number(id)).subscribe(
        school => {
          this.school = school;
        });

      this.schoolService.findClassroomsBySchoolId(Number(id)).subscribe(
        classrooms => {
          this.classroomsList = classrooms;
        });

      this.schoolService.findLessonsBySchoolId(Number(id)).subscribe(
        lessonsList => {
          this.lessonsList = lessonsList;
        });

      this.schoolService.findClazzsBySchoolId(Number(id)).subscribe(
        clazzsList => {
          this.clazzsList = clazzsList;
        });

      this.schoolService.findTeachersBySchoolId(Number(id)).subscribe(
        teachersList => {
          this.teachersList = teachersList;
        });
    }
  }
}
