import {Lesson} from "./lesson.model";
import {School} from "./school.model";

export interface Classroom {
  id: number
  name: string
  capacity: number
  excludedLessons: Lesson[]
  lessons: Lesson[]
  school: School

}
