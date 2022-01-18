import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CustomerService } from 'src/app/shared/CustomerService';
import * as fileSaver from 'file-saver';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { UserService } from 'src/app/shared/user.service';
import { DatePipe } from '@angular/common';
import { TicketService } from 'src/app/shared/TicketService';
import { CustomerComponent } from '../Customer.component';

@Component({
  selector: 'app-customer-ticket-list',
  templateUrl: './customer-ticket-list.component.html',
  styleUrls: ['./customer-ticket-list.component.css']
})
export class CustomerTicketListComponent implements OnInit {
  Tickets: any =[];
  constructor(public datepipe: DatePipe,  private _CustomerComponent:CustomerComponent, private _TicketService: TicketService, private service: UserService, private router: Router, private _CustomerService: CustomerService
    , public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService) {
    this.FromDate = new Date();
    this.FromDate.setDate(this.FromDate.getDate() - 10);
    this.FromDate = this.datepipe.transform(this.FromDate, 'dd-MM-yyyy');
    this.Todate = new Date();
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
  }
  userData;
  loadedFromDate:boolean;
  LoadedToDate:boolean;
  pageNo: any = 1;
  search = null;
  status = 'All';
  FromDate = null;
  Todate = null;
  Draft;
  pageNumber: boolean[] = [];
  sortOrder: any = 'CompanyName_ASC';
  order: any = 'CompanyName';

  SearchFilter;
  Userid;
  User;
  pageField = [];
  exactPageList: any;
  paginationData: number;
  TicketsPerPage: any = 10;
  orderBy: string = 'Asc';

  totalTickets: any;
  totalTicketsCount: any;
  currentPage = 1;
  Open:number;
  Posted;
  Submitted;
  InProcess:number;
  Resolved:number;
  Closed:number;
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

  getOpen() {
    let UserCode;
    let UserTypetxt = localStorage.getItem('UserType');
    if (UserTypetxt == 'Customer') {
      UserCode = localStorage.getItem('UserCode');
    } else {
      UserCode = localStorage.getItem('CustCode');
    }
    this._TicketService.GetTicketCount(this.FromDate, this.Todate, UserCode,'Customer',  'Open',this.search).subscribe((res: any) => {
      this.Open = res;
      if (res == "" || res == null) {
        this.Open = 0;
      }
    })
  }

  getInProcess() {
    let UserCode;
    let UserTypetxt = localStorage.getItem('UserType');
    if (UserTypetxt == 'Customer') {
      UserCode = localStorage.getItem('UserCode');
    } else {
      UserCode = localStorage.getItem('CustCode');
    }
    this._TicketService.GetTicketCount(this.FromDate, this.Todate,UserCode, 'Customer',  'In-Process', this.search).subscribe((res: any) => {
      this.InProcess = res;
      if (res == "" || res == null) {
        this.InProcess = 0;
      }
    })
  }

  getResolved() {
    let UserCode;
    let UserTypetxt = localStorage.getItem('UserType');
    if (UserTypetxt == 'Customer') {
      UserCode = localStorage.getItem('UserCode');
    } else {
      UserCode = localStorage.getItem('CustCode');
    }
    this._TicketService.GetTicketCount(this.FromDate,this.Todate,UserCode, 'Customer',  'Resolved',this.search).subscribe((res: any) => {
      this.Resolved = res;
      if (res == "" || res == null) {
        this.Resolved = 0;
      }
    })
  }
  getClosed() {
    let UserCode;
    let UserTypetxt = localStorage.getItem('UserType');
    if (UserTypetxt == 'Customer') {
      UserCode = localStorage.getItem('UserCode');
    } else {
      UserCode = localStorage.getItem('CustCode');
    }
    this._TicketService.GetTicketCount(this.FromDate, this.Todate,  UserCode,'Customer',  'Closed',this.search).subscribe((res: any) => {
      this.Closed = res;
      if (res == "" || res == null) {
        this.Closed = 0;
      }
    })
  }

  ngOnInit() {
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
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

    this.getAllTickets(1);
    this.getOpen();
    this.getClosed()
    this.getInProcess();
    this.getResolved()
  }
  getAllTickets(PageNo) {
    this._CustomerComponent.setLoading(true);
    this.pageNo = PageNo
    let UserCode;
    let UserTypetxt = localStorage.getItem('UserType');
    if (UserTypetxt == 'Customer') {
      UserCode = localStorage.getItem('UserCode');
    } else {
      UserCode = localStorage.getItem('CustCode');
    }
    this._TicketService.GetTicketList(this.FromDate, this.Todate, UserCode,'Customer', this.pageNo, this.TicketsPerPage,this.status,  this.search).subscribe((data: any) => {
      this.Tickets = data ;
      this._CustomerComponent.setLoading(false);
      this.getAllTicketsCount();
    },
    err => { 
      this._CustomerComponent.setLoading(false);
        console.log(err);
    })

  }
  getAllTicketsCount() {
    this._CustomerComponent.setLoading(true);
    let UserCode;
    let UserTypetxt = localStorage.getItem('UserType');
    if (UserTypetxt == 'Customer') {
      UserCode = localStorage.getItem('UserCode');
    } else {
      UserCode = localStorage.getItem('CustCode');
    }
    this._TicketService.GetTicketCount(this.FromDate, this.Todate, UserCode, 'Customer', this.status,this.search).subscribe((res: any) => {
      this.totalTicketsCount = res;
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

    this.paginationData = Number(this.totalTicketsCount / this.TicketsPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if (this.totalTicketsCount > this.TicketsPerPage) {
      this.pageField = this.paginationService.pageField;
    }
    else {
      this.pageField = [1];
    }
  }

  showTicketsByPageNumber(page, i) {
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllTickets(this.currentPage);
  }

  showPrevTickets() {
    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllTickets(this.currentPage);
    }

  }
  showNextTickets() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllTickets(this.currentPage);
    }
  }

  pass(value): void {
    this.storage.set('TicketId', value);
    this.router.navigateByUrl('/Customer/TicketView');
  }

  ChangeStatus(Value) {
    if (Value !== null && Value !== "") {
      this.status = Value;
    }
  }


}   
