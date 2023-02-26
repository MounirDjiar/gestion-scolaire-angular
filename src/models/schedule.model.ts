import {Lesson} from "./lesson.model";
import {Teacher} from "./teacher.model";
import {Classroom} from "./classroom.model";
import {Clazz} from "./clazz.model";

export interface Schedule {
  id?: number
  day: string
  startingHour: string
  endingHour: string
  lesson: Lesson
  teacher: Teacher
  classroom: Classroom
  clazz: Clazz
}
