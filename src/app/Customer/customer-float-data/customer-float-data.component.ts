import { Component, OnInit } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { FormGroup, FormControl ,Validators, AbstractControl } from '@angular/forms';
//import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/shared/CustomerService';
import { DatePipe } from '@angular/common';

import { RoleManagementService } from 'src/app/shared/RoleManagementService';
@Component({
  selector: 'app-customer-float-data',
  templateUrl: './customer-float-data.component.html',
  styleUrls: ['./customer-float-data.component.css'],
  providers: [DatePipe]
})
export class CustomerFloatDataComponent implements OnInit {
  myDate = new Date();
  datestring;
  GroupB: string;
  PlaceOrderRequest: string;
  OrdersPlaced: string;
  MyOrderList: string;
  MyRetailList: string;
  Retailer: string;
  promoter: string;
  constructor(private _RoleManagementService: RoleManagementService,private service: CustomerService, private router: Router,private datePipe: DatePipe,
     @Inject(SESSION_STORAGE) private storage: WebStorageService) {
      this.datestring =this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
      }
  CustomerData: any; 
  ngOnInit(): void {
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this.getUserData(UserCode);
    this._RoleManagementService.GetUserRolesDetailsByCustomercode(UserCode).subscribe(
      (res: any) => {
        if (res.Typevtxt == "NT") {
          this.GroupB = 'none';
          this.PlaceOrderRequest = 'none';
          this.OrdersPlaced = 'none';
          this.MyOrderList = 'none';
          this.MyRetailList = 'none';
          this.Retailer = 'none';
          this.promoter="TPC";
        }
        else
        {
          this.promoter="Sales Promoter";

        }
      },
      err => {
        console.log(err);
      }
    );
    
  }

  getUserData(Userid){
    if(Userid!==null &&Userid!==""){
      this.service.getCustomerData(Userid).subscribe(  
        data => {  
         this.CustomerData = data['0'] ;  
        }  
      );  
    }
    else{
      this.router.navigate(['/user/login']);
    }
  }
}
