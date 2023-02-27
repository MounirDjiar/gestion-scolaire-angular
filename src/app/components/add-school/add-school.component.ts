import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { SchoolType } from '../../../services/school-type';
import {SchoolService} from "../../../services/school.service";
import {LogoService} from "../../../services/logo.service";

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

  uploadedLogo!: File;

  constructor(
    private fb: FormBuilder,
    private schoolService: SchoolService,
    private router: Router,
  private logoService: LogoService,
  ) {
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
    this.formGroup.get('schoolType')?.setValue(SchoolType.ECOLE);
  }

  // Called when the form has been submitted
  submitFormAddSchool() {
    // To show errors if present
    this.formAlreadySubmitted = true;

    // If the form is valid
    if(this.formGroup.valid) {

      // console.log(this.uploadedLogo);
      // const uploadImageData = new FormData();
      // uploadImageData.append('imageFile', this.uploadedLogo, this.uploadedLogo.name);
      // console.log(uploadImageData);
      // this.logoService.addLogo(uploadImageData)
      //   .subscribe();

      this.schoolService.addSchool(this.formGroup.value)
        .subscribe(school => this.router.navigateByUrl('/schools'));
    }
  }


  //Gets called when the user selects an image
  public onFileChanged(event: any) {
    this.uploadedLogo = event.target.files[0];
  }



  // Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.uploadedLogo);
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.uploadedLogo, this.uploadedLogo.name);
    console.log(uploadImageData);
    this.logoService.addLogo(uploadImageData)
      .subscribe(logo => this.router.navigateByUrl('/schools'));
  }
}
