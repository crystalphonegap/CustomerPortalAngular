import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CustomerService } from 'src/app/shared/CustomerService';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { UserService } from 'src/app/shared/user.service';
import { NgModule } from '@angular/core';
import * as fileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
import { constStorage } from 'src/app/models/Storege';
import { UserConstant } from 'src/app/models/Userconstant';
import { SPComponent } from '../SP.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class SPUserListComponent implements OnInit {
  Users: any=[];
  constructor(  private _SPComponent:SPComponent  ,public datepipe: DatePipe,private _UserService: UserService, private router: Router, private _CustomerService: CustomerService
    , public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService) {
    }
  userData;
  pageNo: any = 1;
  search = null;
  status = 'All';
  FromDate = null;
  Todate = null;
  CompletedCount;
  PendingCount;
  partiallyCompletedCount;
  pageNumber: boolean[] = [];
  sortOrder: any = 'CompanyName_ASC';
  order: any = 'CompanyName';
  Userid;
  User;
  pageField = [];
  exactPageList: any;
  paginationData: number;
  UsersPerPage: any = 10;
  orderBy: string = 'Asc';

  totalUsers: any;
  totalUsersCount: any;
  currentPage = 1;



  ngOnInit() {

    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.getUsersByCustCode(1);
  }

  getUsersByCustCode(pageNo) {
    this._SPComponent.setLoading(true);
    this.pageNo=pageNo;
    this._UserService.getUsersByCustCode(this.status,localStorage.getItem(constStorage.UserCode), this.pageNo, this.UsersPerPage, this.search).subscribe((data: any) => {
      this.Users = data ;
      this._SPComponent.setLoading(false);
      this.getUsersByCustCodeCount();
    },
    err => { 
      this._SPComponent.setLoading(false);
        console.log(err);
    })
  }
  getUsersByCustCodeCount() {
  
    this._SPComponent.setLoading(true);
    this._UserService.getUsersByCustCodeCount(this.status,localStorage.getItem(constStorage.UserCode), this.search).subscribe((res: any) => {
      this.totalUsersCount = res;
      this._SPComponent.setLoading(false);
      this.totalNoOfPages();
    },
    err => { 
      this._SPComponent.setLoading(false);
        console.log(err);
    })
  }
    
  //Method For Pagination  
  totalNoOfPages() {
    this.paginationData = Number(this.totalUsersCount / this.UsersPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if(this.totalUsersCount > this.UsersPerPage){
      this.pageField = this.paginationService.pageField;
    }
    else{
      this.pageField = [1];
    }
   

  }
  showUsersByPageNumber(page, i) {
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getUsersByCustCode( this.currentPage);
  }

  //Pagination Start  

  showPrevUsers() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getUsersByCustCode( this.currentPage);
    }

  }

  showNextUsers() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getUsersByCustCode( this.currentPage);
    }
  }
  pass(Id,Code): void {
    this.storage.set('UserId', Id);
    this.router.navigateByUrl('/SP/UserView');
  }

  
  ChangeStatus(Value) {
    if (Value !== null && Value !== "") {
     this.status=Value;
    }
  }

  download() {
    this._SPComponent.setLoading(true);
    let UserCode;
    let UserTypetxt=  localStorage.getItem(constStorage.UserType);
   
    if(UserTypetxt==UserConstant.SalesPromoter){
      UserCode= localStorage.getItem(constStorage.UserCode);
    }else{
      UserCode=localStorage.getItem(constStorage.UserSPCode);
    }
    this._UserService.ExportToExcelForParent(UserCode,this.status, this.search).subscribe(response => {
      let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      this._SPComponent.setLoading(false);
      fileSaver.saveAs(blob, 'Excel.xlsx');
    },
    err => { 
      this._SPComponent.setLoading(false);
        console.log(err);
    })
  }
 
}   
