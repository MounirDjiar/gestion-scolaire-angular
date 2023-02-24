import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
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

  Form!: FormGroup
  formSubmitted = false
  classrooms: Classroom[] = []
  lessons: Lesson[] = []
  classroom!: Classroom
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

    this.Form = this.formBuilder.group({
      name: ['', Validators.required],
      capacity: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      excludedLessons: this.formBuilder.array([
        this.formBuilder.group({
          id: ''
        })
      ]),
      school: this.formBuilder.group({
        id: this.schoolID
      })
    })

    this.schoolService.findLessonsBySchoolId(Number(this.schoolID)).subscribe(
      lessonsList => {
        this.lessons = lessonsList;
      });
  }

  get selectedLesson(): FormArray {
    return this.Form.get('excludedLessons') as FormArray;
  }

  submitForm() {
    this.formSubmitted = true
    if (this.Form.valid) {
      if (environment.production) {
        this.classroomService.add(this.Form.value).subscribe(() => {
          this.router.navigateByUrl(`/schools/${this.schoolID}/classrooms`);
        });
      } else {
        console.log('Form data:', this.Form.value);
      }
        }    }
}
