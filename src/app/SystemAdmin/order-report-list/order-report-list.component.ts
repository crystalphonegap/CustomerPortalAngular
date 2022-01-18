import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { PaginationService } from '../../component/pagination/pagination.service';
import * as fileSaver from 'file-saver';
import { AlertService } from 'src/app/component/alert.service';
import { OrderService } from 'src/app/shared/OrderService';
import { DatePipe } from '@angular/common';
import { SystemAdminComponent } from '../SystemAdmin.component';
import { SystemAdminService } from 'src/app/shared/SystemAdminService';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-order-report-list',
  templateUrl: './order-report-list.component.html',
  styleUrls: ['./order-report-list.component.css']
})
export class OrderReportListComponent implements OnInit {

  Orders: any = [];
  constructor(public datepipe: DatePipe, private router: Router, private _Orderservice: OrderService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService, private _SystemAdminComponent: SystemAdminComponent,
    private _SystemAdminService: SystemAdminService
    , public paginationService: PaginationService, private alertService: AlertService) {
    this.FromDate = new Date();
    this.FromDate.setDate(this.FromDate.getDate() - 10);
    this.FromDate = this.datepipe.transform(this.FromDate, 'dd-MM-yyyy');
    this.Todate = new Date();
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
  }
  Type;
  Region: string;
  Branch: string;
  Territory: string;
  search = null;
  status = 'All';
  FromDate = null;
  Todate = null;
  pageNo: any = 1;
  Indexing: number = 1;
  pageNumber: boolean[] = [];

  RegionDate: any = [];
  BranchDate: any = [];
  TerritoryDate: any = [];
  pageField = [];
  exactPageList: any;
  paginationData: number;
  OrdersPerPage: any = 10;

  loadedFromDate: boolean;
  LoadedToDate: boolean;
  SearchFilter
  totalOrders: any;
  totalOrdersCount: any;
  currentPage = 1;

  ngOnInit() {  
    this.SearchFilter = new FormGroup({
      status: new FormControl('All', [Validators.required, Validators.maxLength(256)]),
      FromDate: new FormControl( this.FromDate, [Validators.required, Validators.maxLength(256)]),
      Todate: new FormControl( this.Todate , [Validators.required, Validators.maxLength(256)]),
      search: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    });
    this.GetRegionData();
    this.GetBranchData();
    this.GetTerritoryDate();
    this.Search();

  }
  GetRegionData() {
    this._SystemAdminComponent.setLoading(true);
    let Search = null

    this._SystemAdminService.GetArea("Region", Search).subscribe((data: any) => {
      this.RegionDate = data;
      this._SystemAdminComponent.setLoading(false);
    },
      err => {
        this._SystemAdminComponent.setLoading(false);;
        console.log(err)
      });
  }
  GetBranchData() {
    this._SystemAdminComponent.setLoading(true);
    let Search = null
    if (this.Region != 'NoSearch') {
      Search = this.Region;
    }
    this._SystemAdminService.GetArea("Branch", Search).subscribe((data: any) => {
      this.BranchDate = data;
      this._SystemAdminComponent.setLoading(false);
    },
      err => {
        this._SystemAdminComponent.setLoading(false);
        console.log(err)
      });
  }
  GetTerritoryDate() {
    this._SystemAdminComponent.setLoading(true);
    let Search = null
    if (this.Region != 'NoSearch') {
      Search = this.Region;
    }
    if (this.Branch != 'NoSearch') {
      Search = this.Branch;
    }
    this._SystemAdminService.GetArea("SalesOffice", Search).subscribe((data: any) => {
      this._SystemAdminComponent.setLoading(false);
      this.TerritoryDate = data;
    },
      err => {
        this._SystemAdminComponent.setLoading(false);
        console.log(err)
      });

  }
  ChangeFilter(value) {
    this.Type=value;
    if (this.loadedFromDate == false) {
      this.FromDate = this.datepipe.transform(this.SearchFilter.controls['FromDate'].value._d, 'dd-MM-yyyy');
    }
    if (this.LoadedToDate == false) {
      this.Todate = this.datepipe.transform(this.SearchFilter.controls['Todate'].value._d, 'dd-MM-yyyy');
    }
    this.status=this.SearchFilter.controls['status'].value;
    this.search=this.SearchFilter.controls['search'].value;
    this.Search();
  }
  Search() {
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.currentPage = 1;
    if(this.Type=='download'){
      this.download();
    }
    this.getallOrders(1);

  }
  ChangeRegion(value) {
    this.Region = value
    this.Search();
    this.GetBranchData();
    this.GetTerritoryDate();
  }
  ChangeBranch(value) {
    this.Branch = value
    this.Search();
    this.GetTerritoryDate();
  }
  ChangeTerritory(value) {
    this.Territory = value
    this.Search();
  }
  getallOrders(pageno) {
    this.pageNo = pageno;
    this.Indexing = pageno - 1;
    this.Indexing = this.Indexing * 10;
    this._SystemAdminComponent.setLoading(true);
    this._Orderservice.GetOrderReportList(this.FromDate, this.Todate, this.Region, this.Branch, this.Territory, this.status, this.pageNo, 10, this.search).subscribe((data: any) => {
      this.Orders = data;
      this._SystemAdminComponent.setLoading(false);
      this.getallOrdersCount();
    },
    err => {
      this._SystemAdminComponent.setLoading(false);
      console.log(err)
    })

  }
  getallOrdersCount() {
    this._SystemAdminComponent.setLoading(true);
    this._Orderservice.GetAllOrdersCount(this.FromDate, this.Todate, this.Region, this.Branch, this.Territory, this.status, this.search).subscribe((res: any) => {
      this.totalOrdersCount = res;
      this._SystemAdminComponent.setLoading(false);
      this.totalNoOfPages();
    },
    err => {
      this._SystemAdminComponent.setLoading(false);
      console.log(err)
    })
  }

  changeDateLoad(value){
    if(value=='From'){
this.loadedFromDate=false
    }
    else  if(value=='To'){
      this.LoadedToDate=false
          }
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
    this.pageField = this.paginationService.pageField;

  }
  showOrdersByPageNumber(page, i) {
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getallOrders(this.currentPage);
  }

  //Pagination Start  

  showPrevOrders() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getallOrders(this.currentPage);
    }

  }

  showNextOrders() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getallOrders(this.currentPage);
    }
  }

  download() {
    this._SystemAdminComponent.setLoading(true);
   this._Orderservice.GetAllOrdersReportDownload(this.FromDate, this.Todate, this.Region, this.Branch, this.Territory, this.status, this.search).subscribe(response => {
     let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
     const url = window.URL.createObjectURL(blob);
     this._SystemAdminComponent.setLoading(false);
     fileSaver.saveAs(blob, 'OrderReport.xlsx');
   },
   err => { 
     this._SystemAdminComponent.setLoading(false);
       console.log(err);
   })
  }

  pass(value): void {
    if (value.UserTypetxt == 'Order Analyst') {
      this.storage.set('Userid', value.Idbint);
      this.router.navigateByUrl('/SystemAdmin/OrderAnalystEdit');
    }
    else {
      this.storage.set('Userid', value.Idbint);
      this.router.navigateByUrl('/SystemAdmin/EmployeeEdit');
    }
  }

}
