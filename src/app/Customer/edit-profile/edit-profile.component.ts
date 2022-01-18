import { UserService } from '../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl ,Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
 import { AlertService } from '../../component/alert.service';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html'
})
export class CustomerProfileEditComponent implements OnInit {
  userAdd :any=[];
  Userid =null ;
  User:any=[];
  constructor(private service: UserService, private router: Router
    ,@Inject(SESSION_STORAGE) private storage: WebStorageService
   , private alertService : AlertService) { }

  ngOnInit(): void {
    this.Userid =null;
    this.Userid= this.storage.get('Userid');
    if(this.Userid!==null && this.Userid!==""){
      this.storage.set('Userid',null);
      this.service.getUserProfile(this.Userid).subscribe(  
        data => {  
         this.User = data ;  
         this.userAdd = new FormGroup({
          Idbint : new FormControl(this.Userid),
          UserCodetxt : new FormControl(this.User.UserCodetxt, [Validators.required, Validators.maxLength(256)]),
          UserNametxt : new FormControl(this.User.UserNametxt, [Validators.required, Validators.maxLength(256)]),
          UserTypetxt : new FormControl(this.User.UserTypetxt, [Validators.required, Validators.maxLength(256)]),
          Divisionvtxt : new FormControl(this.User.Divisionvtxt, [Validators.required, Validators.maxLength(256)]),
          Mobilevtxt : new FormControl(this.User.Mobilevtxt, [Validators.required, Validators.maxLength(256)]),
          Emailvtxt : new FormControl(this.User.Emailvtxt, [Validators.required, Validators.maxLength(256)]),
          Passwordvtxt : new FormControl(this.User.Passwordvtxt, [Validators.required, Validators.maxLength(256)]),
          CPasswordvtxt : new FormControl(this.User.Passwordvtxt, [Validators.required, Validators.maxLength(256)]),
      
        })
        }  
      );  
    }
    else{
      this.alertService.error('Error Session Expired.');
    }

  }

  onSubmit() {

    const passwordControl = this.userAdd.controls['Passwordvtxt'].value;
    const confirmPasswordControl = this.userAdd.controls['CPasswordvtxt'].value;
    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }
    if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
      return null;
    }
    if (passwordControl !== confirmPasswordControl) {
      this.alertService.error('passwordMismatch :(', 'passwordMismatch');
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return null;
    } 

    if(this.Userid!==null && this.Userid!==''){
      this.service.updateUser(this.userAdd.value).subscribe(
        (res: any) => {
            this.router.navigateByUrl('/Customer/profile');
            this.alertService.success('Profile updated succesfully.');
        },  
        err => {
           if (err.status == 400)
             this.alertService.error('Error user not updated.');
           else
            console.log(err);
        }
      );
    }
    else{
      this.service.addUser(this.userAdd.value).subscribe(
        (res: any) => {
           this.router.navigateByUrl('/Customer/dashboard');
           this.alertService.success('User added succesfully.');
          
        },  
        err => {
           if (err.status == 400)
             this.alertService.error('Error user not added.');
           else
            console.log(err);
        }
      );

    }

  
  }

}
