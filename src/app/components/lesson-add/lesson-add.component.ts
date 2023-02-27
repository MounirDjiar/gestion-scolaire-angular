import {Component, NgModule, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Lesson} from "../../../models/lesson.model";
import {LessonService} from "../../../services/lesson.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment.development";
import { ColorPickerModule } from 'ngx-color-picker';


@Component({
  selector: 'app-lesson-add',
  templateUrl: './lesson-add.component.html',
  styleUrls: ['./lesson-add.component.css']
})
export class LessonAddComponent implements OnInit {

  Form!: FormGroup
  formSubmitted = false
  lesson!: Lesson
  schoolID! : string

  constructor(private formBuilder: FormBuilder,
              private lessonService: LessonService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ){
  }
  ngOnInit(): void {

    // Get school id from url
    this.schoolID = this.activatedRoute.snapshot.paramMap.get('schoolId') || '';

    this.Form = this.formBuilder.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
      school: this.formBuilder.group({
        id: this.schoolID
      })
    })
  }

  submitForm() {
    this.formSubmitted = true
    if (this.Form.valid) {
      if (environment.production) {
        this.lessonService.add(this.Form.value).subscribe(() => {
          this.router.navigateByUrl(`/schools/${this.schoolID}/lessons`);
        });
      } else {
        console.log('Form data:', this.Form.value);
      }
    }
  }
  onColorChange(event: any) {
    this.Form.controls['color'].setValue(event.color.hex);
  }
}
