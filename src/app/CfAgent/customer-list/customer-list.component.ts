import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { CustomerService } from 'src/app/shared/CustomerService';
import * as fileSaver from 'file-saver';
import { Agent } from 'http';
import { UserConstant } from 'src/app/models/Userconstant';
import { constStorage } from 'src/app/models/Storege';
import { CfAgentComponent } from '../CfAgent.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CfAgentCustomerListComponent implements OnInit {
  Customers: any=[];
  constructor(private router: Router, private _CustomerService: CustomerService,private _CfAgentComponent:CfAgentComponent
    , public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
    pageNo: any = 1;
    search = null;
    pageNumber: boolean[] = [];
    sortOrder: any = 'CompanyName_ASC';
    order: any = 'CompanyName';
    Userid;
    User;
    pageField = [];
    exactPageList: any;
    paginationData: number;
    CustomersPerPage: any = 10;
    orderBy: string = 'Asc';
  
    totalCustomers: any;
    totalCustomersCount: any;
    currentPage = 1;
    UserCode;
  ngOnInit() {
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    let UserTypetxt=  localStorage.getItem(constStorage.UserType);
    if(UserTypetxt==UserConstant.CFAgent){
      this.UserCode= localStorage.getItem(constStorage.UserCode);
    }else{
      this.UserCode=localStorage.getItem(constStorage.UserCFCode);
    }
    this.getAllCustomers();
  }

  getAllCustomers() {
    this._CfAgentComponent.setLoading(true);
    this._CustomerService.getAllCustomerDataByUserTypeWiseSearch(this.UserCode,UserConstant.CFAgent, this.pageNo, this.CustomersPerPage, this.search,true,true).subscribe((data: any) => {
      this.Customers = data ;
      this._CfAgentComponent.setLoading(false);
      this.getAllCustomersCount();
    },
    err => { 
      this._CfAgentComponent.setLoading(false);
        console.log(err);
    })
  }

  getAllCustomersCount() {
    this._CfAgentComponent.setLoading(true);
    this._CustomerService.getAllCustomerDataByUserTypeWiseSearchCount(this.UserCode,UserConstant.CFAgent, this.search,true,true).subscribe((res: any) => {
      this.totalCustomersCount = res;
      this._CfAgentComponent.setLoading(false);
      this.totalNoOfPages();
    },
    err => { 
      this._CfAgentComponent.setLoading(false);
        console.log(err);
    })
  }

  //Method For Pagination  
  totalNoOfPages() {

    this.paginationData = Number(this.totalCustomersCount / this.CustomersPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if(this.totalCustomersCount > this.CustomersPerPage){
      this.pageField = this.paginationService.pageField;
    }
    else{
      this.pageField = [1];
    }
   

  }
  showOrdersByPageNumber(page, i) {
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllCustomers();
  }

  //Pagination Start  

  showPrevOrders() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllCustomers();
    }

  }

  showNextOrders() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllCustomers();
    }
  }
  sortByHeading(value: string, id) {
    this.Customers = [];
    this.sortOrder = value;
    this.order = value;
    if (this.orderBy == "Desc") {
      this.orderBy = "Asc"
      this.sortOrder = this.sortOrder + '_ASC';
    } else {
      this.orderBy = "Desc";
      this.sortOrder = this.sortOrder + '_DESC'
    }
    this.getAllCustomers();
  }
  download() {
    this._CfAgentComponent.setLoading(true);
    this._CustomerService.downloadFileCustomerDataByUserTypeWise(this.UserCode,UserConstant.CFAgent, this.search,true,true).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
      this._CfAgentComponent.setLoading(false);
	
			fileSaver.saveAs(blob, 'CustomerList.xlsx');
		},
    err => { 
      this._CfAgentComponent.setLoading(false);
        console.log(err);
    })
  }

  
  pass(User){
    localStorage.setItem(constStorage.CustID,User.Idbint);
    localStorage.setItem(constStorage.CustCode,User.CustCodevtxt);
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/Customer/dashboard'])
    );
  
    window.open(url, '_blank');
  }


}
