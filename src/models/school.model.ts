import {SchoolType} from "../enum/school-type";
import {Classroom} from "./classroom.model";
import {Teacher} from "./teacher.model";
import {Lesson} from "./lesson.model";
import {Clazz} from "./clazz.model";
import {Schedule} from "./schedule.model";

export interface School {
  id: number
  name: string
  address: string
  schoolType: SchoolType
  phoneNumber: string
  logo:string
  classrooms: Classroom[]
  teachers: Teacher[]
  lessons: Lesson[]
  clazzs: Clazz[]
  schedules: Schedule[]
}
