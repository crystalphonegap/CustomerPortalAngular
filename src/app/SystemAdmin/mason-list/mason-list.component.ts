
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
import { LoyalityPointsService } from 'src/app/shared/LoyalityPointsService';
import { CustomerService } from 'src/app/shared/CustomerService';

@Component({
  selector: 'app-mason-list-list',
  templateUrl: './mason-list.component.html',
  styleUrls: ['./mason-list.component.css']
})
export class masonListComponent implements OnInit {

  LoyalityPoints: any = [];
  constructor( private router: Router, private _Orderservice: OrderService,private _CustomerService:CustomerService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService, private _SystemAdminComponent: SystemAdminComponent,
   public paginationService: PaginationService, private alertService: AlertService) {
  }
  Type;
  Region: string;
  Branch: string;
  Territory: string;
  search = null;
  pageNo: any = 1;
  Indexing: number = 1;
  pageNumber: boolean[] = [];
  pageField = [];
  exactPageList: any;
  paginationData: number;
  LoyalityPointsPerPage: any = 10;
  SearchFilter
  totalLoyalityPoints: any;
  totalLoyalityPointsCount: any;
  currentPage = 1;

  ngOnInit() {
    this.SearchFilter = new FormGroup({
      search: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    });
    this.Search();

  }

  ChangeFilter(value) {
    this.Type=value;
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
    this.getallLoyalityPoints(1);

  }
  getallLoyalityPoints(pageno) {
    this.pageNo = pageno;
    this.Indexing = pageno - 1;
    this.Indexing = this.Indexing * 10;
    this._SystemAdminComponent.setLoading(true);
    this._CustomerService.getMasonSearch( this.pageNo, 10, this.search).subscribe((data: any) => {
      this.LoyalityPoints = data;
      this._SystemAdminComponent.setLoading(false);
      this.getallLoyalityPointsCount();
    },
    err => {
      this._SystemAdminComponent.setLoading(false);
      console.log(err)
    })

  }
  getallLoyalityPointsCount() {
    this._SystemAdminComponent.setLoading(true);
    this._CustomerService.getMasonSearch( -1, 10,  this.search).subscribe((res: any) => {
      this.totalLoyalityPointsCount = res[0].MasonCodetxt;
      this._SystemAdminComponent.setLoading(false);
      this.totalNoOfPages();
    },
    err => {
      this._SystemAdminComponent.setLoading(false);
      console.log(err)
    })
  }

  //Method For Pagination
  totalNoOfPages() {
    this.paginationData = Number(this.totalLoyalityPointsCount / this.LoyalityPointsPerPage);
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
  showLoyalityPointsByPageNumber(page, i) {
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getallLoyalityPoints(this.currentPage);
  }

  //Pagination Start

  showPrevLoyalityPoints() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getallLoyalityPoints(this.currentPage);
    }

  }

  showNextLoyalityPoints() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getallLoyalityPoints(this.currentPage);
    }
  }

  download() {
    this._SystemAdminComponent.setLoading(true);
   this._CustomerService.ExcelMason(this.search).subscribe(response => {
     let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
     const url = window.URL.createObjectURL(blob);
     this._SystemAdminComponent.setLoading(false);
     fileSaver.saveAs(blob, 'MasonList.xlsx');
   },
   err => {
     this._SystemAdminComponent.setLoading(false);
       console.log(err);
   })
  }
Add(){
    this.router.navigateByUrl('/SystemAdmin/masonUploadComponent');
}
}
