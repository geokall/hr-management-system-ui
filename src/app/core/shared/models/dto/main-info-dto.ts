import {ManagerDTO} from "./manager-dto";
import {DirectReportDTO} from "./direct-report-dto";

export interface MainInfoDTO {
  id: number;
  name: string;
  surname: string;
  workNumber: string;
  mobileNumber: string;
  businessEmail: string;
  hireDate: Date;
  countYears: number;
  countMonths: number;
  countDays: string;
  employeeNumber: number;
  jobStatus: string;
  division: string;
  location: string;
  directManager: ManagerDTO;
  directReports: DirectReportDTO[];
}
