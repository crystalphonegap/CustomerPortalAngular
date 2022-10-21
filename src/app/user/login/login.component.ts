import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../component/alert.service';
import { AuthService } from 'src/app/auth/auth.service';
import { CustomerService } from 'src/app/shared/CustomerService';
import { UserService } from 'src/app/shared/user.service';
import { UserConstant } from 'src/app/models/Userconstant';
import { constStorage } from 'src/app/models/Storege';
import { UserComponent } from '../user.component';
import * as Bowser from "bowser";
import { HttpClient } from '@angular/common/http';
import { Encrypt } from 'src/app/component/Encrypt';
import { UserServiceWithoutToken } from 'src/app/shared/UserServiceWithoutToken';
import { BalanceConfirmation } from 'src/app/shared/BalanceConfirmation';
//import { BalanceConfirmation } from 'src/app/shared/BalanceConfirmation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    UserCodetxt: new FormControl(''),
    Passwordvtxt: new FormControl(''),
    Otptxt: new FormControl(''),
  })
OTP: boolean=false;
Mobile: boolean=true;
  IPError = null;
  resmobile="";
  constructor(private _Encrypt :Encrypt,private router: Router, private _UserService: UserService, private http: HttpClient,
    private authService: AuthService, private _CustomerService: CustomerService,private _balanceconfService:BalanceConfirmation,
    private alertService: AlertService, private _UserComponent: UserComponent,private _UserServiceWithoutToken:UserServiceWithoutToken) { }
  ngOnInit() {
    debugger
    
    $('body, #kt_header_menu_wrapper').removeClass('kt-header-menu-wrapper--on');
    //this.onloadCallAPi();
    // this._UserComponent.setLoading(true);
    // this.authService.IpAdress().subscribe(() => {
    //   this._UserComponent.setLoading(false);
    // }, err => {
    //   this._UserComponent.setLoading(false);
    //   // this.IPError = err.error;
    //   // let errorMessage = err && err.error;
    //   // console.log(errorMessage);

    // });


  }

  onloadCallAPi(){
    debugger;
    this._CustomerService.CallApI().subscribe((res: any)=>{
console.log(res);
    }), err => {

      let errorMessage = err && err.error;
      console.log(errorMessage);
      this.alertService.error(errorMessage);
    }
  }


  onSubmit(): void {
    debugger;
    this._UserComponent.setLoading(true);

    let loginForm ={
      UserCodetxt:this.loginForm.controls['UserCodetxt'].value,
      Passwordvtxt:this._Encrypt.set(this.loginForm.controls['Passwordvtxt'].value)
    }
    this.authService.login(loginForm).subscribe(() => {

      // if (this.IPError != null && this.IPError != '') {
      //   let data = {
      //     ExceptionMessage: this.IPError
      //   }
      //   this._UserService.EnterLog(data).subscribe(() => {


      //   });
      // }

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
      debugger
      let UserTypetxt = localStorage.getItem(constStorage.UserType);
      this._UserComponent.setLoading(false);
      if (UserTypetxt == UserConstant.SuperAdmin) {
        this.router.navigateByUrl('/SuperAdmin/dashboard');
      } else if (UserTypetxt == UserConstant.SystemAdmin) {
        this.router.navigateByUrl('/SystemAdmin/dashboard');
      } else if (UserTypetxt == UserConstant.Retailer) {
        this.router.navigateByUrl('/Retailer/dashboard');
      } else if (UserTypetxt == UserConstant.Technician) {
        this.router.navigateByUrl('/Technician/dashboard');
      } else if (UserTypetxt == UserConstant.ErrorHandler) {
        this.router.navigateByUrl('/user/ErrorPage');
      } else if (UserTypetxt == UserConstant.Supervisor) {
        this.router.navigateByUrl('/Supervisor/dashboard');
      } else if (UserTypetxt == UserConstant.Customer) {
        this.router.navigateByUrl('/Customer/dashboard');
      } else if (UserTypetxt == UserConstant.CFAgent) {
        this.router.navigateByUrl('/CfAgent/dashboard');
      } else if (UserTypetxt == UserConstant.KAM) {
        this.router.navigateByUrl('/KAM/dashboard');
      } else if (UserTypetxt == UserConstant.CFAgentUser) {
        this._UserService.getUserData(localStorage.getItem(constStorage.IDbint)).subscribe(
          (res: any) => {
            localStorage.setItem(constStorage.UserCFCode, res.ParentCodevtxt);
            this.router.navigateByUrl('/CfAgent/dashboard');
          },
          err => {
            if (err.status == 400)
              this.alertService.error('Error Occored.');
            else
              console.log(err);
          }
        );

      } else if (UserTypetxt == UserConstant.SalesPromoter) {
        this.router.navigateByUrl('/SP/dashboard');
      } else if (UserTypetxt == UserConstant.OrderAnalyst) {
        this.router.navigateByUrl('/SP/dashboard');
      } else if (UserTypetxt == UserConstant.SalesPromoterUser) {
        this._UserService.getUserData(localStorage.getItem(constStorage.IDbint)).subscribe(
          (res: any) => {
            localStorage.setItem(constStorage.UserSPCode, res.ParentCodevtxt);
            this.router.navigateByUrl('/SP/dashboard');
          },
          err => {
            if (err.status == 400)
              this.alertService.error('Error Occored.');
            else
              console.log(err);
          }
        );

      } else if (
        UserTypetxt == UserConstant.BranchManager || UserTypetxt == UserConstant.AccountingHead || UserTypetxt == UserConstant.RegionalAccountingHead ||
        UserTypetxt == UserConstant.RegionalManager || UserTypetxt == UserConstant.TerritorySalesExecutive
        || UserTypetxt == UserConstant.MarketingHead || UserTypetxt == UserConstant.ZonalManager
      ) {
        debugger
        this.router.navigateByUrl('/Emp/dashboard');
      } else if (UserTypetxt == UserConstant.CustomerUser) {
        this._CustomerService.getCustomerDataByhisUserCode(localStorage.getItem(constStorage.UserCode)).subscribe(
          (res: any) => {
            localStorage.setItem(constStorage.CustCode, res['0'].CustCodevtxt);
            this.router.navigateByUrl('/Customer/dashboard');
          },
          err => {
            if (err.status == 400)
              this.alertService.error('Error Occored.');
            else
              console.log(err);
          }
        );

      }
    }, err => {
      this._UserComponent.setLoading(false);
      let errorMessage = err && err.error;
      console.log(errorMessage);
      this.alertService.error('Server not Responding , Please try again later');
    });

  }
  LoginWithOtp()
  {
     this._UserComponent.setLoading(true);
  this._UserServiceWithoutToken.GetOTPFORLOGIN(this.loginForm.controls['UserCodetxt'].value).subscribe(
    (res: any) => {
if(res.MOBILE!=''){
  this.OTP=true;
  this.Mobile=false;
  console.log(res);
  console.log(res.MOBILE);
  this.resmobile=res.MOBILE
}else
{
  this.alertService.error(res.MESSAGE);
}

      this._UserComponent.setLoading(false);

    },
    err => {
      this._UserComponent.setLoading(false);

    }
  );

  }
  Cancel(){
    this.router.navigateByUrl('/user/homepage');
  }
  SubmitOTP(){

    this._UserComponent.setLoading(true);
    this._UserServiceWithoutToken.SubmitOTP(this.resmobile, this.loginForm.controls['Otptxt'].value,this.loginForm.controls['UserCodetxt'].value).subscribe(
      (res: any) => {
        this._UserComponent.setLoading(false);
        if(res.MOBILE!=''){
          this.NewonSubmit(res.UserCodetxt,res.Passwordvtxt)
        }else{
          this.alertService.error(res.MESSAGE);
        }

    }, err => {
      this._UserComponent.setLoading(false);
      let errorMessage = err && err.error;
      console.log(errorMessage);
      this.alertService.error('Server not Responding , Please try again later');
    });
  }

  NewonSubmit(UserCode,UserPassword) {
    this._UserComponent.setLoading(true);
    let loginForm ={
      UserCodetxt:UserCode,
      Passwordvtxt:this._Encrypt.set(UserPassword)
    }
    this.authService.login(loginForm).subscribe(() => {
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
      let UserTypetxt = localStorage.getItem(constStorage.UserType);
      this._UserComponent.setLoading(false);
      if (UserTypetxt == UserConstant.SuperAdmin) {
        this.router.navigateByUrl('/SuperAdmin/dashboard');
      } else if (UserTypetxt == UserConstant.SystemAdmin) {
        this.router.navigateByUrl('/SystemAdmin/dashboard');
      } else if (UserTypetxt == UserConstant.Retailer) {
        this.router.navigateByUrl('/Retailer/dashboard');
      } else if (UserTypetxt == UserConstant.Technician) {
        this.router.navigateByUrl('/Technician/dashboard');
      } else if (UserTypetxt == UserConstant.ErrorHandler) {
        this.router.navigateByUrl('/user/ErrorPage');
      } else if (UserTypetxt == UserConstant.Supervisor) {
        this.router.navigateByUrl('/Supervisor/dashboard');
      } else if (UserTypetxt == UserConstant.Customer) {
        this.router.navigateByUrl('/Customer/dashboard');
      } else if (UserTypetxt == UserConstant.CFAgent) {
        this.router.navigateByUrl('/CfAgent/dashboard');
      } else if (UserTypetxt == UserConstant.KAM) {
        this.router.navigateByUrl('/KAM/dashboard');
      } else if (UserTypetxt == UserConstant.CFAgentUser) {
        this._UserService.getUserData(localStorage.getItem(constStorage.IDbint)).subscribe(
          (res: any) => {
            localStorage.setItem(constStorage.UserCFCode, res.ParentCodevtxt);
            this.router.navigateByUrl('/CfAgent/dashboard');
          },
          err => {
            if (err.status == 400)
              this.alertService.error('Error Occored.');
            else
              console.log(err);
          }
        );

      } else if (UserTypetxt == UserConstant.SalesPromoter) {
        this.router.navigateByUrl('/SP/dashboard');
      } else if (UserTypetxt == UserConstant.OrderAnalyst) {
        this.router.navigateByUrl('/SP/dashboard');
      } else if (UserTypetxt == UserConstant.SalesPromoterUser) {
        this._UserService.getUserData(localStorage.getItem(constStorage.IDbint)).subscribe(
          (res: any) => {
            localStorage.setItem(constStorage.UserSPCode, res.ParentCodevtxt);
            this.router.navigateByUrl('/SP/dashboard');
          },
          err => {
            if (err.status == 400)
              this.alertService.error('Error Occored.');
            else
              console.log(err);
          }
        );

      } else if (
        UserTypetxt == UserConstant.BranchManager || UserTypetxt == UserConstant.AccountingHead || 
        UserTypetxt == UserConstant.RegionalAccountingHead ||
        UserTypetxt == UserConstant.RegionalManager || UserTypetxt == UserConstant.TerritorySalesExecutive
        || UserTypetxt == UserConstant.MarketingHead || UserTypetxt == UserConstant.ZonalManager
      ) {
        this.router.navigateByUrl('/Emp/dashboard');
      } else if (UserTypetxt == UserConstant.CustomerUser) {
        this._CustomerService.getCustomerDataByhisUserCode(localStorage.getItem(constStorage.UserCode)).subscribe(
          (res: any) => {
            localStorage.setItem(constStorage.CustCode, res['0'].CustCodevtxt);
            this.router.navigateByUrl('/Customer/dashboard');
          },
          err => {
            if (err.status == 400)
              this.alertService.error('Error Occored.');
            else
              console.log(err);
          }
        );

      }
    }, err => {
      this._UserComponent.setLoading(false);
      let errorMessage = err && err.error;
      console.log(errorMessage);
      this.alertService.error('Server not Responding , Please try again later');
    });

  }
}
