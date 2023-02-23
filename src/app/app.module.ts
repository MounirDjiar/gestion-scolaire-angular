import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {SchoolListComponent} from "./components/school-list/school-list.component";
import {AddSchoolComponent} from "./components/add-school/add-school.component";
import {SchoolComponent} from "./components/school/school.component";
import {SchoolDetailsComponent} from "./components/school-details/school-details.component";
import { HomeComponent } from './components/home/home.component';
import { ClazzListComponent } from './components/clazz-list/clazz-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { ClassroomAddComponent } from './components/classroom-add/classroom-add.component';
import { MenuComponent } from './components/menu/menu.component';
import { ClassroomListComponent } from './components/classroom-list/classroom-list.component';
import { ClassroomDetailsComponent } from './components/classroom-details/classroom-details.component';
import { ClazzDetailsComponent } from './components/clazz-details/clazz-details.component';
import { ClazzAddComponent } from './components/clazz-add/clazz-add.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { TeacherDetailsComponent } from './components/teacher-details/teacher-details.component';
import { TeacherAddComponent } from './components/teacher-add/teacher-add.component';
import { LessonListComponent } from './components/lesson-list/lesson-list.component';
import { LessonAddComponent } from './components/lesson-add/lesson-add.component';
import { LessonDetailsComponent } from './components/lesson-details/lesson-details.component';
import { FullCalendarModule } from '@fullcalendar/angular';


const routes: Routes = [

  // SCHOOLS
  {path: 'schools', component: SchoolListComponent},
  {path: 'schools/add', component: AddSchoolComponent},
  {path: 'schools/:id', component: SchoolDetailsComponent},

  // LESSONS
  {path: 'schools/:schoolId/lessons', component: LessonListComponent},
  {path: 'schools/:schoolId/lessons/add', component: LessonAddComponent},
  {path: 'schools/:schoolId/lessons/:id', component: LessonDetailsComponent},

  //CLASSROOMS
  {path: 'schools/:schoolId/classrooms', component: ClassroomListComponent},
  {path: 'schools/:schoolId/classrooms/add', component: ClassroomAddComponent},
  {path: 'schools/:schoolId/classrooms/:id', component: ClassroomDetailsComponent},

  //CLAZZS
  {path: 'schools/:schoolId/clazzs', component: ClazzListComponent},
  {path: 'schools/:schoolId/clazzs/add', component: ClazzAddComponent},
  {path: 'schools/:schoolId/clazzs/:id', component: ClazzDetailsComponent},
  {path: 'schools/:schoolId/clazzs/:id/schedule', component: ScheduleComponent},

  // TEACHERS
  {path: 'schools/:schoolId/teachers', component: TeacherListComponent},
  {path: 'schools/:schoolId/teachers/add', component: TeacherAddComponent},
  {path: 'schools/:schoolId/teachers/:id', component: TeacherDetailsComponent},

  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: "full"}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClazzListComponent,
    ClassroomAddComponent,
    MenuComponent,
    ClassroomListComponent,
    ClassroomDetailsComponent,
    ClazzDetailsComponent,
    ClazzAddComponent,
    ScheduleComponent,
    TeacherListComponent,
    TeacherDetailsComponent,
    TeacherAddComponent,
    LessonListComponent,
    LessonAddComponent,
    LessonDetailsComponent,
    AddSchoolComponent,
    SchoolListComponent,
    SchoolDetailsComponent,
    SchoolComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
