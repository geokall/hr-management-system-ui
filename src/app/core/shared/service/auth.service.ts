import {EventEmitter, Injectable, Output} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BehaviorSubject, interval} from "rxjs";
import {JwtResponse} from "../models/jwt/jwt-response.interface";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwt: JwtHelperService,
              private router: Router) {
    this.setUser();
  }

  loggedInUser: JwtResponse | undefined | null;
  public tokenExpiresInSec$ = new BehaviorSubject(0);
  //@ts-expect-error
  private timerSubscription: Subscription = null;

  @Output() authStatusChanged = new EventEmitter<boolean>();

  isLoggedIn(): boolean {
    const token = this.getJwtToken();

    return !!(token && !this.jwt.isTokenExpired(token));
  }

  // isTokenExpiredMilliseconds(token: string): boolean {
  //   const expiresAtMillis = this.jwt.getTokenExpirationDate(token) ? new Date(this.jwt.getTokenExpirationDate(token)!.getTime() / 1000) : 0;
  //   const now = new Date().getTime();
  //   console.log(expiresAtMillis);
  //   console.log(now);
  //   return now > expiresAtMillis;
  // }

  getJwtToken(): string {
    return this.jwt.tokenGetter();
  }

  setAuthDetails(details: JwtResponse) {
    this.setJwtToken(details.token);
    this.setUser(details);
    this.authStatusChanged.emit(true);
  }

  setJwtToken(token: string): void {
    localStorage.setItem(environment.storedVarKeys.accessTokenKey, token);
  }

  //@ts-ignore
  setUser(details: JwtResponse = null) {
    if (details) {
      localStorage.setItem(environment.storedVarKeys.userKey, JSON.stringify(details));
    }

    if (this.isLoggedIn() && localStorage.getItem(environment.storedVarKeys.userKey)) {
      this.loggedInUser = JSON.parse(localStorage.getItem(environment.storedVarKeys.userKey) || '{}');
    }
  }

  getUsername(): string {
    let username = '';

    if (this.isLoggedIn() && this.loggedInUser) {
      username = this.loggedInUser.username ? `${this.loggedInUser.username}` : this.loggedInUser.username;
    }

    return username;
  }

  getId(): number {
    let id: number = 0;

    if (this.isLoggedIn() && this.loggedInUser) {
      id = this.loggedInUser.id ? `${this.loggedInUser.id}` : this.loggedInUser.id;
    }

    return id;
  }

  isAdmin(): boolean {
    let roleName = '';
    if (this.isLoggedIn() && this.loggedInUser) {
      roleName = this.loggedInUser.roles[0];

      if (roleName == 'ADMIN') {
        return true;
      }
    }
    return false;
  }

  logout(): void {
    this.loggedInUser = null;
    localStorage.removeItem(environment.storedVarKeys.accessTokenKey);
    localStorage.removeItem(environment.storedVarKeys.userKey);
    this.router.navigateByUrl('');
    this.authStatusChanged.emit(false);
  }

  startTokenExpirationCounter(): void {

    const expiringAt = this.jwt.getTokenExpirationDate(this.getJwtToken()) ? this.jwt.getTokenExpirationDate(this.getJwtToken())!.getTime() / 1000 : Date.now();
    const now = Date.now();

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    let remainingSecs = Math.floor(expiringAt / 1000) - Math.floor(now / 1000);
    const secondsCounter = interval(1000);
    // Subscribe to begin publishing values
    this.timerSubscription = secondsCounter.subscribe(n => {
      remainingSecs = remainingSecs > 0 ? remainingSecs - 1 : remainingSecs;
      this.tokenExpiresInSec$.next(remainingSecs);

      // // If timer is expired, we gracefully logout the user
      // if(remainingSecs == 0){
      //   this.logout()
      // }
    });
  }
}
