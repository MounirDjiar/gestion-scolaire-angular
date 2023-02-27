import {Lesson} from "./lesson.model";
import {School} from "./school.model";
import {Clazz} from "./clazz.model";
import {Schedule} from "./schedule.model";

export interface Teacher {
  id: number
  firstName: string
  lastName: string
  dob: string
  school: School
  mainClazzs: Clazz[]
  schedules: Schedule[]
  lessons: Lesson[]
}
