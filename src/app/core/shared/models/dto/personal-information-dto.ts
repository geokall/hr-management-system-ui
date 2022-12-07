import {EducationDTO} from "./education-dto";

export interface PersonalInformationDTO {
  id: number;
  role: string;
  name: string;
  surname: string;
  username: string;
  businessEmail: string;
  birthDate: Date;
  hireDate: Date;
  createdDate: Date;
  lastModificationDate: Date;
  gender: string;
  employeeStatus: string;
  jobStatus: string;
  maritalStatus: string;
  educations: EducationDTO[];

}
