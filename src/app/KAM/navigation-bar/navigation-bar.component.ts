import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-KAMnavigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class KAMNavigationBarComponent implements OnInit {

  constructor(private router: Router, private   _AuthService  :AuthService) { }
  UserType
  UserName;
  ngOnInit(): void {
    this.UserType= localStorage.getItem('UserType');
    this.UserName= localStorage.getItem('UserName');
  }

  onLogout() {
  this._AuthService.logout();
  }

}
