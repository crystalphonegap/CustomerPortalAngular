
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { RoleManagementService } from 'src/app/shared/RoleManagementService';

@Component({
  selector: 'app-role-management-view',
  templateUrl: './role-management-view.component.html',
  styleUrls: ['./role-management-view.component.css']
})
export class SystemAdminRoleManagementViewComponent  {
  constructor(private _RoleManagementService :RoleManagementService, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  Roles: any=[];
  RoleInfo: any=[];
  ngOnInit() {
    let RoleId =this.storage.get('RoleId');
    this.GetRoleHeaderByRoleID(RoleId);
    this.GetRoleDetailsByRoleID (RoleId);  
  }

  GetRoleDetailsByRoleID(RoleId){
    this._RoleManagementService.GetRoleDetailsByRoleID(RoleId).subscribe((data: any) => {
      this.Roles = data ;
    });
  }

  GetRoleHeaderByRoleID(RoleId){
    this._RoleManagementService.GetRoleHeaderByRoleID(RoleId).subscribe(  
      data => {  
       this.RoleInfo = data[0] ;  
      }  
    );  
  }

  Back(){
    this.storage.remove('RoleId');
    
    this.router.navigateByUrl('/SystemAdmin/RoleManagementList');
  }

  
  
  Edit(){
    this.router.navigateByUrl('/SystemAdmin/RoleManagementEdit');
  }
}
