
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { RoleManagementService } from 'src/app/shared/RoleManagementService';
import { SystemAdminComponent } from '../SystemAdmin.component';

@Component({
  selector: 'app-role-management-edit',
  templateUrl: './role-management-edit.component.html',
  styleUrls: ['./role-management-edit.component.css']
})
export class SystemAdminRoleManagementEditComponent implements OnInit {
  constructor(private _RoleManagementService: RoleManagementService, 
    private _SystemAdminComponent:SystemAdminComponent,private alertService: AlertService,public datepipe: DatePipe,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
    HeaderData;
    status;
    i;
    roleno=0;
    Roles :any=[];
    RolesInDB :any=[];
    RoleInfo :any=[];
    RoleName;
    RoleId
  RoleDescription;
  Userid;
  ngOnInit() {
    this.RoleId =this.storage.get('RoleId');
    this.GetRoleHeaderByRoleID();
    this.GetRoles();
  }

  onRoleChange(role,event){

    const checked = event.target.checked;  
   
     if (checked) {  
      role.IsActive =true;
      role.Checked =1;
        } else {  
          
      role.IsActive =false;
      role.Checked =0;
      }  
  }


  GetRoleDetailsByRoleID(){
    this._RoleManagementService.GetRoleDetailsByRoleID(this.RoleId).subscribe((data: any) => {
      this.RolesInDB = data ;
      for(let i=0;i<this.RolesInDB.length;i++){
        for(let j=0;j<this.Roles.length;j++){
            if(this.Roles[j].IDint==this.RolesInDB[i].RoleIDint){
              this.Roles[j].IsActive =true;
              this.Roles[j].Checked =1;
            }
        }
      }

    });
  }

  GetRoleHeaderByRoleID(){
    this._RoleManagementService.GetRoleHeaderByRoleID(this.RoleId).subscribe(  
      data => {  
       this.RoleDescription = data[0].RoleDescriptionvtxt ;  
       this.RoleName = data[0].RoleNamevtxt ;  
      }  
    );  
  }



  UpdateRoleHeader() {
    this._RoleManagementService.UpdateRoleHeader(this.HeaderData).subscribe(
      (res: any) => {
        this.DeleteRoleDetails();
        this.InsertRoleDetails(res.IDbint);
      },
      err => { 
        this._SystemAdminComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Due to some error data not inserted.');
        else
          console.log(err);
      }
    );
  }

  InsertRoleDetails(id) {
    for(let i=0;i<this.Roles.length;i++){
      if(this.Roles[i].Checked!=0 &&  this.Roles[i].Checked!=''&& this.Roles[i].Checked!=null){
        let Data={
          RoleIDint :this.Roles[i].IDint ,
          RoleNamevtxt :this.Roles[i].Rolevtxt ,
          HeaderIDbint: id,
        }
        this._RoleManagementService.InsertRoleDetails(Data).subscribe(
          (res: any) => {
            this.status=0;
            this._SystemAdminComponent.setLoading(false);
            this.OnSuccess();

          },
          err => { 
            this._SystemAdminComponent.setLoading(false);
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
    if(this.i==0&&this.status==0){
      this.router.navigateByUrl('/SystemAdmin/RoleManagementList');
      this.alertService.success('Role Created.');
    } 
    this.i++;
  }

  Submit(){
    this._SystemAdminComponent.setLoading(true);
    this.i=0;
    this.status=1;
    this.UpdateHeader();
    this.UpdateRoleHeader();
  }

  UpdateHeader(){
if(this.RoleDescription==''){
  this.RoleDescription=null;
}
    this.HeaderData={
      IDbint :this.RoleId ,
      RoleNamevtxt :this.RoleName,
      RoleDescriptionvtxt:this.RoleDescription,
      CreatedByvtxt : this.Userid,
    }
  
  }

  
  DeleteRoleDetails() {
    this._RoleManagementService.DeleteRoleDetails(this.RoleId).subscribe(
      data => {
       console.log(data);
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

  GetRoles() {
    this._RoleManagementService.GetRoles().subscribe(
      data => {
        this.Roles = data;
        this.GetRoleDetailsByRoleID();  
      }
    );
  }
}
