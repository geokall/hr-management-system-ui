import {IdNameDTO} from "./id-name-dto";

export interface WorkInformationDTO {
  id: number;
  jobTitle: string;
  location: string;
  division: IdNameDTO;
  manager: IdNameDTO;
  user: IdNameDTO;
}
