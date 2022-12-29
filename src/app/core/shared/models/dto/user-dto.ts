import {IdNameDTO} from "./id-name-dto";

export interface UserDTO {
  id: number;
  username: string;
  name: string;
  surname: string;
  workNumber: string;
  businessEmail: string;
  linkedinUrl: string;
  division?: IdNameDTO;
  location: IdNameDTO;
}
