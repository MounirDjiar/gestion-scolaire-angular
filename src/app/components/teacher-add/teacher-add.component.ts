import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Classroom} from "../../../models/classroom.model";
import {Lesson} from "../../../models/lesson.model";
import {ClassroomService} from "../../../services/classroom.service";
import {LessonService} from "../../../services/lesson.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment.development";
import {Teacher} from "../../../models/teacher.model";
import {TeacherService} from "../../../services/teacher.service";
import {SchoolService} from "../../../services/school.service";

@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.css']
})
export class TeacherAddComponent implements OnInit {

  Form!: FormGroup
  formSubmitted = false
  teachers: Teacher[] = []
  lessons: Lesson[] = []
  teacher!: Teacher
  schoolID! : string

  constructor(private formBuilder: FormBuilder,
              private teacherService: TeacherService,
              private schoolService: SchoolService,
              private router: Router,
              private activatedRoute: ActivatedRoute
      ) {
  }
  ngOnInit(): void {

    // Get school id from url
    this.schoolID = this.activatedRoute.snapshot.paramMap.get('schoolId') || '';

    this.Form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      lessons: this.formBuilder.group({
        id: ''
      }),
      school: this.formBuilder.group({
        id: this.schoolID
      })
    })

    this.schoolService.findLessonsBySchoolId(Number(this.schoolID)).subscribe(
      lessons => {
        this.lessons = lessons;
      });

  }
  submitForm() {
    this.formSubmitted = true
    if (this.Form.valid) {
      if (environment.production) {
        this.teacherService.add(this.Form.value).subscribe(() => {
          this.router.navigateByUrl(`/schools/${this.schoolID}/teachers`);
        });
      } else {
        console.log('Form data:', this.Form.value);
      }
    }    }
}

