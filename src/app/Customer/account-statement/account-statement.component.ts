import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/CustomerService';
import { Router } from '@angular/router';
import { UserConstant } from 'src/app/models/Userconstant';
import { CustomerComponent } from '../Customer.component';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})
export class CustomerAccountStatementComponent implements OnInit {

  constructor(private router: Router, private _CustomerService: CustomerService,
    private _CustomerComponent:CustomerComponent) { }
  OutStanding=0;
  CreditLimit=0;
  CustSecurityAmount=0;
  AvailableCreditLimit=0;
  ngOnInit() {
    this.getAllOutStanding();
  }

  getAllOutStanding() {
    this._CustomerComponent.setLoading(true);
     let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt==UserConstant.Customer){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }

    this._CustomerService.getAllOutStandingforDashboard(UserCode).subscribe((res: any) => {
      if(res.length!=0){
      this.OutStanding = res[0].OutStandingdcl;
      this.CreditLimit = res[0].CreditLimitdcl;
      this.AvailableCreditLimit = res[0].AvailableCreditLimitdcl;
      this.CustSecurityAmount=res[0].CustSecurityAmount;
      }
      this._CustomerComponent.setLoading(false);
      // this.OutStanding = this.OutStanding *-1;
    },
    err => {
      this._CustomerComponent.setLoading(false);
        console.log(err);
    })
  }

  getAllCreditLimit() {
    this._CustomerComponent.setLoading(true);
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this._CustomerService.getAllCreditLimitforDashboard(UserCode).subscribe((res: any) => {

      this._CustomerComponent.setLoading(false);
    },
    err => {
      this._CustomerComponent.setLoading(false);
        console.log(err);
    })
     this._CustomerService.getAllAvailableCreditLimitforDashboard(UserCode).subscribe((res: any) => {

      this._CustomerComponent.setLoading(false);
    },
    err => {
      this._CustomerComponent.setLoading(false);
        console.log(err);
    })
  }
}
