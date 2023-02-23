import {Component, OnInit} from '@angular/core';
import {School} from "../../../models/school.model";
import {SchoolService} from "../../../services/school.service";


@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit {
  schoolsList:School[] = [];

  constructor(private schoolService: SchoolService) {
  }

  ngOnInit(): void {
    this.schoolService.findAll().subscribe(schoolsList => this.schoolsList = schoolsList);
  }
}
