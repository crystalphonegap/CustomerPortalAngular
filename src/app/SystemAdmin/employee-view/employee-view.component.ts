import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { FormGroup, FormControl ,Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../component/alert.service';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { RoleManagementService } from 'src/app/shared/RoleManagementService';
import { constStorage } from 'src/app/models/Storege';
import { SystemAdminComponent } from '../SystemAdmin.component';
import { Encrypt } from 'src/app/component/Encrypt';
import { PasswordStrengthBarComponent } from '../password-strength-bar/password-strength-bar.component';


@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {

  EnableEdit:string = 'none';
  ViewZone:string = 'none';
  ViewRegion:string = 'none';
  ViewBranch:string = 'none';
  ViewTSE:string = 'none';
  UserCode = null;
  Userid =null ;
  User: any=[];
  constructor(private _Encrypt :Encrypt,private service: UserService, private router: Router
    , private _SystemAdminComponent:SystemAdminComponent,@Inject(SESSION_STORAGE) private storage: WebStorageService
   , private alertService : AlertService,private _RoleManagementService:RoleManagementService, private _PasswordStrengthBarComponent: PasswordStrengthBarComponent
   ) { }
 Password: string = null;
 ConfirmPassword: string = null;
 Error: string;
  ngOnInit(): void {
    this.Userid =null;
    this.Userid= this.storage.get('Userid');
    this.GetUserData();
}

GetUserData(){
  if(this.Userid!==null && this.Userid!==""){
    this.service.UserDetailById(this.Userid).subscribe(
      data => {
        if(data!=null){
          this.User = data ;
          this.UserCode=this.User.UserCodetxt;
          if(this.User.UserTypetxt=="Territory Sales Executive"){
            this.ViewZone = '';
            this.ViewRegion = '';
            this.ViewBranch = '';
            this.ViewTSE = '';
            this.EnableEdit= '';
          }
          if(this.User.UserTypetxt=="Branch Manager"){
            this.ViewZone = '';
            this.ViewRegion = '';
            this.ViewBranch = '';
            this.EnableEdit= '';
          }
          if(this.User.UserTypetxt=="Regional Manager"){
            this.ViewZone = '';
            this.ViewRegion = '';
            this.EnableEdit= '';
          }
          if(this.User.UserTypetxt=="Zonal Manager"){
            this.ViewZone = '';
            this.EnableEdit= '';
          }
        }
      }
    );
  }
}


Edit(){

}



}
