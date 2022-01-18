import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { constStorage } from 'src/app/models/Storege';
@Component({
  selector: 'app-CFnavigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class CfNavigationBarComponent implements OnInit {

  constructor(private router: Router ,private _AuthService:AuthService) { }
  UserType
  UserName;
  ngOnInit(): void {
    this.UserType= localStorage.getItem(constStorage.UserType);
    this.UserName= localStorage.getItem(constStorage.UserName);
  }

  onLogout() {
   this._AuthService.logout();
  }

}
