import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-customer-menu',
  templateUrl: './customer-menu.component.html',
  styleUrls: ['./customer-menu.component.css']
})
export class CustomerMenuComponent implements OnInit {

  constructor( private router: Router, private authService: AuthService) { }
  UserType;
  UserName;
  Customer:string='none';
  ngOnInit(): void {
    this.UserType= localStorage.getItem('UserType');
    this.UserName= localStorage.getItem('UserName');
    if(  this.UserType=='Customer' ){
      this.Customer='inherit';
    }else {
      this.Customer='none';
    }
    

  }
  onLogout() {
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'||UserTypetxt=='User'){
      this.authService.logout();
    }else {
      window.top.close();
    }
    
    
    
  }
}
