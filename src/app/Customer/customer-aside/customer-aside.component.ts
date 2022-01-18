import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { UserConstant } from 'src/app/models/Userconstant';
import { RoleManagementService } from 'src/app/shared/RoleManagementService';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-customer-aside',
  templateUrl: './customer-aside.component.html',
  styleUrls: ['./customer-aside.component.css']
})

export class CustomerAsideComponent implements OnInit {


  constructor(private _RoleManagementService: RoleManagementService, private service: UserService,
    private alertService: AlertService, public datepipe: DatePipe,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  Data;
  UserType
  CustomerType='none';
  UserCode
  ParentData;

  GroupA = 'none';
  UserList = 'none';
  UserCreate = 'none';

  GroupB = 'none';
  PlaceOrderRequest = 'none';
  OrdersPlaced = 'none';
  MyOrderList = 'none';
  MyRetailList = 'none';
  Dispatches = 'none';

  Invoices = 'none';
  GroupC = 'none';
  AccountStatement = 'none';
  Outstanding = 'none';
  CurrentLedger = 'none';
  BalanceConfirmation = 'none';
  GroupD = 'none';
  CreateTicket = 'none';
  TicketStatus = 'none';

  Retailer = 'none';
  ngOnInit() {
    this.UserCode = localStorage.getItem('UserCode');
    this.UserType = localStorage.getItem('UserType');

      if (this.UserType == 'Customer') {
        this.MenuForCustomer();
      } else {
        this.MenuForOtherUsers();
      }

  }

  MenuForCustomer() {
    // this.GroupA = 'block';
    // this.UserList = 'block';
    // this.UserCreate = 'block';
    this.GroupB = 'block';
    this.PlaceOrderRequest = 'block';
    this.OrdersPlaced = 'block';
    this.MyOrderList = 'block';
    this.MyRetailList = 'block';
    this.Retailer = 'block';
    this.Dispatches = 'block';

    this.Invoices = 'block';

    this.GroupC = 'block';
    this.AccountStatement = 'block';
    this.Outstanding = 'block';
    this.CurrentLedger = 'block';
    this.BalanceConfirmation = 'block';

    this.GroupD = 'none';
    this.CreateTicket = 'block';
    this.TicketStatus = 'block';
    this.getCustomerType();
  }

  getCustomerType() {
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this._RoleManagementService.GetUserRolesDetailsByCustomercode(UserCode).subscribe(
      (res: any) => {
        if (res.Typevtxt == "NT") {
          this.CustomerType='block';
          this.GroupB = 'none';
          this.PlaceOrderRequest = 'none';
          this.OrdersPlaced = 'none';
          this.MyOrderList = 'none';
          this.MyRetailList = 'none';
          this.Retailer = 'none';
          this.GroupD='none';
          this.BalanceConfirmation='none';
        }
        else{

          this.GroupD='block';
          this.BalanceConfirmation='block';
        }
      },
      err => {
        console.log(err);
      }
    );

  }


  MenuForOtherUsers() {
    this._RoleManagementService.GetUserRolesDetailsByUsercode(this.UserCode).subscribe(
      (res: any) => {
        if (res['0'] != null && res['0'] != '') {
          this.Data = res;
          if (this.UserType == 'Sales Promoter User' || this.UserType == 'CF Agent User') {
            this.MenuForOtherEmpUsers();
          } else {
            this.SetMenuForOtherUser();
          }
        } else {
          this.MenuForCustomer();
        }

      },
      err => {
        if (err.status == 400)
          this.alertService.error('Some Error Occored :( .');
        else
          console.log(err);
      }
    );
  }

  SetMenuForOtherUser() {

    for (let i = 0; i < this.Data.length; i++) {
      // if (this.Data[i].RoleDetails == 'User List') {
      //   this.UserList = 'block';

      // }
      // if (this.Data[i].RoleDetails == 'User Create') {
      //   this.UserCreate = 'block';

      // }
      if (this.Data[i].RoleDetails == 'Retailer List') {
        this.Retailer = 'block';

      }
      if (this.Data[i].RoleDetails == 'Place Order') {
        this.PlaceOrderRequest = 'block';

      }
      if (this.Data[i].RoleDetails == 'Placed Order List') {
        this.OrdersPlaced = 'block';

      }
      if (this.Data[i].RoleDetails == 'My Order List') {
        this.MyOrderList = 'block';

      }

      if (this.Data[i].RoleDetails == 'My Retail List') {
        this.MyRetailList = 'block';
      }

      if (this.Data[i].RoleDetails == 'Dispatch Orders List') {
        this.Dispatches = 'block';

      }
      if (this.Data[i].RoleDetails == 'My Invoices') {
        this.Invoices = 'block';

      }
      if (this.Data[i].RoleDetails == 'Account Statement') {
        this.AccountStatement = 'block';

      }
      if (this.Data[i].RoleDetails == 'OutStanding') {
        this.Outstanding = 'block';

      }
      if (this.Data[i].RoleDetails == 'Current Ledger') {
        this.CurrentLedger = 'block';

      }
      if (this.Data[i].RoleDetails == 'BalanceConfirmation') {
        this.BalanceConfirmation = 'block';
      }
      if (this.Data[i].RoleDetails == 'CreateTicket') {
        this.CreateTicket = 'block';
      }
      if (this.Data[i].RoleDetails == 'TicketStatus') {
        this.TicketStatus = 'block';
      }
    }

    // if (this.UserList == 'block' || this.UserCreate == 'block') {
    //   this.GroupA = 'block';
    // }
    if (this.PlaceOrderRequest == 'block' || this.OrdersPlaced == 'block' || this.MyOrderList == 'block' || this.MyRetailList == 'block') {
      this.GroupB = 'block';
    }
    if (this.AccountStatement == 'block' || this.Outstanding == 'block'
      || this.CurrentLedger == 'block' || this.BalanceConfirmation == 'block') {
      this.GroupC = 'block';
    }
    if (this.CreateTicket == 'block' || this.TicketStatus == 'block') {
      this.GroupD = 'block';
    }
  }
  MenuForOtherEmpUsers() {
    let ParentCode;
    if (this.UserType == 'Sales Promoter User') {
      ParentCode = localStorage.getItem('UserSPCode');
    } else if (this.UserType == 'CF Agent User') {
      ParentCode = localStorage.getItem('UserCFCode');
    }
    this.service.GetUserRolesHeaderDataByUserCode(ParentCode).subscribe(
      (res: any) => {
        if (res['0'] != null && res['0'] != '') {
          this.ParentData = res;
          this.SetMenuParentWise();
        } else {
          this.SetMenuForOtherUser();
        }

      },
      err => {
        if (err.status == 400)
          this.alertService.error('Some Error Occored :( .');
        else
          console.log(err);
      }
    );

  }

  SetMenuParentWise() {

    for (let j = 0; j < this.ParentData.length; j++) {
      for (let i = 0; i < this.Data.length; i++) {

        if (this.Data[i].RoleHedearName == this.ParentData[j].RoleNamevtxt) {

          // if (this.Data[i].RoleDetails == 'User List') {
          //   this.UserList = 'block';

          // }
          // if (this.Data[i].RoleDetails == 'User Create') {
          //   this.UserCreate = 'block';

          // }
          if (this.Data[i].RoleDetails == 'Retailer List') {
            this.Retailer = 'block';

          }
          if (this.Data[i].RoleDetails == 'Place Order') {
            this.PlaceOrderRequest = 'block';

          }
          if (this.Data[i].RoleDetails == 'Placed Order List') {
            this.OrdersPlaced = 'block';

          }
          if (this.Data[i].RoleDetails == 'My Order List') {
            this.MyOrderList = 'block';

          }
          if (this.Data[i].RoleDetails == 'My Retail List') {
            this.MyRetailList = 'block';
          }
          if (this.Data[i].RoleDetails == 'Dispatch Orders List') {
            this.Dispatches = 'block';

          }
          if (this.Data[i].RoleDetails == 'My Invoices') {
            this.Invoices = 'block';

          }
          if (this.Data[i].RoleDetails == 'Account Statement') {
            this.AccountStatement = 'block';

          }
          if (this.Data[i].RoleDetails == 'OutStanding') {
            this.Outstanding = 'block';

          }
          if (this.Data[i].RoleDetails == 'Current Ledger') {
            this.CurrentLedger = 'block';

          }
          if (this.Data[i].RoleDetails == 'BalanceConfirmation') {
            this.BalanceConfirmation = 'block';

          }
          if (this.Data[i].RoleDetails == 'CreateTicket') {
            this.CreateTicket = 'block';

          }
          if (this.Data[i].RoleDetails == 'TicketStatus') {
            this.TicketStatus = 'block';

          }
        }
      }
    }

    // if (this.UserList == 'block' || this.UserCreate == 'block') {
    //   this.GroupA = 'block';
    // }
    if (this.PlaceOrderRequest == 'block' || this.OrdersPlaced == 'block' || this.MyOrderList == 'block' || this.MyRetailList == 'block') {
      this.GroupB = 'block';
    }
    if (this.AccountStatement == 'block' || this.Outstanding == 'block'
      || this.CurrentLedger == 'block' || this.BalanceConfirmation == 'block') {
      this.GroupC = 'block';
    }

    if (this.CreateTicket == 'block' || this.TicketStatus == 'block') {
      this.GroupD = 'block';
    }

  }
}
