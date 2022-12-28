import {BonusDTO} from "./bonus-dto";
import {WorkInformationDTO} from "./work-information-dto";
import {CompensationDTO} from "./compensation-dto";

export interface JobInformationDTO {
  id: number;
  hireDate: Date;
  ethnicity: string;
  jobCategory: string;
  jobDescription: string;
  bonuses: BonusDTO[];
  workInformations: WorkInformationDTO[];
  compensations: CompensationDTO[];
}
