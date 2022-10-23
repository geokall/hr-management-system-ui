import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {JwtResponse} from "../models/jwt/jwt-response.interface";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {RegisterDTO} from "../models/register-dto";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<JwtResponse> {
    const url = `${environment.apiUrl}/auth/login`;
    return this.http.post<JwtResponse>(url, {username, password});
  }

  register(role: string, registerDTO: RegisterDTO): Observable<any> {
    let params = new HttpParams()
      .set('role', role);

    const url = `${environment.apiUrl}/auth/register`;

    return this.http.post(url, registerDTO, {params});
  }
}
