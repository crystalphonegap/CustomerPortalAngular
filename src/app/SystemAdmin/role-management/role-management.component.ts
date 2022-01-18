import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { constStorage } from 'src/app/models/Storege';
import { RoleManagementService } from 'src/app/shared/RoleManagementService';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class SystemAdminRoleManagementComponent implements OnInit {
  constructor(private _RoleManagementService: RoleManagementService, 
    private alertService: AlertService,public datepipe: DatePipe,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
    HeaderData;
    status;
    i;
    Roles:any =[];
    RoleName;
  RoleDescription;
  Userid;
  ngOnInit() {
    this.Userid = localStorage.getItem(constStorage.UserCode);
    this.GetRoles();
  }

  onRoleChange(role,Id){
    if( role.IsActive==0||  role.IsActive==''|| role.IsActive==null){
      role.IsActive =1;
    }else{
      role.IsActive =0;
    }
  }

  InsertRoleHeader() {
    this._RoleManagementService.InsertRoleHeader(this.HeaderData).subscribe(
      (res: any) => {
        this.InsertRoleDetails(res);
      },
      err => { 
        if (err.status == 400)
          this.alertService.error('Due to some error data not inserted.');
        else
          console.log(err);
      }
    );
  }

  InsertRoleDetails(id) {
    for(let i=0;i<this.Roles.length;i++){
      if( this.Roles[i].IsActive!=0 &&  this.Roles[i].IsActive!=''&& this.Roles[i].IsActive!=null){
        let Data={
          RoleIDint :this.Roles[i].IDint ,
          RoleNamevtxt :this.Roles[i].Rolevtxt ,
          HeaderIDbint: id,
        }
        this._RoleManagementService.InsertRoleDetails(Data).subscribe(
          (res: any) => {
            this.status=0;
            this.OnSuccess();

          },
          err => { 
            this.status=1;
            if (err.status == 400)
              this.alertService.error('Due to some error data not inserted.');
            else
              console.log(err);
          }
        );
      }
    }
  }

  updateRoleDescription(value) {
    this.RoleDescription = value;
  }
  updateRoleName(value) {
    this.RoleName = value;
  }
  OnSuccess(){
    if(this.i<1&&this.status==0){
      // this.storage.set('RoleId');
      this.router.navigateByUrl('/SystemAdmin/RoleManagementList');
       this.alertService.success('Role Created.');
    }
    this.i++;
  }

  Submit(){
    this.i=0;
    this.status=1;
    this.UpdateHeader();
    this.InsertRoleHeader();
  }

  UpdateHeader(){
if(this.RoleDescription==''){
  this.RoleDescription=null;
}
    this.HeaderData={
      IDbint :0 ,
      RoleNamevtxt :this.RoleName,
      RoleDescriptionvtxt:this.RoleDescription,
      CreatedByvtxt : this.Userid,
    }
  
  }
  GetRoles() {
    this._RoleManagementService.GetRoles().subscribe(
      data => {
        this.Roles = data;
      }
    );
  }
}
