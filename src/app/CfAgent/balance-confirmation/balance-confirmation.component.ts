import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { DatePipe } from '@angular/common';
import { RFCCallService } from 'src/app/shared/RFCCallService';
import { BalanceConfirmation } from 'src/app/shared/BalanceConfirmation';
import { AlertService } from 'src/app/component/alert.service';
import { CfAgentComponent } from '../CfAgent.component';

@Component({
  selector: 'app-balance-confirmation',
  templateUrl: './balance-confirmation.component.html',
  styleUrls: ['./balance-confirmation.component.css']
})
export class BalanceConfirmationComponent implements OnInit {
  BalanceConfirmations: any=[];
  constructor( private alertService: AlertService,  public datepipe: DatePipe,private router: Router,
     private _CfAgentComponent:CfAgentComponent,
    private _BalanceConfirmation: BalanceConfirmation
    , public paginationService: PaginationService,
     @Inject(SESSION_STORAGE) private storage: WebStorageService)
     {this.FromDate = new Date();
      this.FromDate.setDate(this.FromDate.getDate() - 10);
      this.FromDate = this.datepipe.transform(this.FromDate, 'dd-MM-yyyy');
      this.Todate = new Date();
      this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');  }
    pageNo: any = 1;
    Indexing: any = 1;
  status = 'All';
  FromDate = null;
  Todate = null;
  pageNumber: boolean[] = [];
  sortOrder: any = 'CompanyName_ASC';
  order: any = 'CompanyName';
  pageField = [];
  exactPageList: any;
  paginationData: number;
  OrdersPerPage: any = 10;
  orderBy: string = 'Asc';

  totalOrders: any;
  totalOrdersCount: any;
  currentPage = 1;

  ngOnInit() {
    this.Refresh();
  }
  
  Refresh(){
    this._CfAgentComponent.setLoading(true);
  this.pageNumber[0] = true;
  this.paginationService.temppage = 0;
   
      this.getBalanceConfirmationData(1);
  }
  getBalanceConfirmationData( pageNo)
  {
    this.pageNo=pageNo;
    this.Indexing=pageNo-1;
    this.Indexing=this.Indexing * 10;
   
    this._BalanceConfirmation.GetBalConfHeaderDataForSPCFA(localStorage.getItem('UserCode'), this.pageNo, this.OrdersPerPage).subscribe((data: any) => {
     
      this.BalanceConfirmations = data ;
      this._CfAgentComponent.setLoading(false);
      this.getBalanceConfirmationDataCount();
      
    },
    err => { 
      this._CfAgentComponent.setLoading(false);
      if (err.status == 400)
        this.alertService.error('Due to some error order not inserted.');
      else
        console.log(err);
    })
  }
  getBalanceConfirmationDataCount() {
    
    this._BalanceConfirmation.GetBalConfHeaderDataForSPCFACount(localStorage.getItem('UserCode')).subscribe((res: any) => {
      this.totalOrdersCount = res;
      this.totalNoOfPages();
    },
    err => { 
      this._CfAgentComponent.setLoading(false);
      if (err.status == 400)
        this.alertService.error('Due to some error order not inserted.');
      else
        console.log(err);
    })
  }
 //Method For Pagination  
 totalNoOfPages() {

  this.paginationData = Number(this.totalOrdersCount / this.OrdersPerPage);
  let tempPageData = this.paginationData.toFixed();
  if (Number(tempPageData) < this.paginationData) {
    this.exactPageList = Number(tempPageData) + 1;
    this.paginationService.exactPageList = this.exactPageList;
  } else {
    this.exactPageList = Number(tempPageData);
    this.paginationService.exactPageList = this.exactPageList
  }
  this.paginationService.pageOnLoad();
  if(this.totalOrdersCount > this.OrdersPerPage){
    this.pageField = this.paginationService.pageField;
  }
  else{
    this.pageField = [1];
  }
 

}
showDataByPageNumber(page, i) {
  this.pageNumber = [];
  this.pageNumber[i] = true;
  this.pageNo = page;
  this.currentPage = page;
  this.getBalanceConfirmationData(this.currentPage);
}

//Pagination Start  

showPrevBalanceConfirmation() {

  if (this.paginationService.showNoOfCurrentPage != 1) {
    this.paginationService.prevPage();
    this.pageNumber = [];
    this.pageNumber[0] = true;
    this.currentPage = this.paginationService.pageField[0];
    this.getBalanceConfirmationData(this.currentPage);
  }

}

showNextBalanceConfirmation() {

  if (this.paginationService.disabledNextBtn == false) {
    this.pageNumber = [];
    this.paginationService.nextPage();
    this.pageNumber[0] = true;
    this.currentPage = this.paginationService.pageField[0];
    this.getBalanceConfirmationData(this.currentPage);
  }
}

pass(value): void {
  this.storage.set('BC', value);
  this.router.navigateByUrl('/CfAgent/BalanceConfirmationView');
}
}
