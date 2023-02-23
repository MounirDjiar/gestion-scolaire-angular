import {Component, OnInit} from '@angular/core';
import {Classroom} from "../../../models/classroom.model";
import {ClassroomService} from "../../../services/classroom.service";
import {Clazz} from "../../../models/clazz.model";
import {ClazzService} from "../../../services/clazz.service";

@Component({
  selector: 'app-clazz-list',
  templateUrl: './clazz-list.component.html',
  styleUrls: ['./clazz-list.component.css']
})
export class ClazzListComponent implements OnInit{
  clazzs : Clazz[] = []

  constructor(private clazzService: ClazzService) {
  }
  ngOnInit(): void {
    this.clazzService.getAll()
      .subscribe(value => this.clazzs = value)
  }

}
