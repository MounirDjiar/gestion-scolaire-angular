import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Classroom} from "../../../models/classroom.model";
import {Lesson} from "../../../models/lesson.model";
import {ClassroomService} from "../../../services/classroom.service";
import {LessonService} from "../../../services/lesson.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment.development";
import {SchoolService} from "../../../services/school.service";

@Component({
  selector: 'app-classroom-add',
  templateUrl: './classroom-add.component.html',
  styleUrls: ['./classroom-add.component.css']
})
export class ClassroomAddComponent implements OnInit {

  form!: FormGroup
  formSubmitted = false
  classrooms: Classroom[] = []
  lessonsList: Lesson[] = []
  schoolID! : string

  constructor(private formBuilder: FormBuilder,
              private classroomService: ClassroomService,
              private schoolService: SchoolService,
              private router: Router,
              private activatedRoute: ActivatedRoute
      ) {
  }
  ngOnInit(): void {

    // Get school id from url
    this.schoolID = this.activatedRoute.snapshot.paramMap.get('schoolId') || '';

    this.schoolService.findLessonsBySchoolId(Number(this.schoolID)).subscribe(
      lessonsList => {
        this.lessonsList = lessonsList;
      });

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      capacity: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      excludedLessons: this.formBuilder.array([]),
      school: this.formBuilder.group({
        id: this.schoolID
      })
    })

    // To choose at least one lesson
    this.addNewExcludedLesson();
  }

  get lessons() {
    return this.form.controls["excludedLessons"] as FormArray;
  }

  addNewExcludedLesson() {
    let lessonForm = this.formBuilder.group({
      id: new FormControl(''),
    });

    this.lessons.push(lessonForm);
  }

  submitForm() {
    this.formSubmitted = true
    if (this.form.valid) {
      if (environment.production) {
        this.classroomService.add(this.form.value).subscribe(() => {
          this.router.navigateByUrl(`/schools/${this.schoolID}/classrooms`);
        });
      } else {
        console.log('Form data:', this.form.value);
      }
        }    }
}
