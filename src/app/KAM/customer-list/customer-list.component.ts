import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { CustomerService } from 'src/app/shared/CustomerService';
import * as fileSaver from 'file-saver';
import { constStorage } from 'src/app/models/Storege';
import { UserConstant } from 'src/app/models/Userconstant';
import { KAMComponent } from '../KAM.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class KAMCustomerListComponent implements OnInit {
  Customers: any=[];
  constructor(private router: Router, private _CustomerService: CustomerService
    , private _KAMComponent:KAMComponent  ,public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
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
    CustomerKAMerPage: any = 10;
    orderBy: string = 'Asc';
    UserTypetxt:string;
    totalCustomers: any;
    totalCustomersCount: any;
    currentPage = 1;
    UserCode;
  ngOnInit() {
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.UserTypetxt=  localStorage.getItem(constStorage.UserType);
      this.UserCode= localStorage.getItem(constStorage.UserCode);
    this.getAllCustomers(1);
  }

  getAllCustomers(pageNo) {
    this._KAMComponent.setLoading(true);
    this.pageNo=pageNo;
    this._CustomerService.getAllCustomerDataByUserTypeWiseSearch(this.UserCode,this.UserTypetxt, this.pageNo, this.CustomerKAMerPage, this.search,true,true).subscribe((data: any) => {
      this.Customers = data ;
      this._KAMComponent.setLoading(false);
      this.getAllCustomersCount();
    },
    err => {
      this._KAMComponent.setLoading(false);
        console.log(err);
    })
  }

  getAllCustomersCount() {
    this._KAMComponent.setLoading(true);
    this._CustomerService.getAllCustomerDataByUserTypeWiseSearchCount(this.UserCode,this.UserTypetxt, this.search,true,true).subscribe((res: any) => {
      this.totalCustomersCount = res;
      this._KAMComponent.setLoading(false);
      this.totalNoOfPages();
    },
    err => {
      this._KAMComponent.setLoading(false);
        console.log(err);
    })
  }

  //Method For Pagination
  totalNoOfPages() {

    this.paginationData = Number(this.totalCustomersCount / this.CustomerKAMerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if(this.totalCustomersCount > this.CustomerKAMerPage){
      this.pageField = this.paginationService.pageField;
    }
    else{
      this.pageField = [1];
    }


  }
  showCustomersByPageNumber(page, i) {
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllCustomers(this.currentPage);
  }

  //Pagination Start

  showPrevCustomers() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllCustomers(this.currentPage);
    }

  }

  showNextCustomers() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllCustomers(this.currentPage);
    }
  }

  download() {
    this._KAMComponent.setLoading(true);
    this._CustomerService.downloadFileCustomerDataByUserTypeWise(this.UserCode,this.UserTypetxt, this.search,true,true).subscribe(reKAMonse => {
			let blob:any = new Blob([reKAMonse], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
      this._KAMComponent.setLoading(false);
			fileSaver.saveAs(blob, 'CustomerList.xlsx');
		},
    err => {
      this._KAMComponent.setLoading(false);
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
