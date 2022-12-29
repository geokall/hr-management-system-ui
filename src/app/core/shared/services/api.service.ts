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
import {IdNameDTO} from "../models/dto/id-name-dto";
import {WorkInformationDTO} from "../models/dto/work-information-dto";
import {CompensationDTO} from "../models/dto/compensation-dto";
import {PasswordDTO} from "../models/dto/password-dto";

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

  changePassword(id: number, dto: PasswordDTO): Observable<any> {
    const url = `${environment.apiUrl}/user/change-password/${id}`;

    return this.http.put<any>(url, dto);
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

  fetchUserBonus(id: number): Observable<BonusDTO[]> {
    const url = `${environment.apiUrl}/job/fetch-bonus/${id}`;

    return this.http.get<BonusDTO[]>(url);
  }

  updateUserJobInformation(id: number, jobInformationDTO: JobInformationDTO): Observable<any> {
    const url = `${environment.apiUrl}/job/update-info/${id}`;

    return this.http.put<BonusDTO>(url, jobInformationDTO);
  }

  fetchLocations(): Observable<IdNameDTO[]> {
    const url = `${environment.apiUrl}/data/fetch-locations`;

    return this.http.get<IdNameDTO[]>(url);
  }

  fetchDivisions(): Observable<IdNameDTO[]> {
    const url = `${environment.apiUrl}/data/fetch-divisions`;

    return this.http.get<IdNameDTO[]>(url);
  }

  fetchUsers(): Observable<IdNameDTO[]> {
    const url = `${environment.apiUrl}/data/fetch-users`;

    return this.http.get<IdNameDTO[]>(url);
  }

  fetchUserWorkInformations(id: number): Observable<WorkInformationDTO[]> {
    const url = `${environment.apiUrl}/job/fetch-work-information/${id}`;

    return this.http.get<WorkInformationDTO[]>(url);
  }

  createUserWorkInformation(id: number, workInformationDTO: WorkInformationDTO): Observable<any> {
    const url = `${environment.apiUrl}/job/create-work-information/${id}`;

    return this.http.post<WorkInformationDTO>(url, workInformationDTO);
  }

  updateUserWorkInformation(id: number, workInformationDTO: WorkInformationDTO): Observable<any> {
    const url = `${environment.apiUrl}/job/update-work-information/${id}`;

    return this.http.put<WorkInformationDTO>(url, workInformationDTO);
  }

  deleteUserWorkInformation(id: number): Observable<any> {
    const url = `${environment.apiUrl}/job/delete-work-information/${id}`;

    return this.http.delete<WorkInformationDTO>(url);
  }

  fetchUserCompensations(id: number): Observable<CompensationDTO[]> {
    const url = `${environment.apiUrl}/job/fetch-compensations/${id}`;

    return this.http.get<CompensationDTO[]>(url);
  }

  createUserCompensation(id: number, compensationDTO: CompensationDTO): Observable<any> {
    const url = `${environment.apiUrl}/job/create-compensation/${id}`;

    return this.http.post<CompensationDTO>(url, compensationDTO);
  }

  updateUserCompensation(id: number, compensationDTO: CompensationDTO): Observable<any> {
    const url = `${environment.apiUrl}/job/update-compensation/${id}`;

    return this.http.put<CompensationDTO>(url, compensationDTO);
  }

  deleteUserCompensation(id: number): Observable<any> {
    const url = `${environment.apiUrl}/job/delete-compensation/${id}`;

    return this.http.delete<CompensationDTO>(url);
  }
}
