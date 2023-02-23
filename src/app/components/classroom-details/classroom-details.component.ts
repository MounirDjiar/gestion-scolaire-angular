import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Classroom} from "../../../models/classroom.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassroomService} from "../../../services/classroom.service";
import {environment} from "../../../environments/environment.development";

@Component({
  selector: 'app-classroom-details',
  templateUrl: './classroom-details.component.html',
  styleUrls: ['./classroom-details.component.css']
})
export class ClassroomDetailsComponent implements OnInit {

  classroom!: Classroom

  currentModal: NgbModalRef | undefined

  constructor(private modalService: NgbModal,
              private activatedRoute: ActivatedRoute,
              private classroomService: ClassroomService,
              private router: Router) {
  }

  DeleteClassroom() {
    if (environment.production) {
      this.classroomService.delete(this.classroom.id)
        .subscribe(value => {
          this.currentModal?.close()
          this.router.navigateByUrl('/classrooms')
        })
    } else {
      console.log('classroom deleted !');
    }
  }
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.classroomService.getOne(Number(id)).subscribe(clsrm => this.classroom = clsrm)
    }
    console.log(id)
  }

  open(content: any) {
    this.currentModal = this.modalService.open(content, {backdrop: 'static'})
  }

}
