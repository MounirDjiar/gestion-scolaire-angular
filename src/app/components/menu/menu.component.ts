import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    @Input()
    schoolID!: string;

    constructor(private activateRoute: ActivatedRoute) {
    }

    ngOnInit(): void {


    }
}
