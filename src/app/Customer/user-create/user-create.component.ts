import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { Encrypt } from 'src/app/component/Encrypt';
import { RoleManagementService } from 'src/app/shared/RoleManagementService';
import { UserService } from 'src/app/shared/user.service';
import { PasswordStrengthBarComponent } from '../password-strength-bar/password-strength-bar.component';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class CustomerUserCreateComponent implements OnInit {

  constructor(private _Encrypt :Encrypt,private _RoleManagementService: RoleManagementService, private service: UserService, private router: Router
    , @Inject(SESSION_STORAGE) private storage: WebStorageService, private _PasswordStrengthBarComponent: PasswordStrengthBarComponent
    , private alertService: AlertService) { }
  Password: string = null;
  ConfirmPassword: string = null;
  Error: string;
  Roles
  userAdd;
  i;
  ngOnInit() {
    let CustId = localStorage.getItem('IDbint');
    let Division = localStorage.getItem('Division');
    
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this.userAdd = new FormGroup({
      UserCodetxt: new FormControl('', [Validators.required]),
      UserNametxt: new FormControl('', [Validators.required, Validators.maxLength(256)]),
      UserTypetxt: new FormControl('User', [Validators.required, Validators.maxLength(256)]),
      Divisionvtxt: new FormControl(Division, [Validators.required, Validators.maxLength(256)]),
      Mobilevtxt: new FormControl('', [Validators.required, Validators.maxLength(256)]),
      Emailvtxt: new FormControl('', [Validators.required, Validators.maxLength(256)]),
      Passwordvtxt: new FormControl('', [Validators.required, Validators.maxLength(256)]),
      CPasswordvtxt: new FormControl('', [Validators.required, Validators.maxLength(256)]),
      IsActivebit: new FormControl('', [Validators.required]),
      ParentCodevtxt: new FormControl(UserCode),
      CreatedByint: new FormControl(CustId),
    });

    this.GetRoleByKeyword("");
  }

  GetRoleByKeyword(Keyword) {
    this._RoleManagementService.GetRoleByKeyword(Keyword).subscribe(
      data => {
        this.Roles = data;
      }
    );
  }


  onSubmit() {
    this.i=0;
    const passwordControl = this.userAdd.controls['Passwordvtxt'].value;
    const confirmPasswordControl = this.userAdd.controls['CPasswordvtxt'].value;
    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }
    if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
      return null;
    }
    if(this.Password!=null && this.Password!=''){
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
    this.service.addUser(this.userAdd.value).subscribe(
      (res: any) => {

          if(res=='-2'){
            this.alertService.error("User Already Exists!");
            return;
          }
          else{
            this.AddRoles();

          }
        
      },
      err => {
        if (err.status == 400)
          this.alertService.error('Error user not added.');
        else
          console.log(err);
      }
    );
  }

  onRoleChange(role, event) {

    const checked = event.target.checked;

    if (checked) {
      role.Checked = true;
    } else {

      role.Checked = false;
    }
  }

  AddRoles() {
    
    let CustCode = localStorage.getItem('UserCode');
    for (let i = 0; i < this.Roles.length; i++) {
      if (this.Roles[i].Checked == true) {
        let Data = {
          RoleIDbint: this.Roles[i].IDbint,
          UserCodevtxt: this.userAdd.controls['UserCodetxt'].value,
          CreatedByvtxt: CustCode,
        }
        this._RoleManagementService.InsertRoleDetailsforUser(Data).subscribe(
          data => {
           
            this.OnSuccess();
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

  OnSuccess(){
    if(this.i<1){
      this.router.navigateByUrl('/Customer/UserList');
      this.alertService.success('User added succesfully.');
     
    }
    this.i++;
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
