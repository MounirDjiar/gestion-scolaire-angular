import {Lesson} from "../models/lesson.model";
import {School} from "../models/school.model";
import {Classroom} from "../models/classroom.model";

export class ClassroomClass implements Classroom {
  capacity: number;
  excludedLessons: Lesson[];
  id: number;
  lessons: Lesson[];
  name: string;
  school: School;
  constructor(id: number, name: string, capacity: number, excludedLessons: Lesson[], lessons: Lesson[], school: School) {
    this.id = id;
    this.name = name;
    this.capacity = capacity;
    this.excludedLessons = excludedLessons;
    this.lessons = lessons;
    this.school = school;
  }

}
