import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { AlertService } from '../component/alert.service';
import { constStorage } from '../models/Storege';
import { UserConstant } from '../models/Userconstant';

interface LoginResponse {
  BearerToken;
  RefreshToken;
  Flag;
  // user: User;
  IDbint;
  UserNametxt;
  UserTypetxt;
  UserCodetxt;
  Divisionvtxt;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new BehaviorSubject(null);

  constructor(private http: HttpClient, private router: Router,
    private localStorageService: LocalStorageService,
    private _AlertService: AlertService,

  ) { }

  IpAdress(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>('https://jsonip.com',
    { headers: headers })
      .pipe(
        tap(response => {
          localStorage.setItem("IP", response.ip);
        })
      );
  }

  login(loginForm): Observable<LoginResponse> {
    this.removeToken();
    return this.http.post<LoginResponse>(`${environment.ApiUrl}/UserMaster/Login`, loginForm)
      .pipe(
        tap(response => {
          // this.user$.next(response.user);
          if (response.Flag == 'InvalidUser Credatials') {
            this._AlertService.error('Invalid User Credatials')
            return;
          } else if (response.Flag == 'User is not Active') {
            this._AlertService.error('User is not Active')
            return;
          }
          this.setToken(constStorage.token, response.BearerToken);
          this.setToken(constStorage.refreshToken, response.RefreshToken);
          this.setToken(constStorage.IDbint, response.IDbint);
          this.setToken(constStorage.UserType, response.UserTypetxt);
          this.setToken(constStorage.UserCode, response.UserCodetxt);
          this.setToken(constStorage.UserName, response.UserNametxt);

          if (response.UserTypetxt !== UserConstant.SuperAdmin) {
            this.setToken(constStorage.Division, response.Divisionvtxt);
          }
        })
      );
  }

  removeToken() {
    this.localStorageService.removeItem(constStorage.token);
    this.localStorageService.removeItem(constStorage.refreshToken);
    this.localStorageService.removeItem(constStorage.IDbint);
    this.localStorageService.removeItem(constStorage.UserType);
    this.localStorageService.removeItem(constStorage.UserCode);
    this.localStorageService.removeItem(constStorage.Division);
    this.localStorageService.removeItem(constStorage.UserName);
  }
  refreshToken(): Observable<any> {
    this.setToken(constStorage.Loading, 'true');
    const RefreshToken = this.localStorageService.getItem(constStorage.refreshToken);
    const Token = this.localStorageService.getItem(constStorage.token);
    return this.http.post<any>(
      `${environment.ApiUrl}/UserMaster/Refresh`,
      {
        TokenTxt: Token,
        RefreshTokenTxt: RefreshToken
      }).pipe(
        tap(response => {
          this.setToken(constStorage.Loading, 'false');
          if (response.Issue == "Invalid refresh token") {
            this.router.navigate(['/user/login']);
            this._AlertService.error('User Token Expired Please Login Again');
          }
          this.setToken(constStorage.token, response.token);
          this.setToken(constStorage.refreshToken, response.refreshToken);
        },
          err => {
            console.log(err);
          })
      );
  }
  logout(): void {
    this.removeToken();
    this.router.navigate(['/user/login']);
    // this.user$.next(null);
  }

  private setToken(key: string, token: string): void {
    this.localStorageService.setItem(key, token);
  }
}
