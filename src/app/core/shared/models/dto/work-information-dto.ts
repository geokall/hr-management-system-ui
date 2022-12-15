import {IdNameDTO} from "./id-name-dto";

export interface WorkInformationDTO {
  id: number;
  workInformation: Date;
  jobTitle: string;
  location: string;
  division: IdNameDTO;
  manager: IdNameDTO;
}
