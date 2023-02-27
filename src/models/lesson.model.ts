import {School} from "./school.model";
import {Classroom} from "./classroom.model";

export interface Lesson {
  id: number
  name: string
  color: string
  school: School
  excludedClassrooms: Classroom[]

  authorisedClassrooms: Classroom[]
}
