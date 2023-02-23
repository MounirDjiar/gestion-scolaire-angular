import {Lesson} from "./lesson.model";

export interface Teacher {
  id: number
  firstName: string
  lastName: string
  dob: string
  lessons: Lesson[]
}
