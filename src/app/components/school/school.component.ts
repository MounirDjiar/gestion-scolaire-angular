import {Component, Input} from '@angular/core';
import {School} from "../../../models/school.model";


@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent {

  @Input()
  school: School | undefined;

}
