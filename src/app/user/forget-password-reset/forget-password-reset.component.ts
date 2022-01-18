import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { Encrypt } from 'src/app/component/Encrypt';
import { CustomerService } from 'src/app/shared/CustomerService';
import { UserServiceWithoutToken } from 'src/app/shared/UserServiceWithoutToken';
import { PasswordStrengthBarComponent } from '../password-strength-bar/password-strength-bar.component';
import { UserComponent } from '../user.component';


@Component({
  selector: 'app-forget-password-reset',
  templateUrl: './forget-password-reset.component.html',
  styleUrls: ['./forget-password-reset.component.css']
})
export class ForgetPasswordResetComponent implements OnInit {
  constructor(private _UserComponent: UserComponent, private _Encrypt: Encrypt, @Inject(SESSION_STORAGE) private storage: WebStorageService, private router: Router,
    private _UserServiceWithoutToken: UserServiceWithoutToken, private _PasswordStrengthBarComponent: PasswordStrengthBarComponent
    , private alertService: AlertService) { }
  Password: string = null;
  ConfirmPassword: string = null;
  Error: string;
  Token;
  UserCode;
  ngOnInit() {
  }

  Submit() {
    if (!this.Password || !this.ConfirmPassword) {
      this.alertService.error('Please Enter Your Password', 'passwordMismatch');
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
    if (this.Password !== this.ConfirmPassword) {
      this.alertService.error('passwordMismatch :(', 'passwordMismatch');
      return null;
    }
    let Customers = {
      UserCodetxt:this.UserCode,
      ResetTokenvtxt: this.Token,
      NewPassword: this._Encrypt.set(this.Password)
    }

    this._UserComponent.setLoading(true);
    this._UserServiceWithoutToken.ResetPassword(Customers).subscribe(
      (res: any) => {
        this._UserComponent.setLoading(false);
        if (res != 0) {
          this.router.navigateByUrl('/user/login');
          this.alertService.error('Password Updated.');
        } else {
          this.alertService.error('OTP expired or provided information is incorrect');
        }

      },
      err => {
        this._UserComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Occured.');
        else
          console.log(err);;
        return
      }
    );
  }

  UpdateTextBox(value, type) {
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
    } else if (type == 'c') {
      this.ConfirmPassword = value;
    } else if (type == 'Token') {
      this.Token = value;
    } else if (type == 'UserCode') {
      this.UserCode = value;
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
