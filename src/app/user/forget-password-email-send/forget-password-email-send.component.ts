import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { Encrypt } from 'src/app/component/Encrypt';
import { UserServiceWithoutToken } from 'src/app/shared/UserServiceWithoutToken';
import { PasswordStrengthBarComponent } from '../password-strength-bar/password-strength-bar.component';
import { UserComponent } from '../user.component';


@Component({
  selector: 'app-forget-password-email-send',
  templateUrl: './forget-password-email-send.component.html',
  styleUrls: ['./forget-password-email-send.component.css']
})
export class ForgetPasswordEmailSendComponent implements OnInit {
  constructor(private _UserComponent: UserComponent,  private _Encrypt :Encrypt,@Inject(SESSION_STORAGE) private storage: WebStorageService, private router: Router,
  private _UserServiceWithoutToken:UserServiceWithoutToken, private _PasswordStrengthBarComponent: PasswordStrengthBarComponent
  , private alertService: AlertService) { }
UserCode: string = null;
  ngOnInit() {
    }
   
    UpdateUserCode(value){
      this.UserCode=value;
    }
  Submit(){
    this._UserComponent.setLoading(true);
    this._UserServiceWithoutToken.SendMailForForgetPassword(this.UserCode).subscribe(
      (res: any) => {
        this._UserComponent.setLoading(false);
        if(res=="SMS & Mail Send"){
          this.router.navigateByUrl('/user/PasswordReset');
            this.alertService.error("OTP for paswword reset has been send to your email Id and mobile number, OTP will be valid for 15 min");
          }else if(res=="Mail Send"){
            this.router.navigateByUrl('/user/PasswordReset');
            this.alertService.error("OTP for paswword reset has been send to your email Id, OTP will be valid for 15 min");
          }else if(res=="SMS Send"){
            this.router.navigateByUrl('/user/PasswordReset');
            this.alertService.error("OTP for paswword reset has been send to your mobile number, OTP will be valid for 15 min");
          }else {
            this.alertService.error(res);
          }
      },
      err => {
        this._UserComponent.setLoading(false);
        if(err.error.text=="SMS & Mail Send"){
        this.router.navigateByUrl('/user/PasswordReset');
          this.alertService.error("OTP for paswword reset has been send to your email Id and mobile number, OTP will be valid for 15 min");
        }else if(err.error.text=="Mail Send"){
          this.router.navigateByUrl('/user/PasswordReset');
          this.alertService.error("OTP for paswword reset has been send to your email Id, OTP will be valid for 15 min");
        }else if(err.error.text=="SMS Send"){
          this.router.navigateByUrl('/user/PasswordReset');
          this.alertService.error("OTP for paswword reset has been send to your mobile number, OTP will be valid for 15 min");
        }else {
          this.alertService.error(err.error.text);
        }
        if (err.status == 400)
          this.alertService.error('Error Occured.');
        else
          console.log(err);;
          return
      }
    );
  }

}
