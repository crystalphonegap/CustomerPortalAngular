import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import * as fileSaver from 'file-saver';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { UserService } from 'src/app/shared/user.service';
import { CFAgentService } from 'src/app/shared/CFAgentService';
import { OrderService } from 'src/app/shared/OrderService';
import { DatePipe } from '@angular/common';
import { constStorage } from 'src/app/models/Storege';
import { UserConstant } from 'src/app/models/Userconstant';
import { SPComponent } from '../SP.component';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class SPPendingOrdersComponent implements OnInit {
  Orders: any=[];
  constructor(public datepipe: DatePipe,private _OrderServiceService: OrderService, private service: UserService, private router: Router,private _CFAgentService:CFAgentService
    , private _SPComponent:SPComponent  , public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService)
     { 
      this.FromDate = new Date();
      this.FromDate.setDate(this.FromDate.getDate() - 10);
      this.FromDate = this.datepipe.transform(this.FromDate, 'dd-MM-yyyy');
      this.Todate = new Date();
      this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
     }
     pageNo: any = 1;
     search = null;
     status = 'All';
     FromDate = null;
     Todate = null;
     Draft;
     UserTypetxt;
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
  UserCode;
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
    this.UserTypetxt=  localStorage.getItem(constStorage.UserType);
    if(this.UserTypetxt==UserConstant.SalesPromoter || this.UserTypetxt==UserConstant.OrderAnalyst){
      this.UserCode= localStorage.getItem(constStorage.UserCode);
    }else{
      this.UserTypetxt=UserConstant.SalesPromoter ;
      this.UserCode=localStorage.getItem(constStorage.UserSPCode);
    }
    this.getAllOrders(1);
  }
    
  getAllOrders(pageNo) {
    this._SPComponent.setLoading(true);
    this.pageNo=pageNo;
    this._OrderServiceService.GetCFAgentPendingOrderDetails(this.FromDate,this.Todate,this.UserTypetxt, this.UserCode, this.pageNo, this.OrdersPerPage, this.search).subscribe((data: any) => {
      this.Orders = data ;
      this._SPComponent.setLoading(false);
      this.getAllOrdersCount();
    },
    err => { 
      this._SPComponent.setLoading(false);
        console.log(err);
    })

  }
  getAllOrdersCount() {
    this._SPComponent.setLoading(true);
    this._OrderServiceService.GetCFAgentPendingOrderDetailsCount(this.FromDate,this.Todate,this.UserTypetxt,this.UserCode, this.search).subscribe((res: any) => {
      this.totalOrdersCount = res;
      this._SPComponent.setLoading(false);
      this.totalNoOfPages();
    },
    err => { 
      this._SPComponent.setLoading(false);
        console.log(err);
    })
  }
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
    this.getAllOrders(this.currentPage );
  }

  //Pagination Start  

  showPrevOrders() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllOrders(this.currentPage );
    }

  }

  showNextOrders() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllOrders(this.currentPage );
    }
  }
  download() {
    this._SPComponent.setLoading(true);
    this._CFAgentService.ExportToExcel(this.FromDate,this.Todate,'pending',this.UserTypetxt,this.UserCode, this.search).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
      this._SPComponent.setLoading(false);
			fileSaver.saveAs(blob, 'PendingOrderList.xlsx');
		},
    err => { 
      this._SPComponent.setLoading(false);
        console.log(err);
    })
  }

  
  pass(value): void {
    this.storage.set('OrderId', value);
    this.router.navigateByUrl('/SP/OrderView');
  }
}
