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
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { SystemAdminService } from 'src/app/shared/SystemAdminService';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class SystemAdminEmployeeEditComponent implements OnInit {

  Area= new FormControl('');
  AreaCode:string=null;
  AreaList: Observable<any>;
  Areaoptions;
  UserTypeEmployee:string = 'none';
  UserTypeNotEmployee:string = '' ;
  ViewZone:string = 'none';
  ViewRegion:string = 'none';
  ViewBranch:string = 'none';
  ViewTSE:string = 'none';
  SetRoles=0;
  Status;
  isActive;
  userAdd :FormGroup;
  UserCode = null;
  UserRolesHeader;
  Roles:any=[];
  Userid =null ;
  UserType:string;
  User: any;

  constructor(private _SystemAdminService:SystemAdminService, private changeDetection: ChangeDetectorRef,private _Encrypt :Encrypt,private service: UserService, private router: Router
    , private _SystemAdminComponent:SystemAdminComponent,@Inject(SESSION_STORAGE) private storage: WebStorageService
   , private alertService : AlertService,private _RoleManagementService:RoleManagementService, private _PasswordStrengthBarComponent: PasswordStrengthBarComponent
   ) { }
 Password: string = null;
 ConfirmPassword: string = null;
 Error: string;
  ngOnInit(): void {
    this.Userid =null;
    this.Userid= this.storage.get('Userid');
    this.GetRoles();

}

GetUserData(){
  if(this.Userid!==null && this.Userid!==""){
    this.service.getUserData(this.Userid).subscribe(
      data => {
       this.User = data ;
       this.UserCode=this.User.UserCodetxt;
       this.GetUserRoles();
       this.UserType=this.User.UserTypetxt;
       if(this.User.UserTypetxt=="Territory Sales Executive"){
         this.ViewZone = '';
         this.Area=new FormControl(this.User.SalesOfficeNamevtxt);
         this.ViewRegion = '';
         this.ViewBranch = '';
         this.ViewTSE = '';
         this.UserTypeEmployee= '';
         this.UserTypeNotEmployee='none';
         this.GetTerritoryDate();
       }
       if(this.User.UserTypetxt=="Branch Manager"){
        this.Area=new FormControl(this.User.BranchNamevtxt);
         this.ViewZone = '';
         this.ViewRegion = '';
         this.ViewBranch = '';
         this.UserTypeEmployee= '';
         this.UserTypeNotEmployee='none';
         this.GetBranchData();
       }
       if(this.User.UserTypetxt=="Regional Manager"){
        this.Area=new FormControl(this.User.RegionDescriptionvtxt);
         this.ViewZone = '';
         this.ViewRegion = '';
         this.UserTypeEmployee= '';
         this.UserTypeNotEmployee='none';
         this.GetRegionData();
       }
       if(this.User.UserTypetxt=="Zonal Manager"){
        this.Area=new FormControl(this.User.ZoneDescriptionvtxt);
         this.ViewZone = '';
         this.UserTypeEmployee= '';
         this.UserTypeNotEmployee='none';
         this.GetZoneData();
       }
       this.AreaChanegd(false);
       this.userAdd = new FormGroup({
        Idbint : new FormControl(this.Userid),
        UserCodetxt : new FormControl(this.User.UserCodetxt, [Validators.required, Validators.maxLength(256)]),
        UserNametxt : new FormControl(this.User.UserNametxt, [Validators.required, Validators.maxLength(256)]),
        UserTypetxt : new FormControl(this.User.UserTypetxt, [Validators.required, Validators.maxLength(256)]),
        Divisionvtxt : new FormControl(this.User.Divisionvtxt, [Validators.required, Validators.maxLength(256)]),
        Mobilevtxt : new FormControl(this.User.Mobilevtxt, [Validators.required, Validators.maxLength(256)]),
        Emailvtxt : new FormControl(this.User.Emailvtxt, [Validators.required, Validators.maxLength(256)]),
        Passwordvtxt : new FormControl(this._Encrypt.get(this.User.Passwordvtxt)  , [Validators.required, Validators.maxLength(256)]),
        CPasswordvtxt : new FormControl(this._Encrypt.get(this.User.Passwordvtxt), [Validators.required, Validators.maxLength(256)]),
      });
        this.Status=this.User.IsActivebit;
        if(this.Status==true){
          this.isActive=1;
        }else{
          this.isActive=0;
        }
      }
    );
  }
}

AreaChanegd(notself:boolean){


  if(this.UserType=="Territory Sales Executive"){
    this._SystemAdminService.GetArea("SalesOffice", this.Area.value).subscribe((data: any) => {
      this._SystemAdminComponent.setLoading(false);
      if(data!=null){
        if(data.length==1){
          this.AreaCode=data[0].SalesOfficeCodevtxt;
          if(notself){
            this.onSubmit();
          }
        }else{
          this.AreaCode=null;
          for(let count:number =0; count<data.length;count++){
            if(data[0].SalesOfficeNamevtxt==this.Area.value){
              this.AreaCode=data[0].SalesOfficeCodevtxt;
              break;
            }
          }
          if(this.AreaCode==null){
            this.alertService.warn("Please Select Area");
            return null;
          }else{
            if(notself){
              this.onSubmit();
            }
          }
        }
      }else{
        this.AreaCode=null;
        if(this.AreaCode==null){
          this.alertService.warn("Please Select Area ");
          return null;
        }
      }
    },
      err => {
        this._SystemAdminComponent.setLoading(false);
        console.log(err)
      });
  }
  else if(this.UserType=="Branch Manager"){

    this._SystemAdminService.GetArea("Branch", this.Area.value).subscribe((data: any) => {
      this._SystemAdminComponent.setLoading(false);
      if(data!=null){
        if(data.length==1){
          this.AreaCode=data[0].BranchCodevtxt;
          if(notself){
            this.onSubmit();
          }
        }else{
          this.AreaCode=null;
          for(let count:number =0; count<data.length;count++){
            if(data[0].BranchNamevtxt==this.Area.value){
              this.AreaCode=data[0].BranchCodevtxt;
              break;
            }
          }
          if(this.AreaCode==null){
            this.alertService.warn("Please Select Area");
            return null;
          }else{
            if(notself){
              this.onSubmit();
            }
          }
        }
      }else{
        this.AreaCode=null;
        if(this.AreaCode==null){
          this.alertService.warn("Please Select Area ");
          return null;
        }
      }
    },
      err => {
        this._SystemAdminComponent.setLoading(false);
        console.log(err)
      });
  }
  else  if(this.UserType=="Regional Manager"){
  this._SystemAdminService.GetArea("Region",  this.Area.value).subscribe((data: any) => {
    this._SystemAdminComponent.setLoading(false);
    if(data!=null){
      if(data.length==1){
        this.AreaCode=data[0].RegionCodevtxt;
        if(notself){
          this.onSubmit();
        }
      }else{
        this.AreaCode=null;
        for(let count:number =0; count<data.length;count++){
          if(data[0].RegionDescriptionvtxt==this.Area.value){
            this.AreaCode=data[0].RegionCodevtxt;
            break;
          }
        }
        if(this.AreaCode==null){
          this.alertService.warn("Please Select Proper Area , No Record Available for Selected Area");
          return null;
        }else{
          if(notself){
            this.onSubmit();
          }
        }
      }
    }else{
      this.AreaCode=null;
      if(this.AreaCode==null){
        this.alertService.warn("Please Select Area ");
        return null;
      }
    }
  },
    err => {
      this._SystemAdminComponent.setLoading(false);;
      console.log(err)
    });
  }
  else if(this.UserType=="Zonal Manager"){

  this._SystemAdminService.GetArea("Zone",this.Area.value).subscribe((data: any) => {

    if(data!=null){
      if(data.length==1){
        this.AreaCode=data[0].ZoneCodevtxt;
        if(notself){
          this.onSubmit();
        }
      }else{
        this.AreaCode=null;
        for(let count:number =0; count<data.length;count++){
          if(data[0].ZoneDescriptionvtxt==this.Area.value){
            this.AreaCode=data[0].ZoneCodevtxt;
            break;
          }
        }
        if(this.AreaCode==null){
          this.alertService.warn("Please Select Area");
          return null;
        }else{
          if(notself){
            this.onSubmit();
          }
        }
      }
    }else{
      this.AreaCode=null;
      if(this.AreaCode==null){
        this.alertService.warn("Please Select Area ");
        return null;
      }
    }
  },
    err => {
      this._SystemAdminComponent.setLoading(false);;
      console.log(err)
    });
  }else{
    if(notself){
      this.onSubmit();
    }
  }
}


ChangeUserType(Type) {
  this.UserType=Type;
  if(Type=="Territory Sales Executive"){
    this.ViewZone = '';
    this.ViewRegion = '';
    this.ViewBranch = '';
    this.ViewTSE = '';
    this.UserTypeEmployee= '';
    this.GetTerritoryDate();
  }
  if(Type=="Branch Manager"){
    this.ViewZone = '';
    this.ViewRegion = '';
    this.ViewBranch = '';
    this.UserTypeEmployee= '';
    this.GetBranchData();
  }
  if(Type=="Regional Manager"){
    this.ViewZone = '';
    this.ViewRegion = '';
    this.UserTypeEmployee= '';
    this.GetRegionData();
  }
  if(Type=="Zonal Manager"){
    this.ViewZone = '';
    this.UserTypeEmployee= '';
    this.GetZoneData();
  }
  this.Area=new FormControl('');
}

onGetAreaList(data) {
  this.changeDetection.detectChanges();
  this.Areaoptions = data;
  this.AreaList = this.Area.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterAreaList(value))
    );
}

private _filterAreaList(value: string) {
  const filterValue = value.toLowerCase();

  if(this.UserType=="Territory Sales Executive"){
    return this.Areaoptions.filter(Areaoptions => Areaoptions.SalesOfficeNamevtxt.toLowerCase().includes(filterValue));
  }
  if(this.UserType=="Branch Manager"){
    return this.Areaoptions.filter(Areaoptions => Areaoptions.BranchNamevtxt.toLowerCase().includes(filterValue));
  }
  if(this.UserType=="Regional Manager"){
    return this.Areaoptions.filter(Areaoptions => Areaoptions.RegionDescriptionvtxt.toLowerCase().includes(filterValue));
  }
  if(this.UserType=="Zonal Manager"){
    return this.Areaoptions.filter(Areaoptions => Areaoptions.ZoneDescriptionvtxt.toLowerCase().includes(filterValue));
  }
}


GetZoneData() {
  this._SystemAdminComponent.setLoading(true);
  this._SystemAdminService.GetArea("Zone", null).subscribe((data: any) => {
    this.onGetAreaList(data);
    this._SystemAdminComponent.setLoading(false);
  },
    err => {
      this._SystemAdminComponent.setLoading(false);;
      console.log(err)
    });
}
GetRegionData() {
  this._SystemAdminComponent.setLoading(true);
  this._SystemAdminService.GetArea("Region", 'NoSearch').subscribe((data: any) => {
    this.onGetAreaList(data);
    this._SystemAdminComponent.setLoading(false);
  },
    err => {
      this._SystemAdminComponent.setLoading(false);;
      console.log(err)
    });
}
GetBranchData() {
  this._SystemAdminComponent.setLoading(true);
  this._SystemAdminService.GetArea("Branch", 'NoSearch').subscribe((data: any) => {
    this.onGetAreaList(data);
    this._SystemAdminComponent.setLoading(false);
  },
    err => {
      this._SystemAdminComponent.setLoading(false);
      console.log(err)
    });
}
GetTerritoryDate() {
  this._SystemAdminComponent.setLoading(true);
  this._SystemAdminService.GetArea("SalesOffice", 'NoSearch').subscribe((data: any) => {
    this._SystemAdminComponent.setLoading(false);
    this.onGetAreaList(data);
  },
    err => {
      this._SystemAdminComponent.setLoading(false);
      console.log(err)
    });

}
onStatusChange( event) {
  const checked = event.target.checked;
  if (checked) {
   this.Status = true;
  } else {

    this.Status  = false;
  }
}



changeSelectRole(value)
{
  if(value==0)
  {
    this.SetRoles=0;
  }
  else
  {
    this.SetRoles=1;
  }
}
GetRoles() {
  this._RoleManagementService.GetRoleForCheckBoxlist("").subscribe(
    data => {
      this.Roles = data;
      this.GetUserData();
    }
  );
}


AddRoles() {

  let CustCode = localStorage.getItem(constStorage.UserCode);
  for (let i = 0; i < this.Roles.length; i++) {
    if (this.Roles[i].Checked == true) {
      let Data = {
        RoleIDbint: this.Roles[i].IDbint,
        UserCodevtxt: this.userAdd.controls['UserCodetxt'].value,
        CreatedByvtxt: CustCode,
      }
      this._RoleManagementService.InsertRoleDetailsforUser(Data).subscribe(
        data => {

        this._SystemAdminComponent.setLoading(false);
        },
        err => {
          this._SystemAdminComponent.setLoading(false);
          if (err.status == 400)
            this.alertService.error('Error user not added.');
          else
            console.log(err);
        }
      );
    }
  }
}

DeleteRoleByUserCode(UserCode){
  this._RoleManagementService.DeleteRoleByUserCode(UserCode).subscribe(
    data => {

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



GetUserRoles() {
  this.service.GetUserRolesHeaderDataByUserCode(this.UserCode).subscribe(
    data => {
      this.UserRolesHeader = data;
      if(this.UserRolesHeader.length>0)
      {
        for(let i=0;i< this.UserRolesHeader.length;i++){
          for(let j=0;j<this.Roles.length;j++){
              if(this.UserRolesHeader[i].RoleIDbint==this.Roles[j].IDbint){
                this.Roles[j].Checked=true;
              }
          }
        }
        this.SetRoles=1;
      }
      else
      {
        this.SetRoles=0;
      }
    }
  );
}

onSubmit() {

  this._SystemAdminComponent.setLoading(true);


  const passwordControl = this.userAdd.controls['Passwordvtxt'].value;
  const confirmPasswordControl = this.userAdd.controls['CPasswordvtxt'].value;
  if (!passwordControl || !confirmPasswordControl) {
    return null;
  }
  if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
    return null;
  }
  if(this.Password!='' &&this.Password!=null){
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

if(this.UserType=="Territory Sales Executive" ||this.UserType=="Branch Manager"||  this.UserType=="Regional Manager"||this.UserType=="Zonal Manager"){


    let userAddData = {
      Idbint : this.userAdd.controls['Idbint'].value,
      UserCodetxt :  this.userAdd.controls['UserCodetxt'].value,
      UserNametxt :this.userAdd.controls['UserNametxt'].value,
      UserTypetxt : this.UserType,
      Divisionvtxt : this.userAdd.controls['Divisionvtxt'].value,
      Mobilevtxt :this.userAdd.controls['Mobilevtxt'].value,
      Emailvtxt :this.userAdd.controls['Emailvtxt'].value,
      ParentCodevtxt : this.AreaCode,
      Passwordvtxt : this.userAdd.controls['Passwordvtxt'].value,
      CPasswordvtxt :this.userAdd.controls['CPasswordvtxt'].value,
      IsActivebit: this.Status,
    };

    this.service.EmployeeUpdate(userAddData).subscribe(
      (res: any) => {
        this.DeleteRoleByUserCode( this.userAdd.controls['UserCodetxt'].value)
        if( this.SetRoles==1){
          this.AddRoles();
        }
        this._SystemAdminComponent.setLoading(false);
          this.router.navigateByUrl('/SystemAdmin/EmployeeDetails');
          this.alertService.success('User Updated Succesfully.');

      },
      err => {
        this._SystemAdminComponent.setLoading(false);
         if (err.status == 400)
           this.alertService.error('Error user not updated.');
         else
          console.log(err);
      }
    );

}else{

    let userAddData = {
      Idbint : this.userAdd.controls['Idbint'].value,
      UserCodetxt :  this.userAdd.controls['UserCodetxt'].value,
      UserNametxt :this.userAdd.controls['UserNametxt'].value,
      UserTypetxt : this.userAdd.controls['UserTypetxt'].value,
      Divisionvtxt : this.userAdd.controls['Divisionvtxt'].value,
      Mobilevtxt :this.userAdd.controls['Mobilevtxt'].value,
      Emailvtxt :this.userAdd.controls['Emailvtxt'].value,
      Passwordvtxt : this.userAdd.controls['Passwordvtxt'].value,
      CPasswordvtxt :this.userAdd.controls['CPasswordvtxt'].value,
      IsActivebit: this.Status,
    };

    this.service.updateUser(userAddData).subscribe(
      (res: any) => {
        this.DeleteRoleByUserCode( this.userAdd.controls['UserCodetxt'].value)
        if( this.SetRoles==1){
          this.AddRoles();
        }
        this._SystemAdminComponent.setLoading(false);
          this.router.navigateByUrl('/SystemAdmin/EmployeeDetails');
          this.alertService.success('User Updated Succesfully.');

      },
      err => {
        this._SystemAdminComponent.setLoading(false);
         if (err.status == 400)
           this.alertService.error('Error user not updated.');
         else
          console.log(err);
      }
    );
  }
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
