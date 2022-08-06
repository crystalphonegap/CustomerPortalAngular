import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import * as fileSaver from 'file-saver';
import { CustomerFloatDataComponent } from '../customer-float-data/customer-float-data.component';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { InvoiceService } from 'src/app/shared/InvoiceService';
import { DatePipe } from '@angular/common';
import { constStorage } from 'src/app/models/Storege';
import { CustomerComponent } from '../Customer.component';
import { AlertService } from 'src/app/component/alert.service';
@Component({
  selector: 'app-COrder-detail',
  templateUrl: './Invoice-detail.component.html',
  styleUrls: ['./Invoice-detail.component.css']
})
export class CustomerInvoiceDetailComponent implements OnInit {
  Invoices: any=[];
  constructor(private alertService: AlertService, private _CustomerComponent:CustomerComponent, public datepipe: DatePipe,private _InvoiceService: InvoiceService, private router: Router
    , public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService) { 
      this.FromDate = new Date();
      this.FromDate.setDate(this.FromDate.getDate() - 10);
      this.FromDate = this.datepipe.transform(this.FromDate, 'dd-MM-yyyy');
      this.Todate = new Date();
      this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');}
  userData;
  pageNo: any = 1;
  search = null;
  FromDate = null;
  Status='All';
  Todate = null;
  pageNumber: boolean[] = [];
  sortInvoice: any = 'CompanyName_ASC';
  Invoice: any = 'CompanyName';
  

  pageField = [];
  exactPageList: any;
  paginationData: number;
  InvoicesPerPage: any = 10;
  InvoiceBy: string = 'Asc';

  totalInvoices: any;
  totalInvoicesCount: any;
  currentPage = 1;
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
    this.search=this.SearchFilter.controls['search'].value;
    this.Search();
  }

  Search(){
    this.getAllInvoices(1);
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

  getAllInvoices(pageNo) {
    this.pageNo=pageNo;
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this._InvoiceService.getAllInvoiceData(this.FromDate,this.Todate,this.Status,UserCode, this.pageNo, this.InvoicesPerPage, this.search).subscribe((data: any) => {
      this.Invoices = data ;
      this.getAllInvoicesCount();
    })

  }
  getAllInvoicesCount() {
    debugger;
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this._InvoiceService.getAllInvoiceCount(this.FromDate,this.Todate,this.Status,UserCode, this.search).subscribe((res: any) => {
      this.totalInvoicesCount = res;
      console.log(this.totalInvoicesCount);
      this.totalNoOfPages();
    })
  }

  //Method For Pagination  
  totalNoOfPages() {

    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.paginationData = Number(this.totalInvoicesCount / this.InvoicesPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if(this.totalInvoicesCount > this.InvoicesPerPage){
      this.pageField = this.paginationService.pageField;
    }
    else{
      this.pageField = [1];
    }
   

  }
  showInvoicesByPageNumber(page, i) {
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllInvoices(this.currentPage);
  }

  //Pagination Start  

  showPrevInvoices() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllInvoices(this.currentPage);
    }

  }

  showNextInvoices() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllInvoices(this.currentPage);
    }
  }
 
  pass(value): void {
    this.storage.set('InvoiceId', value);
    this.router.navigateByUrl('/Customer/InvoiceDetailView');
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
    this._InvoiceService.downloadFile(this.FromDate,this.Todate,this.Status,UserCode, this.search).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
      this._CustomerComponent.setLoading(false);
			fileSaver.saveAs(blob, 'InvoiceList.xlsx');
		},
    err => {
      this._CustomerComponent.setLoading(false);
      console.log('Error downloading the file');
    }
      )
  }


  downloadPdf(invoiceNo){
    if (invoiceNo==""|| invoiceNo==null){
      this.alertService.error("Invoice Document does not exist for this invoice number");
      return;
    }
    this._CustomerComponent.setLoading(true);
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this._InvoiceService.invoicePDFDownload(invoiceNo,UserCode).subscribe(response => {

      if (response==""|| response==null){
        this.alertService.error("Invoice Document does not exist for this invoice number");
        this._CustomerComponent.setLoading(false);
        return;
      }
			this.returnPdf(response,invoiceNo);
		},
    err => {
      this._CustomerComponent.setLoading(false);
      console.log('Error downloading the file');
    }
      )
  }

  returnPdf(base64String, fileName){
    if(window.navigator && window.navigator.msSaveOrOpenBlob){ 
      // download PDF in IE
      let byteChar = atob(base64String);
      let byteArray = new Array(byteChar.length);
      for(let i = 0; i < byteChar.length; i++){
        byteArray[i] = byteChar.charCodeAt(i);
      }
      let uIntArray = new Uint8Array(byteArray);
      let blob = new Blob([uIntArray], {type : 'application/pdf'});
      this._CustomerComponent.setLoading(false);
      window.navigator.msSaveOrOpenBlob(blob, `Invoice-${fileName}.pdf`);
    } else {
      // Download PDF in Chrome etc.
      const source = `data:application/pdf;base64,${base64String}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `Invoice-${fileName}.pdf`
      this._CustomerComponent.setLoading(false);
      link.click();
    }
  }

  ChangeStatus(Value) {
    if (Value !== null && Value !== "") {
     this.Status=Value;
    }
  }

}   
