import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { constStorage } from 'src/app/models/Storege';
import { UserConstant } from 'src/app/models/Userconstant';
import { CustomerService } from 'src/app/shared/CustomerService';
import { PwaService } from 'src/app/shared/pwa.service';
import { UserService } from 'src/app/shared/user.service';
import { UserComponent } from '../user.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public Pwa: PwaService, private router: Router, private _UserService: UserService,
    private _CustomerService: CustomerService,
    private _UserComponent: UserComponent) { }
  ngOnInit() {
    if (localStorage.getItem(constStorage.token) != null && localStorage.getItem(constStorage.refreshToken) != null) {


      let UserTypetxt = localStorage.getItem(constStorage.UserType);
      this._UserComponent.setLoading(true);
      if (UserTypetxt == UserConstant.SuperAdmin) {
        this.router.navigateByUrl('/SuperAdmin/dashboard');
        this._UserComponent.setLoading(false);
      } else if (UserTypetxt == UserConstant.SystemAdmin) {
        this.router.navigateByUrl('/SystemAdmin/dashboard');
        this._UserComponent.setLoading(false);
      } else if (UserTypetxt == UserConstant.Retailer) {
        this.router.navigateByUrl('/Retailer/dashboard');
        this._UserComponent.setLoading(false);
      } else if (UserTypetxt == UserConstant.Technician) {
        this.router.navigateByUrl('/Technician/dashboard');
        this._UserComponent.setLoading(false);
      } else if (UserTypetxt == UserConstant.ErrorHandler) {
        this.router.navigateByUrl('/user/ErrorPage');
        this._UserComponent.setLoading(false);
      } else if (UserTypetxt == UserConstant.Supervisor) {
        this.router.navigateByUrl('/Supervisor/dashboard');
        this._UserComponent.setLoading(false);
      } else if (UserTypetxt == UserConstant.Customer) {
        this.router.navigateByUrl('/Customer/dashboard');
        this._UserComponent.setLoading(false);
      } else if (UserTypetxt == UserConstant.CFAgent) {
        this.router.navigateByUrl('/CfAgent/dashboard');
        this._UserComponent.setLoading(false);
      } else if (UserTypetxt == UserConstant.KAM) {
        this.router.navigateByUrl('/KAM/dashboard');
        this._UserComponent.setLoading(false);
      } else if (UserTypetxt == UserConstant.CFAgentUser) {
        this._UserService.getUserData(localStorage.getItem(constStorage.IDbint)).subscribe(
          (res: any) => {
            localStorage.setItem(constStorage.UserCFCode, res.ParentCodevtxt);
            this.router.navigateByUrl('/CfAgent/dashboard');
            this._UserComponent.setLoading(false);
          }
        );

      } else if (UserTypetxt == UserConstant.SalesPromoter) {
        this.router.navigateByUrl('/SP/dashboard');
        this._UserComponent.setLoading(false);
      } else if (UserTypetxt == UserConstant.OrderAnalyst) {
        this.router.navigateByUrl('/SP/dashboard');
        this._UserComponent.setLoading(false);
      } else if (UserTypetxt == UserConstant.SalesPromoterUser) {
        this._UserService.getUserData(localStorage.getItem(constStorage.IDbint)).subscribe(
          (res: any) => {
            localStorage.setItem(constStorage.UserSPCode, res.ParentCodevtxt);
            this.router.navigateByUrl('/SP/dashboard');
            this._UserComponent.setLoading(false);
          }
        );

      } else if (
        UserTypetxt == UserConstant.BranchManager || UserTypetxt == UserConstant.AccountingHead ||
        UserTypetxt == UserConstant.RegionalManager || UserTypetxt == UserConstant.TerritorySalesExecutive
        || UserTypetxt == UserConstant.MarketingHead || UserTypetxt == UserConstant.ZonalManager
      ) {
        this.router.navigateByUrl('/Emp/dashboard');
        this._UserComponent.setLoading(false);
      } else if (UserTypetxt == UserConstant.CustomerUser) {
        this._CustomerService.getCustomerDataByhisUserCode(localStorage.getItem(constStorage.UserCode)).subscribe(
          (res: any) => {
            localStorage.setItem(constStorage.CustCode, res['0'].CustCodevtxt);
            this.router.navigateByUrl('/Customer/dashboard');
            this._UserComponent.setLoading(false);
          }
        );

      }
    }
  }

  installPwa(): void {
    this.Pwa.promptEvent.prompt();
  }

}
