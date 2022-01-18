import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
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
      if (localStorage.getItem('token') != null && localStorage.getItem('refreshToken') != null 
       && (localStorage.getItem('UserType') ==UserConstant.SalesPromoter || localStorage.getItem('UserType') ==UserConstant.SalesPromoterUser
       || localStorage.getItem('UserType') ==UserConstant.OrderAnalyst )   )
        return true;
      else {
        this.router.navigate(['/user/login']);
        return false;
      }
  
    }
}
