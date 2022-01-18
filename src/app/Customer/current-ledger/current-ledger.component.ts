import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import * as fileSaver from 'file-saver';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CustomerService } from 'src/app/shared/CustomerService';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { DatePipe } from '@angular/common';
import { RFCCallService } from 'src/app/shared/RFCCallService';
import { CustomerComponent } from '../Customer.component';
import { AlertService } from 'src/app/component/alert.service';

@Component({
  selector: 'app-current-ledger',
  templateUrl: './current-ledger.component.html',
  styleUrls: ['./current-ledger.component.css']
})
export class CustomerCurrentLedgerComponent implements OnInit {
  Ledgers: any= [];
  constructor(private _AlertService:AlertService ,public datepipe: DatePipe,private router: Router, private _CustomerComponent:CustomerComponent,
    private _CustomerService: CustomerService
    , public paginationService: PaginationService,private _RFCCallService:RFCCallService,
     @Inject(SESSION_STORAGE) private storage: WebStorageService)
     {this.FromDate = new Date();
      this.FromDate.setDate(this.FromDate.getDate() - 30);
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

  SearchFilter;
  loadedFromDate:boolean;
  LoadedToDate:boolean;
  ChangeFilter(){
    this._AlertService.clear();
    if(this.loadedFromDate==false){
      this.FromDate=  this.datepipe.transform(this.SearchFilter.controls['FromDate'].value._d, 'dd-MM-yyyy');
    }
    if(this.LoadedToDate==false){
      this.Todate=  this.datepipe.transform(this.SearchFilter.controls['Todate'].value._d, 'dd-MM-yyyy');
    }
    if(this.SearchFilter.controls['FromDate'].value._d !=''||this.SearchFilter.controls['FromDate'].value._d!=null){
      var today = new Date();
      today.setMonth(today.getMonth() - 3);
      let tempfromdate = this.SearchFilter.controls['FromDate'].value._d;
      if (tempfromdate < today) {
        this._AlertService.error('Only Last three month data can viewed');
        return
      }
    }

    this.status=this.SearchFilter.controls['status'].value;
    this.Search();
  }

  Search(){
    this.Refresh();
  }

  changeDateLoad(value){
    if(value=='From'){
this.loadedFromDate=false
    }
    else  if(value=='To'){
      this.LoadedToDate=false
          }
  }
  ngOnInit() {
    this.loadedFromDate=true;
    this.LoadedToDate=true;
    this.SearchFilter = new FormGroup({
      status: new FormControl('All', [Validators.required, Validators.maxLength(256)]),
      FromDate: new FormControl( this.FromDate, [Validators.required, Validators.maxLength(256)]),
      Todate: new FormControl( this.Todate , [Validators.required, Validators.maxLength(256)]),
      search: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    });
    // this.Search();

  }
  getLedgerData( pageNo)
  {
    this._CustomerComponent.setLoading(true);
    this.pageNo=pageNo;
    this.Indexing=pageNo-1;
    this.Indexing=this.Indexing*10;
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this._CustomerService.getLedgerSearch(UserCode, this.pageNo, this.OrdersPerPage).subscribe((data: any) => {
      this.Ledgers = data ;
      this._CustomerComponent.setLoading(false);
      this.getLedgerDataCount();

    },
    err => {
      this._CustomerComponent.setLoading(false);
      if (err.status == 400)
        this._AlertService.error('Due to some error order not inserted.');
      else
        console.log(err);
    })
  }
  Refresh(){
    this._CustomerComponent.setLoading(true);
  this.pageNumber[0] = true;
  this.paginationService.temppage = 0;
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this._RFCCallService.GetLedger(UserCode,this.FromDate,this.Todate).subscribe((data: any) => {
      this._CustomerComponent.setLoading(false);

      if (data != 0 && data != 1 && data != 3 && data != 4 && data ==2) {
        this.getLedgerData(1);
      }
      if (data == 0) {
        this._AlertService.error('We can not get the data for you because there is no data in SAP server for selected period');
      }
      if (data == 1) {
        this._AlertService.error('We can not get the data for you because the SAP server connection is down');
      }
      if (data == 3) {
        this._AlertService.error('We can not get the data for you because There is Some Issue with SAP server');
      }
      if (data == 4) {
        this._AlertService.error('We can not get the data for you because there is no data in SAP server for selected period');
      }
      this._CustomerComponent.setLoading(false);
    },
    err => {
      this._CustomerComponent.setLoading(false);
      if (err.status == 400)
        this._AlertService.error('Due to some error order not inserted.');
      else
        console.log(err);
    })
  }
  getLedgerDataCount() {
     let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this._CustomerService.getLedgerSearchCount(UserCode).subscribe((res: any) => {
      this.totalOrdersCount = res;
      this.totalNoOfPages();
    },
    err => {
      this._CustomerComponent.setLoading(false);
      if (err.status == 400)
        this._AlertService.error('Due to some error order not inserted.');
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
  this.getLedgerData(this.currentPage);
}

//Pagination Start

showPrevLedger() {

  if (this.paginationService.showNoOfCurrentPage != 1) {
    this.paginationService.prevPage();
    this.pageNumber = [];
    this.pageNumber[0] = true;
    this.currentPage = this.paginationService.pageField[0];
    this.getLedgerData(this.currentPage);
  }

}

showNextLedger() {

  if (this.paginationService.disabledNextBtn == false) {
    this.pageNumber = [];
    this.paginationService.nextPage();
    this.pageNumber[0] = true;
    this.currentPage = this.paginationService.pageField[0];
    this.getLedgerData(this.currentPage);
  }
}


download() {
  let UserCode;
  let UserTypetxt=  localStorage.getItem('UserType');
  if(UserTypetxt=='Customer'){
    UserCode= localStorage.getItem('UserCode');
  }else{
    UserCode=localStorage.getItem('CustCode');
  }
  this._CustomerComponent.setLoading(true);
  this._CustomerService.GetLedgerExportToExcel(  UserCode,).subscribe(response => {
    let blob: any = new Blob([response], { type: 'text/json; charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    this._CustomerComponent.setLoading(false);
    fileSaver.saveAs(blob, 'Ledger.xlsx');
  },
  err => {
    this._CustomerComponent.setLoading(false);
      console.log(err);
  })
}
}
