import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment.development";
import {LessonService} from "../../../services/lesson.service";
import {Lesson} from "../../../models/lesson.model";

@Component({
  selector: 'app-lesson-details',
  templateUrl: './lesson-details.component.html',
  styleUrls: ['./lesson-details.component.css']
})
export class LessonDetailsComponent implements OnInit {

  lesson!: Lesson

  currentModal: NgbModalRef | undefined

  constructor(private modalService: NgbModal,
              private activatedRoute: ActivatedRoute,
              private lessonService: LessonService,
              private router: Router) {
  }

  DeleteLesson() {
    if (environment.production) {
      this.lessonService.delete(this.lesson.id)
        .subscribe(value => {
          this.currentModal?.close()
          this.router.navigateByUrl('/lessons')
        })
    } else {
      console.log('lesson deleted !');
    }
  }
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.lessonService.getOne(Number(id)).subscribe(l => this.lesson = l)
    }
    console.log(id)
  }

  open(content: any) {
    this.currentModal = this.modalService.open(content, {backdrop: 'static'})
  }

}
