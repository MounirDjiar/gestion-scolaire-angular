import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Lesson} from "../../../models/lesson.model";
import {LessonService} from "../../../services/lesson.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment.development";


@Component({
  selector: 'app-lesson-add',
  templateUrl: './lesson-add.component.html',
  styleUrls: ['./lesson-add.component.css']
})
export class LessonAddComponent implements OnInit {

  Form!: FormGroup
  formSubmitted = false
  lesson!: Lesson
  lessons: Lesson[] = []



  constructor(private formBuilder: FormBuilder,
              private lessonService: LessonService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.Form = this.formBuilder.group({
      name: [null, Validators.required],
      color: [null, Validators.required],
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
        this.lessonService.add(this.Form.value).subscribe(() => {
          this.router.navigateByUrl('/home');
        });
      } else {
        console.log('Form data:', this.Form.value);
      }
    }    }
}

