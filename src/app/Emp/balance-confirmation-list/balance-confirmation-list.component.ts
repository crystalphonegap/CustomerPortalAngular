import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import * as fileSaver from 'file-saver';
import { BalanceConfirmation } from 'src/app/shared/BalanceConfirmation';
import { constStorage } from 'src/app/models/Storege';

@Component({
  selector: 'app-balance-confirmation-list',
  templateUrl: './balance-confirmation-list.component.html',
  styleUrls: ['./balance-confirmation-list.component.css']
})
export class BalanceConfirmationListComponent implements OnInit {
  BalanceConfirmation: any=[];
  constructor(private router: Router, private _BalanceConfirmation: BalanceConfirmation
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
    BalanceConfirmationPerPage: any = 10;
    orderBy: string = 'Asc';
  
    totalBalanceConfirmation: any;
    totalBalanceConfirmationCount: any;
    currentPage = 1;
    UserCode;
  ngOnInit() {
   
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
      this.UserCode= localStorage.getItem(constStorage.UserCode);
    
    this.getAllBalanceConfirmation(1);
  }

  getAllBalanceConfirmation(pageno) {
    this.pageNo=pageno;
    this._BalanceConfirmation.GetBalConfHeaderDataForAH(this.UserCode, this.pageNo, this.BalanceConfirmationPerPage).subscribe((data: any) => {
      this.BalanceConfirmation = data ;
      console.log(data);
      this.getAllBalanceConfirmationCount();
    })
  }

  getAllBalanceConfirmationCount() {
    this._BalanceConfirmation.GetBalConfHeaderDataForAHCount(this.UserCode).subscribe((res: any) => {
      this.totalBalanceConfirmationCount = res;
      this.totalNoOfPages();
    })
  }

  //Method For Pagination  
  totalNoOfPages() {

    this.paginationData = Number(this.totalBalanceConfirmationCount / this.BalanceConfirmationPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if(this.totalBalanceConfirmationCount > this.BalanceConfirmationPerPage){
      this.pageField = this.paginationService.pageField;
    }
    else{
      this.pageField = [1];
    }
   

  }
  showBalanceConfirmationByPageNumber(page, i) {
    this.BalanceConfirmation = [];
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllBalanceConfirmation(this.currentPage);
  }

  //Pagination Start  

  showPrevBalanceConfirmation() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllBalanceConfirmation(this.currentPage);
    }

  }

  showNextBalanceConfirmation() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllBalanceConfirmation(this.currentPage);
    }
  }
  sortByHeading(value: string, id) {
    this.BalanceConfirmation = [];
    this.sortOrder = value;
    this.order = value;
    if (this.orderBy == "Desc") {
      this.orderBy = "Asc"
      this.sortOrder = this.sortOrder + '_ASC';
    } else {
      this.orderBy = "Desc";
      this.sortOrder = this.sortOrder + '_DESC'
    }
    this.getAllBalanceConfirmation(this.currentPage);
  }
 
  pass(value){
    this.storage.set('BCId', value);
    this.router.navigateByUrl('/Emp/BalanceConfirmationView');
  }


}
