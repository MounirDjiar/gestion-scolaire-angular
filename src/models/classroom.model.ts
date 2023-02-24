import {Lesson} from "./lesson.model";

export interface Classroom {
  id: number
  name: string
  excludedLessons: Lesson[]
  capacity: number
}
