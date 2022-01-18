import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import * as fileSaver from 'file-saver';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { DatePipe } from '@angular/common';
import { RetailOrderService } from 'src/app/shared/RetailOrderService';
import { CustomerComponent } from '../Customer.component';

@Component({
  selector: 'app-retailer-list',
  templateUrl: './retailer-list.component.html',
  styleUrls: ['./retailer-list.component.css']
})
export class RetailerListComponent implements OnInit {
  Retailers: any=[];
  constructor( public datepipe: DatePipe,private router: Router, private _RetailOrderService: RetailOrderService,
    private _CustomerComponent:CustomerComponent,  public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService) {
      }
  userData;
  pageNo: any = 1;
  search = null;
  status = 'All';
  CompletedCount;
  PendingCount;
  partiallyCompletedCount;
  pageNumber: boolean[] = [];
  sortOrder: any = 'CompanyName_ASC';
  order: any = 'CompanyName';
  

  pageField = [];
  exactPageList: any;
  paginationData: number;
  RetailersPerPage: any = 10;
  orderBy: string = 'Asc';

  totalRetailers: any;
  totalRetailersCount: any;
  currentPage = 1;

  SearchFilter;
  ChangeFilter(){
    this.status=this.SearchFilter.controls['status'].value;
    this.search=this.SearchFilter.controls['search'].value;
    this.Search();
  }

  Search(){
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.getAllRetailers(1);
   
  }
    
  ngOnInit() {
    this.SearchFilter = new FormGroup({
      status: new FormControl('All', [Validators.required, Validators.maxLength(256)]),
      search: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    });
    this.Search();
   
  }

  getAllRetailers(pageNo) {
    this._CustomerComponent.setLoading(true);
    this.pageNo=pageNo;
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this._RetailOrderService.getAllRetailData(this.status,UserCode,'Customer', this.pageNo, this.RetailersPerPage, this.search).subscribe((data: any) => {
      this.Retailers = data ;
      this._CustomerComponent.setLoading(false);
      this.getAllRetailersCount();
    },
    err => { 
      this._CustomerComponent.setLoading(false);
        console.log(err);
    })

  }
  getAllRetailersCount() {
    this._CustomerComponent.setLoading(true);
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this._RetailOrderService.getAllRetailCount(this.status,UserCode,'Customer', this.search).subscribe((res: any) => {
      this.totalRetailersCount = res;
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

    this.paginationData = Number(this.totalRetailersCount / this.RetailersPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if(this.totalRetailersCount > this.RetailersPerPage){
      this.pageField = this.paginationService.pageField;
    }
    else{
      this.pageField = [1];
    }
   
  }
  showRetailersByPageNumber(page, i) {
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllRetailers(this.currentPage);
  }

  //Pagination Start  

  showPrevRetailers() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllRetailers(this.currentPage);
    }

  }

  showNextRetailers() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllRetailers(this.currentPage);
    }
  }


  pass(value): void {
    this.storage.set('OrderId', value);
    this.router.navigateByUrl('/Customer/RetailOrderEdit');
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
    this._RetailOrderService.downloadRetailFile(this.status,UserCode,'Customer', this.search).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
      this._CustomerComponent.setLoading(false);
			
			fileSaver.saveAs(blob, 'RetailerListExcel.xlsx');
		},
    err => { 
      this._CustomerComponent.setLoading(false);
        console.log(err);
    })
  }
}   
