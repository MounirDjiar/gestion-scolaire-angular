import {SchoolType} from "../services/school-type";

export interface School {
  id: number
  name: string
  address: string
  schoolType: SchoolType
  phoneNumber: string
  logo:string
}
