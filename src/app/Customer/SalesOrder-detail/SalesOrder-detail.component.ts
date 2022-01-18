import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CustomerService } from 'src/app/shared/CustomerService';
import * as fileSaver from 'file-saver';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { SalesOrderService } from 'src/app/shared/SalesOrderService';
import { CustomerFloatDataComponent } from '../customer-float-data/customer-float-data.component';
import { DatePipe } from '@angular/common';
import { CustomerComponent } from '../Customer.component';
@Component({
  selector: 'app-COrder-detail',
  templateUrl: './SalesOrder-detail.component.html',
  styleUrls: ['./SalesOrder-detail.component.css']
})
export class CustomerSalesOrderDetailComponent implements OnInit {
  Orders: any=[];
  constructor( public datepipe: DatePipe,private router: Router, 
    private _SalesService: SalesOrderService,
    public paginationService: PaginationService, 
    private _CustomerComponent:CustomerComponent,
    @Inject(SESSION_STORAGE) private storage: WebStorageService) {
      this.FromDate = new Date();
      this.FromDate.setDate(this.FromDate.getDate() - 10);
      this.FromDate = this.datepipe.transform(this.FromDate, 'dd-MM-yyyy');
      this.Todate = new Date();
      this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy'); }
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
    if(this.loadedFromDate==false){
      this.FromDate=  this.datepipe.transform(this.SearchFilter.controls['FromDate'].value._d, 'dd-MM-yyyy');
    }
    if(this.LoadedToDate==false){
      this.Todate=  this.datepipe.transform(this.SearchFilter.controls['Todate'].value._d, 'dd-MM-yyyy');
    }
    this.status=this.SearchFilter.controls['status'].value;
    this.search=this.SearchFilter.controls['search'].value;
    this.Search();
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
    this.Search();
   
  }

  Search(){
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.getAllOrders(1);
    this.getPending();
    this.getCompleted()
    this.getPartiallyCompleted();
  }
    

  getPending() {
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this._CustomerComponent.setLoading(true);
    this._SalesService.getAllSalesOrderCount(this.FromDate,this.Todate,'Pending',UserCode, this.search).subscribe((res: any) => {
      this.PendingCount = res;
      this._CustomerComponent.setLoading(false);
      if(res=="" || res==null ){
        this.PendingCount = 0;
      }
    },
    err => { 
      this._CustomerComponent.setLoading(false);
        console.log(err);
    })
  } 
  getCompleted() {
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this._CustomerComponent.setLoading(true);
    this._SalesService.getAllSalesOrderCount(this.FromDate,this.Todate,'Completely processed',UserCode, this.search).subscribe((res: any) => {
      this.CompletedCount = res;
      this._CustomerComponent.setLoading(false);
      if(res=="" || res==null ){
        this.CompletedCount  = 0;
      }
    },
    err => { 
      this._CustomerComponent.setLoading(false);
        console.log(err);
    })
  }

  getPartiallyCompleted() {
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this._CustomerComponent.setLoading(true);
    this._SalesService.getAllSalesOrderCount(this.FromDate,this.Todate,'Partially processed',UserCode, this.search).subscribe((res: any) => {
      this.partiallyCompletedCount = res;
      this._CustomerComponent.setLoading(false);
      if(res=="" || res==null ){
        this.partiallyCompletedCount  = 0;
      }
    },
    err => { 
      this._CustomerComponent.setLoading(false);
        console.log(err);
    })
  }


  getAllOrders(pageno) {
  this.pageNo=pageno;
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this._CustomerComponent.setLoading(true);
    this._SalesService.getAllSalesOrderData(this.FromDate,this.Todate,this.status,UserCode, this.pageNo, this.OrdersPerPage, this.search).subscribe((data: any) => {
      this.Orders = data ;
      this._CustomerComponent.setLoading(false);
      this.getAllOrdersCount();
    },
    err => { 
      this._CustomerComponent.setLoading(false);
        console.log(err);
    })

  }
  getAllOrdersCount() {
    this._CustomerComponent.setLoading(true);
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this._SalesService.getAllSalesOrderCount(this.FromDate,this.Todate,this.status,UserCode, this.search).subscribe((res: any) => {
      this.totalOrdersCount = res;
      this._CustomerComponent.setLoading(false);
      this.totalNoOfPages();
    },
    err => { 
      this._CustomerComponent.setLoading(false);
        console.log(err);
    })
  }

  //Method For Pagination  
  totalNoOfPages() {

    this._CustomerComponent.setLoading(false);
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
  showOrdersByPageNumber(page, i) {
    this.Orders = [];
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllOrders(this.currentPage);
  }

  //Pagination Start  

  showPrevOrders() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllOrders(this.currentPage);
    }

  }

  showNextOrders() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllOrders(this.currentPage);
    }
  }

  pass(value): void {
    this.storage.set('OrderId', value);
    this.router.navigateByUrl('/Customer/SalesOrderDetailView');
  }

  ChangeStatus(Value) {
    if (Value !== null && Value !== "") {
     this.status=Value;
    }
  }
 download() {
  this._CustomerComponent.setLoading(true);
  let UserCode;
  let UserTypetxt=  localStorage.getItem('UserType');
  if(UserTypetxt=='Customer'){
    UserCode= localStorage.getItem('UserCode');
  }else{
    UserCode=localStorage.getItem('CustCode');
  }
    this._SalesService.downloadFile(this.FromDate,this.Todate,this.status,UserCode, this.search).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
      this._CustomerComponent.setLoading(false);
			const url = window.URL.createObjectURL(blob);
			fileSaver.saveAs(blob, 'SalesOrderList.xlsx');
		},
    err => { 
      this._CustomerComponent.setLoading(false);
        console.log(err);
    })
  }
}   
