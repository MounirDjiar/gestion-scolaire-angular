import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Classroom} from "../../../models/classroom.model";
import {Lesson} from "../../../models/lesson.model";
import {ClassroomService} from "../../../services/classroom.service";
import {LessonService} from "../../../services/lesson.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment.development";
import {SchoolService} from "../../../services/school.service";
import {forkJoin, Observable, of} from "rxjs";
import {ClassroomClass} from "../../../classes/classroom.class";
import {School} from "../../../models/school.model";

@Component({
  selector: 'app-classroom-add',
  templateUrl: './classroom-add.component.html',
  styleUrls: ['./classroom-add.component.css']
})
export class ClassroomAddComponent implements OnInit {

  Form!: FormGroup
  formSubmitted = false
  classrooms: Classroom[] = []
  lessons: Lesson[] = []
  lsns: Lesson[] = []
  excludedLessons: Lesson[] = []
  authorisedLessons: Lesson[] = []

  lessonsList: Lesson[] = []

  authorisedLessonsFiltered: Lesson[] = []
  classroom!: Classroom
  schoolID! : string
  school!: School
  lesson!: Lesson
  lessonId!: Lesson

  constructor(private formBuilder: FormBuilder,
              private classroomService: ClassroomService,
              private schoolService: SchoolService,
              private lessonService: LessonService,
              private router: Router,
              private activatedRoute: ActivatedRoute
      ) {
  }



  ngOnInit(): void {

    // Get school id from url
    this.schoolID = this.activatedRoute.snapshot.paramMap.get('schoolId') || '';

/* ****** Defines property of form fields ****** */
    this.Form = this.formBuilder.group({
      name: [null, Validators.required],
      excludedLessons: [],
      capacity: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      // school: this.schoolService.findById(+this.schoolID)
    })

/* ***Displays only lessons related to schoolId*** */
    this.schoolService.findLessonsBySchoolId(Number(this.schoolID)).subscribe(
      lessonsList => {
        this.lessonsList= lessonsList;
        // console.log(this.lessonsList)
      });

// /* ***Call assigned lessons of selected excludedLessons**** */
//     this.lessonService.getOne(this.lesson.id).subscribe(
//       lesson => {
//         this.lesson = lesson;
//         this.excludedLessons.push(this.lesson)
//         console.log(this.excludedLessons)
//       }
//     );

/* ***Call assigned school of schoolId*** */
    this.schoolService.findById(Number(this.schoolID)).subscribe(
      school => {
        this.school = school;
      });
  }





  ngOnSubmit() {
    this.formSubmitted = true;
    if (this.Form.valid) {

/* *** Iterate on selected excludedLessons to fill out excludedLessons and authorisedLesson attributes of classroom object below*** */
      for (this.lessonId of this.Form.get('excludedLessons')?.value)
      {
        // console.log(this.lessonId)
        this.lessonService.getOne(+this.lessonId).subscribe(
          lsn => {
            this.lesson = lsn;
            // console.log(this.excludedLessons);
            this.excludedLessons.push(lsn);
            // console.log(this.excludedLessons);
            this.authorisedLessonsFiltered = this.authorisedLessons.filter(authLesson => authLesson.id !== lsn.id)
            // console.log(this.authorisedLessonsFiltered)
          });
      }

/* **** Create the object classroom with selected elements before sending it to backend **** */
      this.classroom = new ClassroomClass(
        0,
        this.Form.get('name')?.value,
        this.Form.get('capacity')?.value,
        this.excludedLessons,
        this.authorisedLessons,
        this.school)

      if (environment.production) {
        this.classroomService.add(this.classroom).subscribe(() => {
          this.router.navigateByUrl(`/schools/${this.schoolID}/classrooms`);
        console.log(this.classroom);
        });

      } else {

        console.log('Form data:', this.Form.value,this.schoolID);
      }
        }    }
}
