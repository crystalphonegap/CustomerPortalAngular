import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { constStorage } from '../models/Storege';
import { UserConstant } from '../models/Userconstant';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) { }
    
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      if (localStorage.getItem(constStorage.token) != null && localStorage.getItem(constStorage.refreshToken) != null && (localStorage.getItem(constStorage.UserType) ==UserConstant.Retailer ) )
        return true;
      else {
        this.router.navigate(['/user/login']);
        return false;
      }
  
    }
}
