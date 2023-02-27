import {Component, Input, OnInit} from '@angular/core';
import {School} from "../../../models/school.model";
import {SchoolService} from "../../../services/school.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit {
  formGroup!: FormGroup;

  schoolsList: School[] = [];

  @Input()
  school: School | undefined;
  constructor(
    private schoolService: SchoolService,
    private fb: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit(): void {

    this.formGroup = this.fb.group({
      'schoolId': ''
    });

    // Get the schools list
    this.schoolService.findAll().subscribe(
      schoolsList => {
        this.schoolsList = schoolsList;

        // Set default values in the select
        if(schoolsList.length > 0)
          this.formGroup.get('schoolId')?.setValue(schoolsList[0].id);
      });
  }


  // When the form has been submited
  // Redirect to the selected school to manage
  submitFormSelectSchool() {
    this.router.navigateByUrl(`/schools/${this.formGroup.value.schoolId}`)
  }
}
