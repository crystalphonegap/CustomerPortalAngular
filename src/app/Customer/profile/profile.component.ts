import { Component, OnInit } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { FormGroup, FormControl ,Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class CustomerProfileComponent implements OnInit {
  constructor(private service: UserService, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  User: any=[]; 
  ngOnInit(): void {
    let Userid= localStorage.getItem('IDbint');
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'||UserTypetxt=='User'){
      UserCode= Userid;
    }else{
      UserCode=localStorage.getItem('CustID');
    }
    this.getUserData(UserCode);
  }

  getUserData(Userid){
    if(Userid!==null &&Userid!==""){
      this.service.getUserProfile(Userid).subscribe(  
        data => {  
         this.User = data ;  
        }  
      );  
    }
    else{
      this.router.navigate(['/user/login']);
    }
  }

  pass(value): void {
    
    this.storage.set('Userid',value);
    this.router.navigateByUrl('/Customer/Editprofile');
    console.log(this.storage.get('Userid'));
    
   }


}
