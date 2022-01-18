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
import { DeliveryOrderService } from 'src/app/shared/DeliveryOrderService';
import { DatePipe, formatDate } from '@angular/common';
import { AlertService } from 'src/app/component/alert.service';
import { constStorage } from 'src/app/models/Storege';
import { RetailerComponent } from '../retailer.component';
@Component({
  selector: 'app-COrder-detail',
  templateUrl: './DispatchOrder-detail.component.html',
  styleUrls: ['./DispatchOrder-detail.component.css']
})
export class RetailerDispatchOrderDetailComponent implements OnInit {
  Orders: any[]=[];
  constructor( private alertService: AlertService,public datepipe: DatePipe,private _DeliveryOrderService: DeliveryOrderService, private service: UserService, private router: Router
   ,private _RetailerComponent:RetailerComponent , public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService) {
   }
  userData;
  pageNo: any = 1;
  search = null;
  status = 'All';
  FromDate = null;
  Todate = null;
  PGIDONE;
  DELIVERYDONE;
  pageNumber: boolean[] = [];
  sortOrder: any = 'CompanyName_ASC';
  order: any = 'CompanyName';
  
  Userid;
  User:any=[];
  pageField = [];
  exactPageList: any;
  paginationData: number;
  OrdersPerPage: any = 10;
  orderBy: string = 'Asc';

  totalOrders: any;
  totalOrdersCount: any;
  currentPage = 1;
  UserCode;
loadedFromDate;LoadedToDate;
  SearchFilter;
  ngOnInit() {

    this.FromDate = new Date();
    this.FromDate.setDate(this.FromDate.getDate() - 10);
    this.FromDate = this.datepipe.transform(this.FromDate, 'dd-MM-yyyy');
    this.Todate = new Date();
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy'); 
    this.loadedFromDate=true;
    this.LoadedToDate=true;
    this.SearchFilter = new FormGroup({
      status: new FormControl('All', [Validators.required, Validators.maxLength(256)]),
      FromDate: new FormControl( this.FromDate, [Validators.required, Validators.maxLength(256)]),
      Todate: new FormControl( this.Todate , [Validators.required, Validators.maxLength(256)]),
      search: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    });
   
      this.UserCode= localStorage.getItem(constStorage.UserCode);
   
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

  Search(){
    
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.getAllOrders(1);
    this.getUserInfo();
    this.getPGIDONE();
    this.getDELIVERYDONE();
  }
  getUserInfo() {
    let Userid = localStorage.getItem(constStorage.IDbint);
    if (Userid !== null && Userid !== "") {
      this.service.getUserProfile(Userid).subscribe(
        data => {
          this.User = data;
        }
      );
    }
    else {
      this.router.navigate(['/user/login']);
    }
  }

  onDateChange(order,event){
    let tempData=event.value._d
    order.OrderRecivedDate=  this.datepipe.transform(tempData, 'MM-dd-yyyy');;
  }

  onStatusChange( order,event) {

    
      const checked = event.target.checked;

      if (checked) {
        order.Active = 1;
      } 
      else {
  
        order.Active  = false;
      }
  
   
  }

  updateRemark( order,value) {

   
      order.Remark = value;
   
  }

  onSubmit(order){
    if(order.Active==true){
      if(order.Active==null||order.Active==''||order.Active==false){
        return
      }
      if(order.Remark==''||order.Remark==null){
        order.Remark="No Remark"
      }
      let Data ={
        Status:order.Active,
        DeliveryOrderNovtxt:order.DeliveryOrderNovtxt,
        Remark:order.Remark,
        OrderRecivedDate: order.OrderRecivedDate
      }
      
      this._RetailerComponent.setLoading(true);
    this._DeliveryOrderService.SetDeliveryStatus(Data).subscribe(
      (res: any) => {
        
      this._RetailerComponent.setLoading(false);
          
          this.ngOnInit();
        
        this.alertService.success('Order Updated.');
       
      },
      err => {
        this._RetailerComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Occourd');
        else
          console.log(err);
      }
    );
  

  
    }

  }

  getAllOrders(pageNo) {
    this._RetailerComponent.setLoading(false);
  this.pageNo=pageNo;
    this._DeliveryOrderService.GetShipToDeliveryOrderSearch(this.FromDate,this.Todate,this.status, this.UserCode, this.pageNo, this.OrdersPerPage, this.search).subscribe((data: any) => {
      this.Orders = data ;
      this._RetailerComponent.setLoading(false);
      this.getAllOrdersCount();
    })
  }
  getAllOrdersCount() {
    this._RetailerComponent.setLoading(true);
    this._DeliveryOrderService.GetShipToDeliveryOrderCount(this.FromDate,this.Todate,this.status, this.UserCode, this.search).subscribe((res: any) => {
      this.totalOrdersCount = res;
      this._RetailerComponent.setLoading(false);
      this.totalNoOfPages();
    })
  }
    
  getPGIDONE() {
    this._RetailerComponent.setLoading(true);
      this._DeliveryOrderService.GetShipToDeliveryOrderCount(this.FromDate,this.Todate,'Out for Delivery', this.UserCode, this.search).subscribe((res: any) => {
        this.PGIDONE = res;
        this._RetailerComponent.setLoading(false);
        if(res=="" || res==null ){
          this.PGIDONE = 0;
        }
    })
  } 

  getDELIVERYDONE() {
    this._RetailerComponent.setLoading(true);
      this._DeliveryOrderService.GetShipToDeliveryOrderCount(this.FromDate,this.Todate,'Loading Completed', this.UserCode, this.search).subscribe((res: any) => {
        this.DELIVERYDONE = res;
        this._RetailerComponent.setLoading(false);
        if(res=="" || res==null ){
          this.DELIVERYDONE  = 0;
        }
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
    this.router.navigateByUrl('/Customer/DispatchOrderDetailView');
  }

  
  ChangeStatus(Value) {
    if (Value !== null && Value !== "") {
     this.status=Value;
    }
  }

  download() {
    this._RetailerComponent.setLoading(true);
    this._DeliveryOrderService.downloadFile(this.FromDate,this.Todate,this.status, this.UserCode, this.search).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
      this._RetailerComponent.setLoading(false);
			
			fileSaver.saveAs(blob, 'dispatchorderlist.xlsx');
		},
    err => { 
      this._RetailerComponent.setLoading(false);
        console.log(err);
    })
  }
}   
