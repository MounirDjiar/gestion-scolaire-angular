import {Teacher} from "./teacher.model";
import {School} from "./school.model";
import {Schedule} from "./schedule.model";

export interface Clazz {
  id: number
  name: string

  school: School
  mainTeacher: Teacher

  schedules: Schedule[]
}
