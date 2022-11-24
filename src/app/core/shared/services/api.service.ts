import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {JwtResponseDTO} from "../models/jwt/jwt-response-dto";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {RegisterDTO} from "../models/dto/register-dto";
import {PersonalInfoDTO} from "../models/dto/personal-info-dto";
import {MainInfoDTO} from "../models/dto/main-info-dto";
import {BonusDTO} from "../models/dto/bonus-dto";
import {JobInfoDTO} from "../models/dto/job-info-dto";

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

  getUserInfo(id: number): Observable<PersonalInfoDTO> {
    const url = `${environment.apiUrl}/user/personal-info/${id}`;

    return this.http.get<PersonalInfoDTO>(url);
  }

  getMainInfo(id: number): Observable<MainInfoDTO> {
    const url = `${environment.apiUrl}/user/main-info/${id}`;

    return this.http.get<MainInfoDTO>(url);
  }

  updateUserInfo(id: number, userDTO: PersonalInfoDTO): Observable<any> {
    const url = `${environment.apiUrl}/user/update-info/${id}`;

    return this.http.put<PersonalInfoDTO>(url, userDTO);
  }

  updateUserBonus(id: number, bonusDTO: BonusDTO): Observable<any> {
    const url = `${environment.apiUrl}/job/update-bonus/${id}`;

    return this.http.put<BonusDTO>(url, bonusDTO);
  }

  fetchUserJobInfo(id: number): Observable<JobInfoDTO> {
    const url = `${environment.apiUrl}/job/fetch/${id}`;

    return this.http.get<JobInfoDTO>(url);
  }
}
