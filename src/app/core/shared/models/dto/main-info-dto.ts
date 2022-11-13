import {ManagerDTO} from "./manager-dto";

export interface MainInfoDTO {
  workNumber: string;
  mobileNumber: string;
  businessEmail: string;
  hireDate: Date;
  countDays: string;
  employeeNumber: number;
  jobStatus: string;
  division: string;
  location: string;
  manager: ManagerDTO;
  directReports: string[];
}
