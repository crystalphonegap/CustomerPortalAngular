import { Component, OnInit } from '@angular/core';
import { SystemAdminService } from '../../shared/SystemAdminService';
import { Router } from '@angular/router';
import * as fileSaver from 'file-saver';
import { PaginationService } from '../../component/pagination/pagination.service';
import { UserService } from 'src/app/shared/user.service';
import { AlertService } from 'src/app/component/alert.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SystemAdminComponent } from '../SystemAdmin.component';

@Component({
  selector: 'app-system-admin-login-report',
  templateUrl: './system-admin-login-report.component.html',
  styleUrls: ['./system-admin-login-report.component.css']
})
export class SystemAdminLoginReportComponent implements OnInit {
  Reports: any=[];
  constructor(public datepipe: DatePipe,private _SystemAdminComponent:SystemAdminComponent,
     private _SystemAdminService: SystemAdminService
    , public paginationService: PaginationService) { }

  pageNo: any = 1;
  Indexing:number=1;
  pageNumber: boolean[] = [];
  sortOrder: any = 'CompanyName_ASC';
  order: any = 'CompanyName';
  smallPageRow: boolean = true;
  mediumPageRow: boolean = false;
  largePageRow: boolean = false;
  Status = 'All';
  small = 10;
  medium = 10;
  large = 10;
TodaysCount:number;
  pageField = [];
  exactPageList: any;
  paginationData: number;
  ReportsPerPage: any = 10;
  orderBy: string = 'Asc';

  totalReports: any;
  totalReportsCount: any;
  currentPage = 1;

  Active = 0;
  InActive = 0;
  Registered = 0;
  NotRegistered = 0;
  search = null;
  FromDate = null;
  Todate = null;
  loadedFromDate;LoadedToDate;
  SearchFilter;
  ngOnInit() {
    this.FromDate = new Date();
    this.FromDate.setDate(this.FromDate.getDate() - 2);
    this.FromDate = this.datepipe.transform(this.FromDate, 'dd-MM-yyyy');
    this.Todate = new Date();
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy'); 
    this.loadedFromDate=true;
    this.LoadedToDate=true;
    this.SearchFilter = new FormGroup({
      FromDate: new FormControl( this.FromDate, [Validators.required, Validators.maxLength(256)]),
      Todate: new FormControl( this.Todate , [Validators.required, Validators.maxLength(256)]),
      search: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    });
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
  Search(){
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.currentPage=1;
    this.getAllReports(1);
  }
  ChangeFilter(){
    if(this.loadedFromDate==false){
      this.FromDate=  this.datepipe.transform(this.SearchFilter.controls['FromDate'].value._d, 'dd-MM-yyyy');
    }
    if(this.LoadedToDate==false){
      this.Todate=  this.datepipe.transform(this.SearchFilter.controls['Todate'].value._d, 'dd-MM-yyyy');
    }
    this.search=this.SearchFilter.controls['search'].value;
    this.Search();
  }
  getAllReports(pageNo) {
    this._SystemAdminComponent.setLoading(true);
    this.pageNo=pageNo;
    this.Indexing=pageNo-1;
    this.Indexing=this.Indexing*10;
    this._SystemAdminService.LoginReport(this.FromDate,this.Todate,  this.pageNo, this.ReportsPerPage, this.search).subscribe((data: any) => {
      this.Reports = data ;
      this._SystemAdminComponent.setLoading(false);
      this.getAllCustomersCount();
    },
    err => { 
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })
    this._SystemAdminService.LoginReportCount(this.FromDate,this.Todate, "TodaysCount",this.search).subscribe((data: any) => {
      this.TodaysCount = data;
      this._SystemAdminComponent.setLoading(false);
    },
    err => { 
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })
  }

  getAllCustomersCount() {
    this._SystemAdminComponent.setLoading(true);
    this._SystemAdminService.LoginReportCount(this.FromDate,this.Todate, "Count",this.search).subscribe((data: any) => {
      this.totalReportsCount = data;
      this._SystemAdminComponent.setLoading(false);
      this.totalNoOfPages();
    },
    err => { 
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })

  }
  showReportsByPageNumber(page, i) {
    this.Reports = [];
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllReports(this.currentPage );
  }

  //Pagination Start  

  showPrevReports() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllReports(this.currentPage );
    }

  }

  showNextReports() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllReports(this.currentPage );
    }
  }
  sortByHeading(value: string, id) {
    this.Reports = [];
    this.sortOrder = value;
    this.order = value;
    if (this.orderBy == "Desc") {
      this.orderBy = "Asc"
      this.sortOrder = this.sortOrder + '_ASC';
    } else {
      this.orderBy = "Desc";
      this.sortOrder = this.sortOrder + '_DESC'
    }
    this.getAllReports(this.currentPage );
  }






  //Method For Pagination  
  totalNoOfPages() {

    this.paginationData = Number(this.totalReportsCount / this.ReportsPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if (this.totalReportsCount > this.ReportsPerPage) {
      this.pageField = this.paginationService.pageField;
    }
    else {
      this.pageField = [1];
    }


  }


  download() {
    this._SystemAdminComponent.setLoading(true);
    this._SystemAdminService.LoginReportDownloadExcel(this.FromDate,this.Todate, this.search).subscribe(response => {
      let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      this._SystemAdminComponent.setLoading(false);
      fileSaver.saveAs(blob, 'LoginReport.xlsx');
    },
    err => { 
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })
   }
   

  ChangeStatus(Value) {
    if (Value !== null && Value !== "") {
      this.Status = Value;
    }
  }

}   
