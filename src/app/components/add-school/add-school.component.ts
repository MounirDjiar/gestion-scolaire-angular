import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { SchoolType } from '../../../services/school-type';
import {SchoolService} from "../../../services/school.service";

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent implements OnInit {

  // Tpyes of Schools (Enum)
  schoolTypes = Object.values(SchoolType);

  formGroup!: FormGroup;

  // Form has been submitter or not
  formAlreadySubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private schoolService: SchoolService,
    private router: Router) {
  }

  ngOnInit(): void {

    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      schoolType: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      logo: ''
    });

    // Set default values in the select
    this.formGroup.get('schoolType')?.setValue(SchoolType.COLLEGE);
  }

  // Called when the form has been submitted
  submitFormAddSchool() {
    // To show errors if present
    this.formAlreadySubmitted = true;

    // If the form is valid
    if(this.formGroup.valid) {
      this.schoolService.addSchool(this.formGroup.value)
        .subscribe(school => this.router.navigateByUrl('/schools'));
    }
  }
}
