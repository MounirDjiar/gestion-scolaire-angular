import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment.development";
import {Teacher} from "../../../models/teacher.model";
import {TeacherService} from "../../../services/teacher.service";

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit {

  teacher!: Teacher
  currentModal: NgbModalRef | undefined
  schoolID! : string

  constructor(private modalService: NgbModal,
              private activatedRoute: ActivatedRoute,
              private teacherService: TeacherService,
              private router: Router) {
  }

  DeleteTeacher() {
    if (environment.production) {
      this.teacherService.delete(this.teacher.id)
        .subscribe(value => {
          this.currentModal?.close()
          this.router.navigateByUrl(`schools/${this.schoolID}/teachers`)
        })
    } else {
      console.log('teacher deleted !');
    }
  }
  ngOnInit(): void {

    // Get school id from url
    this.schoolID = this.activatedRoute.snapshot.paramMap.get('schoolId') || '';

    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.teacherService.getOne(Number(id)).subscribe(t => this.teacher = t)
    }
    console.log(id)
  }

  open(content: any) {
    this.currentModal = this.modalService.open(content, {backdrop: 'static'})
  }

}
