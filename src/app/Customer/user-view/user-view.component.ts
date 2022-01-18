import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Session } from 'protractor';
import { AlertService } from 'src/app/component/alert.service';
import { Encrypt } from 'src/app/component/Encrypt';
import { RoleManagementService } from 'src/app/shared/RoleManagementService';
import { UserService } from 'src/app/shared/user.service';
import { PasswordStrengthBarComponent } from 'src/app/user/password-strength-bar/password-strength-bar.component';


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class CustomerUserViewComponent implements OnInit {

  constructor(private _Encrypt :Encrypt,private _RoleManagementService: RoleManagementService, private service: UserService, private router: Router
    , @Inject(SESSION_STORAGE) private storage: WebStorageService, private _PasswordStrengthBarComponent: PasswordStrengthBarComponent
    , private alertService: AlertService) { }
  Password: string = null;
  ConfirmPassword: string = null;
  Error: string;
  Roles;
  Active;
  Status;
  RolesOfUser;
  userId;
  userAdd;
  ngOnInit() {
    this.userId=this.storage.get('UserId');
    this.GetUser();
    
  }

  GetUser(){
    let CustId = localStorage.getItem('IDbint');
    this.service.getUsersByUserId(this.userId).subscribe(
      data => {
        
        let UserCode=data['UserCodetxt'];
        this.GetRoleByKeyword("",UserCode);
        let UserData=data;
        this.userAdd = new FormGroup({
          Idbint: new FormControl(data['Idbint']),
          UserCodetxt: new FormControl(UserCode),
          UserNametxt: new FormControl(data['UserNametxt']),
          UserTypetxt: new FormControl(data['UserTypetxt']),
          Divisionvtxt: new FormControl(data['Divisionvtxt']),
          Mobilevtxt: new FormControl(data['Mobilevtxt']),
          Emailvtxt: new FormControl(data['Emailvtxt']),
          Passwordvtxt: new FormControl(this._Encrypt.get(data['Passwordvtxt'])),
          CPasswordvtxt: new FormControl(this._Encrypt.get(data['Passwordvtxt'])),
          IsActivebit: new FormControl(data['IsActivebit']),
          ModifyByint : new FormControl(CustId),
        });
       this.Status=data['IsActivebit'];
        if(data['IsActivebit']==true){
          this.Active=1;
        }else{
          this.Active=0;
        }
        
      
      }
    );
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

  GetRoleByKeyword(Keyword,UserCode) {
    this._RoleManagementService.GetRoleByKeyword(Keyword).subscribe(
      data => {
        this.Roles = data;
        this.GetUserRoles(UserCode);
      }
    );
  }


  DeleteRoleByUserCode(UserCode){
    this._RoleManagementService.DeleteRoleByUserCode(UserCode).subscribe(
      data => {
       
      }
    );
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
    let userAdddata = {
      Idbint: this.userAdd.controls['Idbint'].value,
      UserCodetxt: this.userAdd.controls['UserCodetxt'].value,
      UserNametxt: this.userAdd.controls['UserNametxt'].value,
      UserTypetxt: this.userAdd.controls['UserTypetxt'].value,
      Divisionvtxt: this.userAdd.controls['Divisionvtxt'].value,
      Mobilevtxt: this.userAdd.controls['Mobilevtxt'].value,
      Emailvtxt: this.userAdd.controls['Emailvtxt'].value,
      Passwordvtxt: this._Encrypt.set(this.userAdd.controls['Passwordvtxt'].value),
      CPasswordvtxt: this._Encrypt.set(this.userAdd.controls['CPasswordvtxt'].value),
      IsActivebit: this.Status,
      ModifyByint : this.userAdd.controls['ModifyByint'].value,
    };
    this.service.updateUser(userAdddata).subscribe(
      (res: any) => {
        
        this.DeleteRoleByUserCode( this.userAdd.controls['UserCodetxt'].value)
        this.AddRoles();
        this.router.navigateByUrl('/Customer/UserList');
        this.alertService.success('User Updated succesfully.');
        
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


  onStatusChange( event) {

    const checked = event.target.checked;

    if (checked) {
     this.Status = true;
    } else {

      this.Status  = false;
    }
  }


  GetUserRoles(UserCode){
    this._RoleManagementService.getRolesHeaderByUserCode(UserCode).subscribe(
      data => {
        this.RolesOfUser = data;
        for(let i=0;i< this.RolesOfUser.length;i++){
          for(let j=0;j<this.Roles.length;j++){
              if(this.RolesOfUser[i].RoleIDbint==this.Roles[j].IDbint){
                this.Roles[j].Checked=true;
              }
          }
        }
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
