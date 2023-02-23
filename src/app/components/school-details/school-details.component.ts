import {Component, OnInit} from '@angular/core';
import {School} from "../../../models/school.model";
import {SchoolService} from "../../../services/school.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.css']
})
export class SchoolDetailsComponent implements OnInit {

  school!: School;

  nbProfesseurs: number = 0;
  nbMatieres: number = 0;
  nbClazzs: number = 0;
  nbClassrooms: number = 0;

  constructor(
      private schoolService: SchoolService,
      private activateRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id') || '';
    if (id != '') {
      this.schoolService.findById(Number(id)).subscribe(
        school => {
          this.school = school;
        })
    }
  }
}
