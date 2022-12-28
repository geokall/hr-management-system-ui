import {IdNameDTO} from "./id-name-dto";

export interface WorkInformationDTO {
  id: number;
  effectiveDate: Date;
  jobTitle: string;
  location: string;
  division: IdNameDTO;
  manager: IdNameDTO;
}
