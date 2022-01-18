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
import { CfAgentComponent } from '../CfAgent.component';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class CfAgentPendingOrdersComponent implements OnInit {
  Orders: any=[];
  constructor(public datepipe: DatePipe,private _OrderServiceService: OrderService, private service: UserService, private router: Router,private _CFAgentService:CFAgentService
    ,private _CfAgentComponent:CfAgentComponent , public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService)
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
  ngOnInit() {
    let UserTypetxt=  localStorage.getItem(constStorage.UserType);
    if(UserTypetxt==UserConstant.CFAgent){
      this.UserCode= localStorage.getItem(constStorage.UserCode);
    }else{
      this.UserCode=localStorage.getItem('UserCFCode');
    }
    this.getAllOrders();
  }
  getAllOrders() {
    this._CfAgentComponent.setLoading(true);
    this._OrderServiceService.GetCFAgentPendingOrderDetails(this.FromDate,this.Todate,UserConstant.CFAgent, this.UserCode, this.pageNo, this.OrdersPerPage, this.search).subscribe((data: any) => {
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
    this._OrderServiceService.GetCFAgentPendingOrderDetailsCount(this.FromDate,this.Todate,UserConstant.CFAgent,this.UserCode, this.search).subscribe((res: any) => {
      this.totalOrdersCount = res;
      this._CfAgentComponent.setLoading(false);
      this.totalNoOfPages();
    },
    err => { 
      this._CfAgentComponent.setLoading(false);
        console.log(err);
    })
  }
  totalNoOfPages() {

    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
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
    this.getAllOrders();
  }

  //Pagination Start  

  showPrevOrders() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllOrders();
    }

  }

  showNextOrders() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllOrders();
    }
  }
  sortByHeading(value: string, id) {
    this.Orders = [];
    this.sortOrder = value;
    this.order = value;
    if (this.orderBy == "Desc") {
      this.orderBy = "Asc"
      this.sortOrder = this.sortOrder + '_ASC';
    } else {
      this.orderBy = "Desc";
      this.sortOrder = this.sortOrder + '_DESC'
    }
    this.getAllOrders();
  }
  download() {
    this._CfAgentComponent.setLoading(true);
    this._CFAgentService.ExportToExcel(this.FromDate,this.Todate,'pending',UserConstant.CFAgent,this.UserCode, this.search).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
      this._CfAgentComponent.setLoading(false);
			fileSaver.saveAs(blob, 'PendingOrderList.xlsx');
		},
    err => { 
      this._CfAgentComponent.setLoading(false);
        console.log(err);
    })
  }

  
  pass(value): void {
    this.storage.set('OrderId', value);
    this.router.navigateByUrl('/CfAgent/OrderView');
  }
}
