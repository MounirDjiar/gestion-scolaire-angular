import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Classroom} from "../../../models/classroom.model";
import {Lesson} from "../../../models/lesson.model";
import {ClassroomService} from "../../../services/classroom.service";
import {LessonService} from "../../../services/lesson.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment.development";

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
  classroom!: Classroom

  constructor(private formBuilder: FormBuilder,
              private classroomService: ClassroomService,
              private lessonService: LessonService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.Form = this.formBuilder.group({
      name: [null, Validators.required],
      excludedLesson: [],
      capacity: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
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
        this.classroomService.add(this.Form.value).subscribe(() => {
          this.router.navigateByUrl('/home');
        });
      } else {
        console.log('Form data:', this.Form.value);
      }
        }    }
}
