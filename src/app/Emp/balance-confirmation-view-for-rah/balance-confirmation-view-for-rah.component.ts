import { Component, OnInit, Inject } from '@angular/core';
import { SystemAdminService } from '../../shared/SystemAdminService';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import * as fileSaver from 'file-saver';
import { BalanceConfirmation } from 'src/app/shared/BalanceConfirmation';
import { constStorage } from 'src/app/models/Storege';
import { DatePipe } from '@angular/common';
import { EmpComponent } from '../Emp.component';

@Component({
  selector: 'app-balance-confirmation-view-for-rah',
  templateUrl: './balance-confirmation-view-for-rah.component.html',
  styleUrls: ['./balance-confirmation-view-for-rah.component.css']
})
export class BalanceConfirmationViewForRAHComponent implements OnInit {

  BalanceConfirmations: any=[];
  constructor(private _EmpComponent:EmpComponent,public datepipe: DatePipe,private router: Router, private _BalanceConfirmation: BalanceConfirmation
    , public paginationService: PaginationService,private _SystemAdminService: SystemAdminService, @Inject(SESSION_STORAGE) private storage: WebStorageService) {
      this.FromDate = new Date();
      this.FromDate.setDate(this.FromDate.getDate() - 10);
      this.FromDate = this.datepipe.transform(this.FromDate, 'dd-MM-yyyy');
      this.Todate = new Date();
      this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy'); 
     }
     Region: string = "NoSearch";
     Branch: string = "NoSearch";
     Territory:string = "NoSearch";
     UserType;
     BranchDate: any = [];
     RegionDate: any = [];
     TerritoryDate: any = [];
     pageNo: any = 1;
     search = null;
     pageNumber: boolean[] = [];
     sortOrder: any = 'CompanyName_ASC';
     order: any = 'CompanyName';
     Userid;
     User;
     pageField = [];
     exactPageList: any;
     paginationData: number;
     BalanceConfirmationPerPage: any = 10;
     orderBy: string = 'Asc';
     totalBalanceConfirmation: any;
     totalBalanceConfirmationCount: any;
     currentPage = 1;
     UserCode;
     status='All';
   FromDate = null;
   Todate = null; SearchFilter;
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
     this.UserCode= localStorage.getItem(constStorage.UserCode);
     this.UserType = localStorage.getItem(constStorage.UserType);
     this.SearchFilter = new FormGroup({
       status: new FormControl('All', [Validators.required, Validators.maxLength(256)]),
       FromDate: new FormControl( this.FromDate, [Validators.required, Validators.maxLength(256)]),
       Todate: new FormControl( this.Todate , [Validators.required, Validators.maxLength(256)]),
       search: new FormControl('', [Validators.required, Validators.maxLength(256)]),
     });
     this.Search();
     this.GetRegionData();
     this.GetBranchData();
     this.GetTerritoryData();
    
   }
   Search(){
     this.pageNumber[0] = true;
     this.paginationService.temppage = 0;     
     this.getAllBalanceConfirmation(1);
   }
     
   getAllBalanceConfirmation(pageno) {
    debugger
     this._EmpComponent.setLoading(true);
     this.pageNo=pageno;
     this._BalanceConfirmation.GetBalConfHeaderDataForRH(this.FromDate,this.Todate,localStorage.getItem(constStorage.UserType),  this.UserCode,this.Region,this.Branch,this.Territory, this.pageNo, this.BalanceConfirmationPerPage).subscribe((data: any) => {
       this. BalanceConfirmations = data ;
       this._EmpComponent.setLoading(false);
       this.getAllBalanceConfirmationCount();
     },
     err => { 
       this._EmpComponent.setLoading(false);
         console.log(err);
     })
   }
 
   getAllBalanceConfirmationCount() {
     this._EmpComponent.setLoading(true);
     this._BalanceConfirmation.GetBalConfHeaderDataForRHCount(this.FromDate,this.Todate,localStorage.getItem(constStorage.UserType),  this.UserCode,this.Region,this.Branch,this.Territory).subscribe((res: any) => {
       this.totalBalanceConfirmationCount = res;
       this._EmpComponent.setLoading(false);
       this.totalNoOfPages();
     },
     err => { 
       this._EmpComponent.setLoading(false);
         console.log(err);
     })
   }

   GetBranchData() {
    this._EmpComponent.setLoading(true);
    debugger
    let Search = ""
    if (this.Region != 'NoSearch') {
      Search = this.Region;
    }
    this._SystemAdminService.GetSalesHierachyforRAH(localStorage.getItem(constStorage.UserType),  this.UserCode,"Branch",Search).subscribe((data: any) => {
      this.BranchDate = data;
      this._EmpComponent.setLoading(false);
    },
      err => {
        this._EmpComponent.setLoading(false);
        console.log(err)
      });
  }
  GetRegionData() {
    this._EmpComponent.setLoading(true);
    debugger
    let Search = null
    this._SystemAdminService.GetSalesHierachyforRAH(localStorage.getItem(constStorage.UserType),  this.UserCode,"Region",this.search).subscribe((data: any) => {
      this.RegionDate = data;
      this._EmpComponent.setLoading(false);
    },
      err => {
        this._EmpComponent.setLoading(false);
        console.log(err)
      });
  }
  ChangeRegion(value) {
    this.Region = value
    this.Search();
    this.GetBranchData();
  }

  ChangeBranch(value) {
    this.Branch = value
    this.Search();
    this.GetTerritoryData();
  }
  ChangeTerritory(value) {
    this.Territory = value
    this.Search();
  }

  GetTerritoryData() {
    debugger
    this._EmpComponent.setLoading(true);
    let Search = ""
    if (this.Branch != 'NoSearch') {
      Search = this.Branch;
    }
    this._SystemAdminService.GetSalesHierachyforRAH(localStorage.getItem(constStorage.UserType),  this.UserCode,"SalesOffice",Search).subscribe((data: any) => {
      this._EmpComponent.setLoading(false);
      this.TerritoryDate = data;
    },
      err => {
        this._EmpComponent.setLoading(false);
        console.log(err)
      });

  }
 
   //Method For Pagination  
   totalNoOfPages() {
 
     this.paginationData = Number(this.totalBalanceConfirmationCount / this.BalanceConfirmationPerPage);
     let tempPageData = this.paginationData.toFixed();
     if (Number(tempPageData) < this.paginationData) {
       this.exactPageList = Number(tempPageData) + 1;
       this.paginationService.exactPageList = this.exactPageList;
     } else {
       this.exactPageList = Number(tempPageData);
       this.paginationService.exactPageList = this.exactPageList
     }
     this.paginationService.pageOnLoad();
     if(this.totalBalanceConfirmationCount > this.BalanceConfirmationPerPage){
       this.pageField = this.paginationService.pageField;
     }
     else{
       this.pageField = [1];
     }
    
 
   }
   showBalanceConfirmationByPageNumber(page, i) {
     this.pageNumber = [];
     this.pageNumber[i] = true;
     this.pageNo = page;
     this.currentPage = page;
     this.getAllBalanceConfirmation(this.currentPage);
   }
 
   //Pagination Start  
 
   showPrevBalanceConfirmation() {
 
     if (this.paginationService.showNoOfCurrentPage != 1) {
       this.paginationService.prevPage();
       this.pageNumber = [];
       this.pageNumber[0] = true;
       this.currentPage = this.paginationService.pageField[0];
       this.getAllBalanceConfirmation(this.currentPage);
     }
 
   }
 
   showNextBalanceConfirmation() {
 
     if (this.paginationService.disabledNextBtn == false) {
       this.pageNumber = [];
       this.paginationService.nextPage();
       this.pageNumber[0] = true;
       this.currentPage = this.paginationService.pageField[0];
       this.getAllBalanceConfirmation(this.currentPage);
     }
   }
   pass(BCNo,CustomerCode,BCheader): void {
     this.storage.set('BCNo', BCNo);
     this.storage.set('CustomerCode', CustomerCode);
     this.storage.set('BCheader', BCheader);
     this.router.navigateByUrl('/Emp/BalanceConfirmationViewA');
   }
 
 }
