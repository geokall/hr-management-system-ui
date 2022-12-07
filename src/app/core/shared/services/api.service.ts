import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {JwtResponseDTO} from "../models/jwt/jwt-response-dto";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {RegisterDTO} from "../models/dto/register-dto";
import {MainInfoDTO} from "../models/dto/main-info-dto";
import {BonusDTO} from "../models/dto/bonus-dto";
import {JobInformationDTO} from "../models/dto/job-information-dto";
import {EducationDTO} from "../models/dto/education-dto";
import {PersonalInformationDTO} from "../models/dto/personal-information-dto";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<JwtResponseDTO> {
    const url = `${environment.apiUrl}/auth/login`;

    return this.http.post<JwtResponseDTO>(url, {username, password});
  }

  register(role: string, registerDTO: RegisterDTO): Observable<any> {
    let params = new HttpParams().set('role', role);

    const url = `${environment.apiUrl}/auth/register`;

    return this.http.post(url, registerDTO, {params});
  }

  invite(email: string): Observable<any> {
    const url = `${environment.apiUrl}/user/invite/${email}`;

    return this.http.put<any>(url, null);
  }

  getPersonalInfo(id: number): Observable<PersonalInformationDTO> {
    const url = `${environment.apiUrl}/personal/fetch-info/${id}`;

    return this.http.get<PersonalInformationDTO>(url);
  }

  getUserEducations(id: number): Observable<EducationDTO[]> {
    const url = `${environment.apiUrl}/personal/fetch-education/${id}`;

    return this.http.get<EducationDTO[]>(url);
  }

  updateUserPersonalInfo(id: number, userDTO: PersonalInformationDTO): Observable<any> {
    const url = `${environment.apiUrl}/personal/update-info/${id}`;

    return this.http.put<PersonalInformationDTO>(url, userDTO);
  }

  getMainInfo(id: number): Observable<MainInfoDTO> {
    const url = `${environment.apiUrl}/user/main-info/${id}`;

    return this.http.get<MainInfoDTO>(url);
  }

  createUserBonus(id: number, bonusDTO: BonusDTO): Observable<any> {
    const url = `${environment.apiUrl}/job/create-bonus/${id}`;

    return this.http.post<BonusDTO>(url, bonusDTO);
  }

  updateUserBonus(id: number, bonusDTO: BonusDTO): Observable<any> {
    const url = `${environment.apiUrl}/job/update-bonus/${id}`;

    return this.http.put<BonusDTO>(url, bonusDTO);
  }

  deleteUserBonus(id: number): Observable<any> {
    const url = `${environment.apiUrl}/job/delete-bonus/${id}`;

    return this.http.delete<BonusDTO>(url);
  }

  createUserEducation(id: number, educationDTO: EducationDTO): Observable<any> {
    const url = `${environment.apiUrl}/personal/create-education/${id}`;

    return this.http.post<EducationDTO>(url, educationDTO);
  }

  updateUserEducation(id: number, educationDTO: EducationDTO): Observable<any> {
    const url = `${environment.apiUrl}/personal/update-education/${id}`;

    return this.http.put<EducationDTO>(url, educationDTO);
  }

  deleteUserEducation(id: number): Observable<any> {
    const url = `${environment.apiUrl}/personal/delete-education/${id}`;

    return this.http.delete<EducationDTO>(url);
  }

  fetchUserJobInfo(id: number): Observable<JobInformationDTO> {
    const url = `${environment.apiUrl}/job/fetch-information/${id}`;

    return this.http.get<JobInformationDTO>(url);
  }

  updateUserJobInformation(id: number, jobInformationDTO: JobInformationDTO): Observable<any> {
    const url = `${environment.apiUrl}/job/update-info/${id}`;

    return this.http.put<BonusDTO>(url, jobInformationDTO);
  }
}
