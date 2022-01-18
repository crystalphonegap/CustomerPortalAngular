import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { constStorage } from 'src/app/models/Storege';
import { UserService } from 'src/app/shared/user.service';
import { UserServiceWithoutToken } from 'src/app/shared/UserServiceWithoutToken';
import { UserComponent } from '../user.component';
import * as Bowser from "bowser";
import { UserConstant } from 'src/app/models/Userconstant';
@Component({
  selector: 'app-login-with-otp',
  templateUrl: './login-with-otp.component.html',
  styleUrls: ['./login-with-otp.component.css']
})
export class LoginWithOTPComponent implements OnInit {
  IPError = null;
  private _CustomerService: any;
  constructor(private _UserComponent: UserComponent, @Inject(SESSION_STORAGE) private storage: WebStorageService,
   private router: Router,private _UserServiceWithoutToken:UserServiceWithoutToken
  , private alertService: AlertService,private _UserService: UserService) { }
  MobileNumber: string = null;
  OTPNUMBER: string = null;
OTP: boolean=false;
Mobile: boolean=true;
  ngOnInit() {
    $('body, #kt_header_menu_wrapper').removeClass('kt-header-menu-wrapper--on');

  }

  GETOTP(){
  this._UserComponent.setLoading(true);
  this._UserServiceWithoutToken.GetOTPFORLOGIN(this.MobileNumber).subscribe(
    (res: any) => {

      this.OTP=true;
      this.Mobile=false;
      this._UserComponent.setLoading(false);

    },
    err => {
      this._UserComponent.setLoading(false);

    }
  );
}
Onsubmit2() {

  this._UserComponent.setLoading(true);
  this._UserServiceWithoutToken.SubmitOTP(this.MobileNumber, this.OTPNUMBER,'').subscribe(
    (res: any) => {
      console.log(res);
      debugger;
      if (constStorage.UserType != UserConstant.ErrorHandler) {


        let userAgent = Bowser.parse(window.navigator.userAgent);
        let Browser = "Browser: [ Name: " + userAgent.browser.name;
        Browser += " , Version: " + userAgent.browser.version + " ] ; ";
        Browser += "Platform:" + userAgent.platform.type + "; ";
        Browser += "OS: [ Name: " + userAgent.os.name;
        Browser += " , Version: " + userAgent.os.version + " ];";

        let UserInfo = {
          UserCodetxt: localStorage.getItem(constStorage.UserCode),
          UserNametxt: localStorage.getItem(constStorage.UserName),
          UserTypetxt: localStorage.getItem(constStorage.UserType),
          BrowserName: Browser,
          IpAddress: localStorage.getItem("IP"),
        }
        this._UserService.LoginLogs(UserInfo).subscribe(() => {

        });
      }
      //localStorage.setItem(constStorage.CustCode, res.UserCodetxt);

      this.router.navigateByUrl('/Customer/dashboard');
      // let UserTypetxt = localStorage.getItem(constStorage.UserType);
      //this.router.navigateByUrl('/user/Verification');
      console.log(res);
      this._UserComponent.setLoading(false);
    },
    err => {

      this._UserComponent.setLoading(false);
      let errorMessage = err && err.error;
      console.log(errorMessage);
      this.alertService.error('Server not Responding , Please try again later');
    }
  );
}
UpdatemobileNumber(value){
  this.MobileNumber=value;
}
ENTEROTPVALUE(value){
  this.OTPNUMBER=value;
}

Onsubmit(): void {
    debugger;
    this._UserComponent.setLoading(true);
    this._UserServiceWithoutToken.SubmitOTP(this.MobileNumber, this.OTPNUMBER,'').subscribe(
      (res: any) => {
      if (constStorage.UserType != UserConstant.ErrorHandler) {


        // let userAgent = Bowser.parse(window.navigator.userAgent);
        // let Browser = "Browser: [ Name: " + userAgent.browser.name;
        // Browser += " , Version: " + userAgent.browser.version + " ] ; ";
        // Browser += "Platform:" + userAgent.platform.type + "; ";
        // Browser += "OS: [ Name: " + userAgent.os.name;
        // Browser += " , Version: " + userAgent.os.version + " ];";

        // let UserInfo = {
        //   UserCodetxt: localStorage.getItem(constStorage.UserCode),
        //   UserNametxt: localStorage.getItem(constStorage.UserName),
        //   UserTypetxt: localStorage.getItem(constStorage.UserType),
        //   BrowserName: Browser,
        //   IpAddress: localStorage.getItem("IP"),
        // }
        // this._UserService.LoginLogs(UserInfo).subscribe(() => {

        // });
      }
      const UserTypetxt = localStorage.getItem(constStorage.UserType);
      this._UserComponent.setLoading(false);
      if (UserTypetxt == UserConstant.SuperAdmin) {
        this.router.navigateByUrl('/SuperAdmin/dashboard');
      } else if (UserTypetxt == UserConstant.Customer) {
        this.router.navigateByUrl('/Customer/dashboard');
      } else
      {
        this.router.navigateByUrl('/Customer/dashboard');
      }
    }, err => {
      this._UserComponent.setLoading(false);
      let errorMessage = err && err.error;
      console.log(errorMessage);
      this.alertService.error('Server not Responding , Please try again later');
    });

  }

}
