import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CustomerService } from 'src/app/shared/CustomerService';
import * as fileSaver from 'file-saver';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { UserService } from 'src/app/shared/user.service';
import { OrderService } from 'src/app/shared/OrderService';
import { DatePipe } from '@angular/common';
import { CFAgentService } from 'src/app/shared/CFAgentService';
import { constStorage } from 'src/app/models/Storege';
import { UserConstant } from 'src/app/models/Userconstant';
import { CfAgentComponent } from '../CfAgent.component';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class CFOrderListComponent implements OnInit {
  Orders: any=[];
  constructor( public datepipe: DatePipe,private _CFAgentService:CFAgentService,private _OrderServiceService: OrderService, private service: UserService, private router: Router, private _CustomerService: CustomerService
    , public paginationService: PaginationService,private _CfAgentComponent:CfAgentComponent, @Inject(SESSION_STORAGE) private storage: WebStorageService) { 
      this.FromDate = new Date();
      this.FromDate.setDate(this.FromDate.getDate() - 10);
      this.FromDate = this.datepipe.transform(this.FromDate, 'dd-MM-yyyy');
      this.Todate = new Date();
      this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
    }
  userData;
  pageNo: any = 1;
  search = null;
  status = 'All';
  PendingCount;
  Posted;
  FromDate = null;
  Todate = null;
  Draft;
  pageNumber: boolean[] = [];
  sortOrder: any = 'CompanyName_ASC';
  order: any = 'CompanyName';
  Userid;
  User;
  pageField = [];
  exactPageList: any;
  paginationData: number;
  OrdersPerPage: any = 10;
  orderBy: string = 'Asc';

  totalOrders: any;
  totalOrdersCount: any;
  currentPage = 1;

  CompletedCount;
  partiallyCompletedCount;
  UserCode
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
    let UserTypetxt=  localStorage.getItem(constStorage.UserType);
    if(UserTypetxt==UserConstant.CFAgent){
      this.UserCode= localStorage.getItem(constStorage.UserCode);
    }else{
      this.UserCode=localStorage.getItem(constStorage.UserCFCode);
    }
    this.getAllOrders(1);
    this.getPending();
    this.getPosted();
  }
    

  getPending() {
    this._CfAgentComponent.setLoading(true);
    
   
      this._OrderServiceService.GetAllOrdersByCFCodeCount(this.FromDate,this.Todate,'Pending',UserConstant.CFAgent,this.UserCode, this.search).subscribe((res: any) => {
        this.PendingCount = res;
        this._CfAgentComponent.setLoading(false);
        if(res=="" || res==null ){
          this.PendingCount = 0;
        }
    },
    err => { 
      this._CfAgentComponent.setLoading(false);
        console.log(err);
    })
  } 

  getPosted() {
    this._CfAgentComponent.setLoading(true);
    this._OrderServiceService.GetAllOrdersByCFCodeCount(this.FromDate,this.Todate,'Posted To SAP',UserConstant.CFAgent,this.UserCode, this.search).subscribe((res: any) => {
      this.Posted = res;
      if(res=="" || res==null ){
        this._CfAgentComponent.setLoading(false);
        this.Posted = 0;
      }
  },
  err => { 
    this._CfAgentComponent.setLoading(false);
      console.log(err);
  })
} 
  
  getAllOrders(pageNo) {
    this._CfAgentComponent.setLoading(true);
   this.pageNo=pageNo;
    this._OrderServiceService.GetAllOrdersByCFCode(this.FromDate,this.Todate,this.status,UserConstant.CFAgent, this.UserCode, this.pageNo, this.OrdersPerPage, this.search).subscribe((data: any) => {
      this.Orders = data ;
      this._CfAgentComponent.setLoading(false);
      this.getAllOrdersCount();
    },
    err => { 
      this._CfAgentComponent.setLoading(false);
        console.log(err);
    })

  }
  getAllOrdersCount() {
    this._CfAgentComponent.setLoading(true);
 
    this._OrderServiceService.GetAllOrdersByCFCodeCount(this.FromDate,this.Todate,this.status,UserConstant.CFAgent,this.UserCode, this.search).subscribe((res: any) => {
      this.totalOrdersCount = res;
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
    this.router.navigateByUrl('/CfAgent/AllOrderView');
  }

  ChangeStatus(Value) {
    if (Value !== null && Value !== "") {
     this.status=Value;
    }
  }


  
  download() {
   
    this._CfAgentComponent.setLoading(true);
    this._CFAgentService.ExportToExcel(this.FromDate,this.Todate,this.status,UserConstant.CFAgent,this.UserCode, this.search).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
      this._CfAgentComponent.setLoading(false);
			fileSaver.saveAs(blob, 'OrderList.xlsx');
		},
    err => { 
      this._CfAgentComponent.setLoading(false);
        console.log(err);
    })
  }

}   
