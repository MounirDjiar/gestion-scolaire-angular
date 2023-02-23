import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment.development";
import {Clazz} from "../../../models/clazz.model";
import {ClazzService} from "../../../services/clazz.service";
import {Teacher} from "../../../models/teacher.model";
import {TeacherService} from "../../../services/teacher.service";

@Component({
  selector: 'app-clazz-add',
  templateUrl: './clazz-add.component.html',
  styleUrls: ['./clazz-add.component.css']
})
export class ClazzAddComponent implements OnInit {
  Form!: FormGroup
  formSubmitted = false
  clazzs: Clazz[] = []
  teachers: Teacher[] = []
  mainTeacher!: Teacher
  clazz!: Clazz

  constructor(private formBuilder: FormBuilder,
              private clazzService: ClazzService,
              private teacherService: TeacherService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.Form = this.formBuilder.group({
      name: [null, Validators.required],
      mainTeacher: [[],Validators.required],
    })
    this.teacherService.getAll().subscribe(teacher => {
      this.teachers = teacher
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
