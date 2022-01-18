
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CustomerService } from 'src/app/shared/CustomerService';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { UserService } from 'src/app/shared/user.service';

import * as fileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
import { RoleManagementService } from 'src/app/shared/RoleManagementService';
import { constStorage } from 'src/app/models/Storege';

@Component({
  selector: 'app-role-management-list',
  templateUrl: './role-management-list.component.html',
  styleUrls: ['./role-management-list.component.css']
})
export class SystemAdminRoleManagementListComponent implements OnInit {
  Roles: any=[];
  constructor( public datepipe: DatePipe,private router: Router,private _RoleManagementService: RoleManagementService
    , public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService) {
      this.FromDate = new Date();
      this.FromDate.setDate(this.FromDate.getDate() - 10);
      this.FromDate = this.datepipe.transform(this.FromDate, 'dd-MM-yyyy');
      this.Todate = new Date();
      this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
     }
  pageNo: any = 1;
  Indexing :number=1;
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
  RolesPerPage: any = 10;
  orderBy: string = 'Asc';

  totalRoles: any;
  totalRolesCount: any;
  currentPage = 1;



  ngOnInit() {
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.GetRoleHeaderSearch(1);
    this.currentPage =1;
  }

  GetRoleHeaderSearch(pageNo) {
    this.pageNo=pageNo;
    this.Indexing=pageNo-1;
    this.Indexing=this.Indexing*10;
    this._RoleManagementService.GetRoleHeaderSearch(this.FromDate,this.Todate,this.status,localStorage.getItem(constStorage.UserCode), this.pageNo, this.RolesPerPage, this.search).subscribe((data: any) => {
      this.Roles = data ;
      this.GetRoleHeaderSearchCount();
    })
  }

  GetRoleHeaderSearchCount() {
    this._RoleManagementService.GetRoleHeaderSearchCount(this.FromDate,this.Todate,this.status,localStorage.getItem(constStorage.UserCode), this.search).subscribe((res: any) => {
      this.totalRolesCount = res;
      this.totalNoOfPages();
    })
  }
  
  //Method For Pagination  
  totalNoOfPages() {

    this.paginationData = Number(this.totalRolesCount / this.RolesPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if(this.totalRolesCount > this.RolesPerPage){
      this.pageField = this.paginationService.pageField;
    }
    else{
      this.pageField = [1];
    }
   

  }
  showRolesByPageNumber(page, i) {
    this.Roles = [];
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.GetRoleHeaderSearch(this.currentPage);
  }

  //Pagination Start  

  showPrevRoles() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.GetRoleHeaderSearch(this.currentPage);
    }

  }

  showNextRoles() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.GetRoleHeaderSearch(this.currentPage);
    }
  }
 

  pass(value): void {
    this.storage.set('RoleId', value);
    this.router.navigateByUrl('/SystemAdmin/RoleManagementView');
  }

  
  ChangeStatus(Value) {
    if (Value !== null && Value !== "") {
     this.status=Value;
    }
  }

}   
