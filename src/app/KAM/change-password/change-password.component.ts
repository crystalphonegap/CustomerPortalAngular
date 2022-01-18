import { UserService } from '../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl ,Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
 import { AlertService } from '../../component/alert.service';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { Encrypt } from 'src/app/component/Encrypt';
import { PasswordStrengthBarComponent } from '../password-strength-bar/password-strength-bar.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class KAMChangePasswordComponent implements OnInit {

  constructor(private _Encrypt :Encrypt,private service: UserService, private router: Router
    ,@Inject(SESSION_STORAGE) private storage: WebStorageService, private _PasswordStrengthBarComponent: PasswordStrengthBarComponent
    , private alertService: AlertService) { }
  Password: string = null;
  ConfirmPassword: string = null;
  Error: string;
 UserData
  ngOnInit() {
    this.UserData = new FormGroup({
      Idbint : new FormControl(localStorage.getItem('IDbint')),
      Passwordvtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
      NewPassword : new FormControl('', [Validators.required, Validators.maxLength(256)]),
      CNewPassword : new FormControl('', [Validators.required, Validators.maxLength(256)]),
    });
  }

  OnSubmit(){
    const passwordControl = this.UserData.controls['NewPassword'].value;
    const confirmPasswordControl = this.UserData.controls['CNewPassword'].value;
    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }
    if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
      return null;
    }
    if (this.Password.length < 8) {
      this.alertService.warn("Password must be of 8 digit atleast");
      return;
    }

    if (this._PasswordStrengthBarComponent.getStrength(this.Password) < 40) {
      this.alertService.warn("Please Enter Strong Password");
      this.Error = "Hint : Use number,upper letter ,lower letter and KAMecial characters";
      return;
    }
    if (passwordControl !== confirmPasswordControl) {
      this.alertService.error('passwordMismatch :(', 'passwordMismatch');
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return null;
    }
    let  UserData = {
      Idbint : localStorage.getItem('IDbint'),
      Passwordvtxt :this._Encrypt.set(this.UserData.controls['Passwordvtxt'].value)  ,
      NewPassword :this._Encrypt.set(this.UserData.controls['NewPassword'].value) ,
    }
    this.service.ChangePassword(UserData).subscribe(
      (res: any) => {
       if(res==0){
        this.alertService.error('Please Enter Correct Password');
        return null;
       }
          this.router.navigateByUrl('/KAM/dashboard');
          this.alertService.success('Password Updated Succesfully.');
      },
      err => {
         if (err.status == 400)
           this.alertService.error('Error Password not updated.');
         else
          console.log(err);
      }
    );

  }

  CheckPassword(value, type) {
    if (type == 'p') {
      this.Password = value;
      if (this.Password != null && this.Password != '') {
        if (this.Password.length < 8) {
          this.Error = "Password must be of 8 digit atleast";
          return;
        } else {
          if (this._PasswordStrengthBarComponent.getStrength(this.Password) < 40) {
            this.Error = "Hint : Use number,upper letter ,lower letter and KAMecial characters";
            return;
          } else {
            this.Error = null;
          }
        }
      }
    } else {
      this.ConfirmPassword = value;
    }
    if (this.Password != null && this.Password != '') {
      if (this.ConfirmPassword != null && this.ConfirmPassword != '') {
        if (this.ConfirmPassword != this.Password) {
          this.Error = "Confrim Password is wrong";
          return;
        } else {
          this.Error = null;
        }
      }
    }
  }

}
