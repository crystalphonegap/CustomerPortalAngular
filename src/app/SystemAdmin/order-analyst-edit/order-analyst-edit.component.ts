import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { FormGroup, FormControl ,Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../component/alert.service';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { EmployeeService } from 'src/app/shared/EmployeeService';
import { constStorage } from 'src/app/models/Storege';
import { SystemAdminComponent } from '../SystemAdmin.component';
import { Encrypt } from 'src/app/component/Encrypt';
import { PasswordStrengthBarComponent } from '../password-strength-bar/password-strength-bar.component';

@Component({
  selector: 'app-order-analyst-edit',
  templateUrl: './order-analyst-edit.component.html',
  styleUrls: ['./order-analyst-edit.component.css']
})
export class SystemAdminOrderAnalystEditComponent implements OnInit {

  SetSalesOffices=false;
  FormGroup ;
  SalesOffices:any=[];
  Userid =null ;
  User: any; 
  CustomerType;
  constructor(private _Encrypt :Encrypt,private _EmployeeService: EmployeeService,private service: UserService,
    private _SystemAdminComponent:SystemAdminComponent, private router: Router
    ,@Inject(SESSION_STORAGE) private storage: WebStorageService, private _PasswordStrengthBarComponent: PasswordStrengthBarComponent
    , private alertService: AlertService) { }
  Password: string = null;
  ConfirmPassword: string = null;
  Error: string;
  ngOnInit() : void {
    this.Userid =null;
    this.Userid= this.storage.get('Userid');
    if(this.Userid!==null && this.Userid!==""){
      this.service.getUserData(this.Userid).subscribe(  
        data => {  
         this.User = data ;  
         this.FormGroup = new FormGroup({
          Idbint : new FormControl(this.Userid),
          UserCodetxt : new FormControl( this.User.UserCodetxt, [Validators.required, Validators.maxLength(256)]),
          UserNametxt : new FormControl(this.User.UserNametxt, [Validators.required, Validators.maxLength(256)]),
          UserTypetxt : new FormControl(this.User.UserTypetxt, [Validators.required, Validators.maxLength(256)]),
          Divisionvtxt : new FormControl(this.User.Divisionvtxt, [Validators.required, Validators.maxLength(256)]),
          Mobilevtxt : new FormControl(this.User.Mobilevtxt, [Validators.required, Validators.maxLength(256)]),
          Emailvtxt : new FormControl(this.User.Emailvtxt, [Validators.required, Validators.maxLength(256)]),
          Passwordvtxt : new FormControl(this._Encrypt.get(this.User.Passwordvtxt), [Validators.required, Validators.maxLength(256)]),
          CPasswordvtxt : new FormControl(this._Encrypt.get(this.User.Passwordvtxt), [Validators.required, Validators.maxLength(256)]),
          
        });
        this.GetSalesOffices();
        }  
      );  
    
    }
  }
  GetSalesOffices() {
    this._EmployeeService.GetSalesOffices().subscribe(
      data => {
        this.SalesOffices = data;
        this.GetUserSalesOffices();
      }
    );
  }

  DeleteSalesOffice(){
    this._EmployeeService.Delete( this.User.UserCodetxt).subscribe(
      data => {
      
      }
    );
  }

  GetUserSalesOffices() {
    this._EmployeeService.GetSalesOfficeByUserCode(this.User.UserCodetxt).subscribe(
      data => {
       let UserSalesHeader = data;
       this.CustomerType=UserSalesHeader['0'].CustomerTypevtxt;
          for(let i=0;i< UserSalesHeader.length;i++){
            for(let j=0;j<this.SalesOffices.length;j++){
                if( UserSalesHeader[i].SalesOfficeCodevtxt==this.SalesOffices[j].SalesOfficeCodevtxt){
                  this.SalesOffices[j].Checked=true;
                }
            }
          }
      }
    );
  }
  

  onSalesChange(salesoffice, event) {

    const checked = event.target.checked;
  
    if (checked) {
      salesoffice.Checked = true;
    } else {
  
      salesoffice.Checked = false;
    }
  }
  
  
onSubmit() {
  this._SystemAdminComponent.setLoading(true);
if(this.CustomerType==0 || this.CustomerType==null ||this.CustomerType=='' ){
  this.alertService.error('Select Usertype First ');
  return;
}
  const passwordControl = this.FormGroup.controls['Passwordvtxt'].value;
  const confirmPasswordControl = this.FormGroup.controls['CPasswordvtxt'].value;
  if (!passwordControl || !confirmPasswordControl) {
    return null;
  }
  if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
    return null;
  }
  if(this.Password!=''&&this.Password!=null){
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

  
  this.FormGroup.get('Passwordvtxt').setValue(this._Encrypt.set(passwordControl) );
  this.FormGroup.get('CPasswordvtxt').setValue(this._Encrypt.set(passwordControl) );
  if(this.Userid!==null && this.Userid!==''){
    this.service.updateUser(this.FormGroup.value).subscribe(
      (res: any) => {
        this.DeleteSalesOffice();
          this.AddSales();
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

changeSelectSale(value)
{
    this.CustomerType=value;
}
AddSales() {
  this._SystemAdminComponent.setLoading(true);

  let CustCode = localStorage.getItem(constStorage.UserCode);
  for (let i = 0; i < this.SalesOffices.length; i++) {
    if (this.SalesOffices[i].Checked == true) {
      let Data = {
        UserCodevtxt :  this.User.UserCodetxt,
        CustomerTypevtxt :this.CustomerType,
        SalesOfficeCodevtxt :  this.SalesOffices[i].SalesOfficeCodevtxt,
        SalesOfficeNamevtxt :  this.SalesOffices[i].SalesOfficeNamevtxt,
        Createdbyvtxt : CustCode,
        CreatedByvtxt: CustCode,
      }
      this._EmployeeService.InsertOrderAnalystData(Data).subscribe(
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
