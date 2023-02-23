import {Component, OnInit} from '@angular/core';
import {Classroom} from "../../../models/classroom.model";
import {ClassroomService} from "../../../services/classroom.service";

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css']
})
export class ClassroomListComponent implements OnInit {

  classrooms : Classroom[] = []

  constructor(private classroomService: ClassroomService) {
  }
  ngOnInit(): void {
    this.classroomService.getAll()
      .subscribe(value => this.classrooms = value)
  }

}
