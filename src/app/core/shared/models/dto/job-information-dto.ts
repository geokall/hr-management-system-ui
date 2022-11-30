import {BonusDTO} from "./bonus-dto";

export interface JobInformationDTO {
  id: number;
  hireDate: Date;
  ethnicity: string;
  jobCategory: string;
  jobDescription: string;
  bonuses: BonusDTO[];
}
