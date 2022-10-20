import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtResponse} from "./models/jwt/jwt-response.interface";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

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
}
