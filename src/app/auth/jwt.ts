import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
 
@Injectable()
export class JWTTokenService {
 
    jwtToken: string;
    decodedToken: { [key: string]: string };
 
    constructor() {
    }
 
    setToken(token: string) {
      if (token) {
        this.jwtToken = token;
      }
    }

    getToken() {
      return this.jwtToken;
    }
 
    decodeToken() {
      if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
      }
    }
 
    getDecodeToken() {
      return jwt_decode(this.jwtToken);
    }
 
    getUser() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.displayname : null;
    }
 
    getEmailId() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.email : null;
    }
 
    getExpiryTime() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.exp : null;
    }
 
    isTokenExpired(): boolean {
      const expiryTime = this.getExpiryTime();
      var numberValue = Number(expiryTime);
      if (numberValue) {
        return ((1000 * numberValue) - (new Date()).getTime()) < 5000;
      } else {
        return false;
      }
    }
}