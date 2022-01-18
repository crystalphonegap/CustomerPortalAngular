import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { Encrypt } from 'src/app/component/Encrypt';
import { CustomerService } from 'src/app/shared/CustomerService';
import { UserServiceWithoutToken } from 'src/app/shared/UserServiceWithoutToken';
import { PasswordStrengthBarComponent } from '../password-strength-bar/password-strength-bar.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {

  constructor( private _Encrypt :Encrypt,@Inject(SESSION_STORAGE) private storage: WebStorageService, private router: Router,
  private _UserServiceWithoutToken:UserServiceWithoutToken, private _PasswordStrengthBarComponent: PasswordStrengthBarComponent
  , private alertService: AlertService) { }
Password: string = null;
ConfirmPassword: string = null;
Error: string;
  Customer
  Customers
  ngOnInit() {
    this._UserServiceWithoutToken.getCustomerData(this.storage.get('UserId')).subscribe(
      (res: any) => {
        this.Customers=res[0];
        this.Customer = new FormGroup({
          CustCodevtxt : new FormControl(res[0].CustCodevtxt, [Validators.required, Validators.maxLength(256)]),
          Contactpersonvtxt : new FormControl(res[0].Contactpersonvtxt, [Validators.required, Validators.maxLength(256)]),
          Gstnovtxt : new FormControl(res[0].Gstnovtxt, [Validators.required, Validators.maxLength(256)]),
          PanNovtxt : new FormControl(res[0].PanNovtxt, [Validators.required, Validators.maxLength(256)]),
          SalesOfficevtxt : new FormControl(res[0].SalesOfficevtxt, [Validators.required, Validators.maxLength(256)]),
          CustGrp1vtxt : new FormControl(res[0].CustGrp1vtxt, [Validators.required, Validators.maxLength(256)]),
          CustNamevtxt : new FormControl(res[0].CustNamevtxt, [Validators.required, Validators.maxLength(256)]),
          TelNumber1vtxt : new FormControl(res[0].TelNumber1vtxt, [Validators.required, Validators.maxLength(256)]),
          Emailvtxt : new FormControl(res[0].Emailvtxt, [Validators.required, Validators.maxLength(256)]),
          Address1vtxt : new FormControl(res[0].Address1vtxt, [Validators.required, Validators.maxLength(256)]),
          Password : new FormControl('', [Validators.required, Validators.maxLength(256)]),
          ConfirmPassword : new FormControl('', [Validators.required, Validators.maxLength(256)]),
        })
      },
      err => {
        if (err.status == 400)
          this.alertService.error('Error Occured.');
        else
          console.log(err);;
          return
      }
    );
  }
  getControlLabel(type: string){
    return this.Customer.controls[type].value;
   }
  Submit(){

    const passwordControl = this.Customer.controls['Password'].value;
    const confirmPasswordControl = this.Customer.controls['ConfirmPassword'].value;
    if (!passwordControl || !confirmPasswordControl) {
      this.alertService.error('Please Enter Your Password', 'passwordMismatch');
      return null;

    }
    if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
      return null;
    }
    if (this.Password.length < 8) {
      this.alertService.warn("Password must be of 8 digit atleast");
      return;
    }

    if (this._PasswordStrengthBarComponent.getStrength(this.Password) < 40) {
      this.alertService.warn("Please Enter Strong Password");
      this.Error = "Hint : Use number,upper letter ,lower letter and special characters";
      return;
    }
    if (passwordControl !== confirmPasswordControl) {
      this.alertService.error('passwordMismatch :(', 'passwordMismatch');
      return null;
    } 
    this.Customers = {
    CustCodevtxt:this.Customers.CustCodevtxt,
    CustNamevtxt:this.Customers.CustNamevtxt,
    TelNumber1vtxt:this.Customers.TelNumber1vtxt,
    Emailvtxt:this.Customers.Emailvtxt,
    Address1vtxt:this.Customers.Address1vtxt,
    Contactpersonvtxt:this.Customers.Address1vtxt,
    Password:this._Encrypt.set(passwordControl),
    }

    this.Customers.Password=passwordControl;
    this._UserServiceWithoutToken.Update(this.Customers).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/user/login');
        this.storage.remove('UserId')
        this.alertService.error('Customer Registered .');
      },
      err => {
        if (err.status == 400)
          this.alertService.error('Error Occured.');
        else
          console.log(err);;
          return
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
