import { UserService } from '../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl ,Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
 import { AlertService } from '../../component/alert.service';
import { SuperAdminHomenavComponent } from '../homenav/homenav.component';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { Encrypt } from 'src/app/component/Encrypt';
import { PasswordStrengthBarComponent } from '../password-strength-bar/password-strength-bar.component';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class SuperAdminAddUserComponent implements OnInit {
  SelfData= false;
  userAdd : FormGroup; 
  Userid =null ;
  User: any; 
  constructor(private _Encrypt :Encrypt,private service: UserService, private router: Router
    ,@Inject(SESSION_STORAGE) private storage: WebStorageService, private _PasswordStrengthBarComponent: PasswordStrengthBarComponent
    , private alertService: AlertService) { }
  Password: string = null;
  ConfirmPassword: string = null;
  Error: string;

  ngOnInit(): void {
    this.userAdd = new FormGroup({
      UserCodetxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
      UserNametxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
      UserTypetxt : new FormControl('SystemAdmin', [Validators.required, Validators.maxLength(256)]),
      Divisionvtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
      Mobilevtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
      Emailvtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
      Passwordvtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
      CPasswordvtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
      IsActivebit: new FormControl(true, [Validators.required]),
    })
    this.Userid =null;
    this.Userid= this.storage.get('Userid');
    if(localStorage.getItem('IDbint')==this.Userid){
      this.SelfData=true;
    }
    if(this.Userid!==null && this.Userid!==""){
      this.storage.set('Userid',null);
      this.service.getUserData(this.Userid).subscribe(  
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
          Passwordvtxt : new FormControl(this._Encrypt.get(this.User.Passwordvtxt), [Validators.required, Validators.maxLength(256)]),
          CPasswordvtxt : new FormControl(this._Encrypt.get(this.User.Passwordvtxt), [Validators.required, Validators.maxLength(256)]),
          IsActivebit: new FormControl(this.User.IsActivebit, [Validators.required]),
        })
        }  
      );  
    }
    else{
      this.userAdd = new FormGroup({
        UserCodetxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
        UserNametxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
        UserTypetxt : new FormControl('SystemAdmin', [Validators.required, Validators.maxLength(256)]),
        Divisionvtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
        Mobilevtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
        Emailvtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
        Passwordvtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
        CPasswordvtxt : new FormControl('', [Validators.required, Validators.maxLength(256)]),
        IsActivebit: new FormControl(true, [Validators.required]),
      })
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
    if(this.Password !=null && this.Password !=''){
      if (this.Password.length < 8) {
        this.alertService.warn("Password must be of 8 digit atleast");
        return;
      }
  
      if (this._PasswordStrengthBarComponent.getStrength(this.Password) < 40) {
        this.alertService.warn("Please Enter Strong Password");
        this.Error = "Hint : Use number,upper letter ,lower letter and special characters";
        return;
      }
    }
    
    if (passwordControl !== confirmPasswordControl) {
      this.alertService.error('passwordMismatch :(', 'passwordMismatch');
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return null;
    } 

    this.userAdd.get('Passwordvtxt').setValue(this._Encrypt.set(passwordControl) );
    this.userAdd.get('CPasswordvtxt').setValue(this._Encrypt.set(passwordControl) );
    if(this.Userid!==null && this.Userid!==''){
      this.service.updateUser(this.userAdd.value).subscribe(
        (res: any) => {
          if(this.SelfData){
            this.router.navigateByUrl('/SuperAdmin/Profile');
            this.alertService.success('Profile updated succesfully.');
          }else
          {
            this.router.navigateByUrl('/SuperAdmin/dashboard');
            this.alertService.success('User Updated Succesfully.');
          }
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
           this.router.navigateByUrl('/SuperAdmin/dashboard');
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

  CheckPassword(value, type) {
    if (type == 'p') {
      this.Password = value;
      if (this.Password != null && this.Password != '') {
        if (this.Password.length < 8) {
          this.Error = "Password must be of 8 digit atleast";
          return;
        } else {
          if (this._PasswordStrengthBarComponent.getStrength(this.Password) < 40) {
            this.Error = "Hint : Use number,upper letter ,lower letter and special characters";
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
