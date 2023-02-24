import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment.development";
import {Clazz} from "../../../models/clazz.model";
import {ClazzService} from "../../../services/clazz.service";
import {Teacher} from "../../../models/teacher.model";
import {TeacherService} from "../../../services/teacher.service";
import {SchoolService} from "../../../services/school.service";

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
  schoolID! : string

  constructor(private formBuilder: FormBuilder,
              private clazzService: ClazzService,
              private schoolService: SchoolService,
              private teacherService: TeacherService,
              private router: Router,
              private activatedRoute: ActivatedRoute
    ){
  }
  ngOnInit(): void {

    // Get school id from url
    this.schoolID = this.activatedRoute.snapshot.paramMap.get('schoolId') || '';

    this.Form = this.formBuilder.group({
      name: ['', Validators.required],
      mainTeacher: this.formBuilder.group({
          id: ''
       }),
      school: this.formBuilder.group({
        id: this.schoolID
      })
    })


    this.schoolService.findTeachersBySchoolId(Number(this.schoolID)).subscribe(
      teachers => {
        this.teachers = teachers;
      });
  }
  submitForm() {
    this.formSubmitted = true
    if (this.Form.valid) {
      if (environment.production) {
        this.clazzService.add(this.Form.value).subscribe(() => {
          this.router.navigateByUrl(`/schools/${this.schoolID}/clazzs`);
        });
      } else {
        console.log('Form data:', this.Form.value);
      }
    }
  }
}
