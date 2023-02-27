import {Component, OnInit} from '@angular/core';
import {Classroom} from "../../../models/classroom.model";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassroomService} from "../../../services/classroom.service";
import {environment} from "../../../environments/environment.development";
import {Clazz} from "../../../models/clazz.model";
import {ClazzService} from "../../../services/clazz.service";

@Component({
  selector: 'app-clazz-details',
  templateUrl: './clazz-details.component.html',
  styleUrls: ['./clazz-details.component.css']
})
export class ClazzDetailsComponent implements OnInit {

  clazz!: Clazz
  currentModal: NgbModalRef | undefined
  schoolID! : string

  constructor(private modalService: NgbModal,
              private activatedRoute: ActivatedRoute,
              private clazzService: ClazzService,
              private router: Router) {
  }

  DeleteClazz() {
    if (environment.production) {
      this.clazzService.delete(this.clazz.id)
        .subscribe(value => {
          this.currentModal?.close()
          this.router.navigateByUrl(`schools/${this.schoolID}/clazzs`)
        })
    } else {
      console.log('clazz deleted !');
    }
  }
  ngOnInit(): void {

    // Get school id from url
    this.schoolID = this.activatedRoute.snapshot.paramMap.get('schoolId') || '';

    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.clazzService.getOne(Number(id)).subscribe(clazz => this.clazz = clazz)
    }
    console.log(id)
  }

  open(content: any) {
    this.currentModal = this.modalService.open(content, {backdrop: 'static'})
  }


}
