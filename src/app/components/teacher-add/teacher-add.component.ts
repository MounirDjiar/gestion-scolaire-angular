import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Lesson} from "../../../models/lesson.model";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment.development";
import {Teacher} from "../../../models/teacher.model";
import {TeacherService} from "../../../services/teacher.service";
import {SchoolService} from "../../../services/school.service"
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.css']
})
export class TeacherAddComponent implements OnInit {

  form!: FormGroup
  formSubmitted = false
  teachers: Teacher[] = []
  lessonsList: Lesson[] = []
  teacher!: Teacher
  schoolID!: string


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

    // Get the Lessons list
    this.schoolService.findLessonsBySchoolId(Number(this.schoolID)).subscribe(
      lessons => {
        this.lessonsList = lessons;
      });

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      lessons: this.formBuilder.array([]),
      school: this.formBuilder.group({
        id: this.schoolID
      })
    });

    // To choose at least one lesson
    this.addNewLesson();
  }

  get lessons() {
    return this.form.controls["lessons"] as FormArray;
  }

  addNewLesson() {
    let lessonForm = this.formBuilder.group({
      id: new FormControl(''),
    });

    this.lessons.push(lessonForm);
  }

  // Update the lessons list by removing the lesson already chose in the previews select
  private updateLessons() {

    let eltToRemove: number;
    for (let i = 0; i < this.lessons.length; i++) {
      eltToRemove = this.lessons.value[i].id as number;
      for (let lesson of this.lessonsList) {
        this.lessonsList = this.lessonsList.filter(lesson => lesson.id = eltToRemove);
      }
    }
  }

  submitForm() {
    this.formSubmitted = true
    if (this.form.valid) {
      if (environment.production) {

        console.log(this.form.value.dob)
        this.form.value.dob = (new Date(this.form.value.dob)).toLocaleDateString();

        this.teacherService.add(this.form.value).subscribe(() => {
          this.router.navigateByUrl(`/schools/${this.schoolID}/teachers`);
        });

      } else {
        console.log('Form data:', this.form.value);
      }
    }
  }
}

