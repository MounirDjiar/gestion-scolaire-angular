import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { SchoolType } from '../../../enum/school-type';
import {SchoolService} from "../../../services/school.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-school-add',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent implements OnInit {

  // Tpyes of Schools (Enum)
  schoolTypes = Object.values(SchoolType);

  formGroup!: FormGroup;

  // Form has been submitter or not
  formAlreadySubmitted: boolean = false;

  uploadedImage!: File;

  selectedFile!: File;
  imgURL: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;
  message!: string;
  imageName: any;

  constructor(
    private fb: FormBuilder,
    private schoolService: SchoolService,
    private router: Router,
    private httpClient: HttpClient) {
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
      //
      // const imageFormData = new FormData();
      // imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);

      this.schoolService.addSchool(this.formGroup.value)
        .subscribe(school => this.router.navigateByUrl('/schools'));
    }
  }

  //Gets called when the user selects an image
  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);

    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8087/gestionscolaire/logos/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
          if (response.status === 200) {
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
          }
        }
      );
  }

  // public onImageUpload(event: any) {
  //   this.uploadedImage = <File>event.target.files[0];
  // }
  // imageUploadAction() {
  //   const imageFormData = new FormData();
  //   imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
  // }
}
