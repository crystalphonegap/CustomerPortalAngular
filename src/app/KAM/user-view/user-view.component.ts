import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Session } from 'protractor';
import { AlertService } from 'src/app/component/alert.service';
import { Encrypt } from 'src/app/component/Encrypt';
import { constStorage } from 'src/app/models/Storege';
import { UserConstant } from 'src/app/models/Userconstant';
import { RoleManagementService } from 'src/app/shared/RoleManagementService';
import { UserService } from 'src/app/shared/user.service';
import { PasswordStrengthBarComponent } from '../password-strength-bar/password-strength-bar.component';


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class KAMUserViewComponent implements OnInit {

  constructor(private _Encrypt :Encrypt,private _RoleManagementService: RoleManagementService, private service: UserService, private router: Router
    , @Inject(SESSION_STORAGE) private storage: WebStorageService, private _PasswordStrengthBarComponent: PasswordStrengthBarComponent
    , private alertService: AlertService) { }
  Password: string = null;
  ConfirmPassword: string = null;
  Error: string;
  Roles;
  Active;
  Status;
Data;
UserRoles :any =[];
  RolesOfUser;
  userId;
  UserCode;
  userAdd;
  ngOnInit() {

    let UserTypetxt=  localStorage.getItem(constStorage.UserType);
      this.UserCode= localStorage.getItem(constStorage.UserCode);
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

    let CustCode = localStorage.getItem(constStorage.UserCode);
    for (let i = 0; i < this.UserRoles.length; i++) {
      if (this.UserRoles[i].Checked == true) {
        let Data = {
          RoleIDbint: this.UserRoles[i].IDbint,
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
        this.LoadRoles(UserCode) ;
      }
    );
  }

  LoadRoles(UserCode) {
    this.service.GetUserRolesHeaderDataByUserCode(this.UserCode).subscribe(
      (res: any) => {
        if(res['0']!=null&&res['0']!=''){
          this.Data=res;
          this.SetRoles();
        }else{
          this.SetDefaultRoles();
        }

        this.GetUserRoles(UserCode);
      },
      err => {
        if (err.status == 400)
          this.alertService.error('Some Error Occored :( .');
        else
          console.log(err);
      }
    );
  }

  SetDefaultRoles(){
    this.UserRoles=this.Roles;
  }
  SetRoles(){
    for(let i=0; i<this.Data.length;i++){
      for(let j=0; j<this.Roles.length;j++){
      if(this.Data[i].RoleIDbint==this.Roles[j].IDbint){
       let role={
        IDbint: this.Roles[j].IDbint,
        RoleNamevtxt:this.Roles[j].RoleNamevtxt,
        RoleDescriptionvtxt:this.Roles[j].RoleDescriptionvtxt
       }
          this.UserRoles.push(role);
      }
    }
  }
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
        this.Error = "Hint : Use number,upper letter ,lower letter and KAMecial characters";
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
      Passwordvtxt:this._Encrypt.set( this.userAdd.controls['Passwordvtxt'].value),
      CPasswordvtxt: this._Encrypt.set(this.userAdd.controls['CPasswordvtxt'].value),
      IsActivebit: this.Status,
      ModifyByint : this.userAdd.controls['ModifyByint'].value,
    };
    this.service.updateUser(userAdddata).subscribe(
      (res: any) => {
        this.DeleteRoleByUserCode( this.userAdd.controls['UserCodetxt'].value)
        this.AddRoles();
        this.router.navigateByUrl('/KAM/UserList');
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
          for(let j=0;j<this.UserRoles.length;j++){
              if(this.RolesOfUser[i].RoleIDbint==this.UserRoles[j].IDbint){
                this.UserRoles[j].Checked=true;
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
