import { Component, OnInit } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { FormGroup, FormControl ,Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { constStorage } from 'src/app/models/Storege';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class EmpProfileComponent implements OnInit {
  Userid =null ;
  User: any=[]; 
  constructor(private service: UserService, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  ngOnInit(): void {
    this.Userid= localStorage.getItem(constStorage.IDbint);
    if(this.Userid!==null && this.Userid!==""){
      this.service.getUserProfile(this.Userid).subscribe(  
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
    // console.log('recieved= key:' + key + 'value:' + val);
    this.storage.set('Userid',value);
    this.router.navigateByUrl('/Emp/Editprofile');
    console.log(this.storage.get('Userid'));
    // this.data[key]= this.storage.get(key);
   }


}
