import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Classroom} from "../../../models/classroom.model";
import {Lesson} from "../../../models/lesson.model";
import {ClassroomService} from "../../../services/classroom.service";
import {LessonService} from "../../../services/lesson.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment.development";
import {Teacher} from "../../../models/teacher.model";
import {TeacherService} from "../../../services/teacher.service";

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

  constructor(private formBuilder: FormBuilder,
              private teacherService: TeacherService,
              private lessonService: LessonService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.Form = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      dob: [null, Validators.required],
      lessons: [null, [Validators.required, Validators.min(1), Validators.max(3)]],
    })
    this.lessonService.getAll().subscribe(lesson => {
      this.lessons = lesson
      // if (lesson.length > 0)
      //   this.Form.get('lesson')?.get('id')?.setValue(lesson[0].id)
    })
  }
  submitForm() {
    this.formSubmitted = true
    if (this.Form.valid) {
      if (environment.production) {
        this.teacherService.add(this.Form.value).subscribe(() => {
          this.router.navigateByUrl('/home');
        });
      } else {
        console.log('Form data:', this.Form.value);
      }
    }    }
}

