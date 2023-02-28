import { Component, OnInit, Inject } from '@angular/core';
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
import { ExcelService } from 'src/app/services/excel.service';
import * as Excel from "exceljs/dist/exceljs.min.js";
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-balance-confirmation-list-for-all',
  templateUrl: './balance-confirmation-list-for-all.component.html',
  styleUrls: ['./balance-confirmation-list-for-all.component.css']
})
export class BalanceConfirmationListForAllComponent implements OnInit {
   BalanceConfirmations: any=[];
   BalanceConfirmationsdownload: any=[];
  action: string;
  constructor(private _EmpComponent:EmpComponent,public datepipe: DatePipe,private router: Router, private _BalanceConfirmation: BalanceConfirmation
    , public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService,private excelService:ExcelService) {
      this.FromDate = new Date();
      this.FromDate.setDate(this.FromDate.getDate() - 10);
      this.FromDate = this.datepipe.transform(this.FromDate, 'dd-MM-yyyy');
      this.Todate = new Date();
      this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy'); 
     }
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
  objects: Array<any> = [];
  Indexing: number = 1;
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
    this.UserCode= localStorage.getItem(constStorage.UserCode); 
    
    this.getAllBalanceConfirmation(1);
    this.getAllBalanceConfirmationdownload(1);
  }
    
  getAllBalanceConfirmation(pageno) {
    this._EmpComponent.setLoading(true);
    this.pageNo=pageno;
    this._BalanceConfirmation.GetBalConfHeaderDataForEmployees(this.FromDate,this.Todate,this.status,localStorage.getItem(constStorage.UserType),  this.UserCode, this.pageNo, this.BalanceConfirmationPerPage,this.search).subscribe((data: any) => {
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
    this._BalanceConfirmation.GetBalConfHeaderDataForEmployeesCount(this.FromDate,this.Todate,this.status,localStorage.getItem(constStorage.UserType),  this.UserCode,this.search).subscribe((res: any) => {
      this.totalBalanceConfirmationCount = res;
      this._EmpComponent.setLoading(false);
      this.totalNoOfPages();
    },
    err => { 
      this._EmpComponent.setLoading(false);
        console.log(err);
    })
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


  getAllBalanceConfirmationdownload(pageno) {
    this._EmpComponent.setLoading(true);
    this.pageNo=pageno;
    this._BalanceConfirmation.GetBalConfHeaderDataForEmployeesdownload(this.FromDate,this.Todate,this.status,localStorage.getItem(constStorage.UserType),  this.UserCode, this.pageNo, this.BalanceConfirmationPerPage,this.search).subscribe((data: any) => {
      this. BalanceConfirmationsdownload = data ;
      this._EmpComponent.setLoading(false);
      this.getAllBalanceConfirmationCount();
    },
    err => { 
      this._EmpComponent.setLoading(false);
        console.log(err);
    })
  }



  exportAsXLSX3():void {

   
    for (let i=0 ; i< this.BalanceConfirmationsdownload.length ; i++)
    {  

        if(i< this.BalanceConfirmationsdownload.length)
        {
          this.action="";
          if(this.BalanceConfirmationsdownload[i].BalanceConfirmationAction=="A")
          {
             this.action="Agreed";
          }
          else if(this.BalanceConfirmationsdownload[i].BalanceConfirmationAction=="P")
          {
            this.action="Pending";
          }
          else
          {
            this.action="";
          }
          this.objects.push([
             i+1,
             this.BalanceConfirmationsdownload[i].RequestNovtxt, 
             this.BalanceConfirmationsdownload[i].RegionCdvtxt,
             this.BalanceConfirmationsdownload[i].BranchNamevtxt,
             this.BalanceConfirmationsdownload[i].TerritoryNamevtxt,
             this.BalanceConfirmationsdownload[i].CustomerCodevtxt,
             this.BalanceConfirmationsdownload[i].CustomerNamevtxt,
             this.BalanceConfirmationsdownload[i].SPNamevtxt,
             this.BalanceConfirmationsdownload[i].FromDatedatetime,
             this.BalanceConfirmationsdownload[i].ToDatedatetime,
             this.BalanceConfirmationsdownload[i].OrderBlockvtxt,
             this.action,
             this.BalanceConfirmationsdownload[i].Remarksvtxt
           
            ]);
        }
        else
        {

        }
          
    }
    console.log(this.objects);
    this.generateExcel3(this.objects);
  //  this.router.navigateByUrl('/Emp/BalanceConfirmationListA');
  // this._EmpComponent.setLoading(false);
  }









  generateExcel3(objects): void{
    var options = {
      filename: './streamed-workbook.xlsx',
      useStyles: true,
      useSharedStrings: true
    };
    let workbook = new Excel.Workbook(options);

    
    var worksheet = workbook.addWorksheet('My Sheet', {properties:{tabColor:{argb:''}}});
    worksheet.columns = [
      { header: 'SrNo', key: 'SrNo', width: 5 },
      { header: 'Confirmation ID', key: 'Confirmation ID', width: 32, },
      { header: 'Region', key: 'Region', width: 32, },
      { header: 'Branch', key: 'Branch', width: 32, },
      { header: 'Territory', key: 'Territory', width: 32, },
      { header: 'Customer Code', key: 'Customer Code', width: 32, },
      { header: 'Customer Name', key: 'Customer Name', width: 32, },
      { header: 'Sales Promoter Name', key: 'Sales Promoter Name', width: 32, },
      { header: 'Balance Confirmation From Date', key: 'Balance Confirmation From Date', width: 32, },
      { header: 'Balance Confirmation ToDate', key: 'Balance Confirmation ToDate', width: 32, },
      { header: 'Status of the Customer (SAP Current Status)', key: 'Status of the Customer (SAP Current Status)', width: 32, },
      { header: 'Status of the Balance confirmation ', key: 'Status of the Balance confirmation ', width: 32, },
      { header: 'Comment added by user', key: 'Comment added by user', width: 32, }
    ];
    worksheet.addRows(objects,"n");
 
    let fileName="Balance_Confirmation_List.xlsx";
    const excelBuffer: any = workbook.xlsx.writeBuffer();
    workbook.xlsx.writeBuffer()
        .then(function(buffer) {
            // done buffering
            const data: Blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            FileSaver.saveAs(data, fileName);
        });

    // this.router.navigateByUrl('/Emp/BalanceConfirmationListA');   
  }

}
