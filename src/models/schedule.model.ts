import {School} from "./school.model";
import {Teacher} from "./teacher.model";
import {Clazz} from "./clazz.model";
import {Day} from "../enum/day-enum";

export interface Schedule {
  id: number
  day: Day
  dStart: string
  dEnd: string
  school : School
  teacher: Teacher
  clazz: Clazz
}
