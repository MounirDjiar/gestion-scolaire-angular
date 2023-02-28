import {School} from "./school.model";

export interface Logo {
  id: number
  name: string
  type: String
  picByte : FormData
  school: School
}
