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
import { constStorage } from 'src/app/models/Storege';
import { SystemAdminComponent } from '../SystemAdmin.component';

@Component({
  selector: 'app-view-complaints',
  templateUrl: './view-complaints.component.html',
  styleUrls: ['./view-complaints.component.css']
})
export class SystemAdminViewComplaintsComponent implements OnInit {
  Tickets: any =[];
  constructor(public datepipe: DatePipe,  private _TicketService: TicketService, private service: UserService, private router: Router, private _CustomerService: CustomerService
    , private _SystemAdminComponent:SystemAdminComponent,public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService) {
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
  Indexing:number=1;
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
  
    this._SystemAdminComponent.setLoading(true);
    this._TicketService.GetTicketCount(this.FromDate, this.Todate, localStorage.getItem('UserCode'),localStorage.getItem('UserType'), 'Open',this.search).subscribe((res: any) => {
      this.Open = res;
      this._SystemAdminComponent.setLoading(false);
      if (res == "" || res == null) {
        this.Open = 0;
      }
    },
    err => { 
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })
  }

  getInProcess() {
   
    this._SystemAdminComponent.setLoading(true);
    this._TicketService.GetTicketCount(this.FromDate, this.Todate,localStorage.getItem('UserCode'),localStorage.getItem('UserType'), 'In-Process', this.search).subscribe((res: any) => {
      this.InProcess = res;
      this._SystemAdminComponent.setLoading(false);
      if (res == "" || res == null) {
        this.InProcess = 0;
      }
    },
    err => { 
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })
  }

  getResolved() {
    
    this._SystemAdminComponent.setLoading(true);
    this._TicketService.GetTicketCount(this.FromDate,this.Todate,localStorage.getItem('UserCode'),localStorage.getItem('UserType'), 'Resolved',this.search).subscribe((res: any) => {
      this.Resolved = res;
      this._SystemAdminComponent.setLoading(false);
      if (res == "" || res == null) {
        this.Resolved = 0;
      }
    },
    err => { 
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })
  }
  getClosed() {
    this._SystemAdminComponent.setLoading(true);
    this._TicketService.GetTicketCount(this.FromDate, this.Todate, localStorage.getItem('UserCode'),localStorage.getItem('UserType'), 'Close',this.search).subscribe((res: any) => {
      this.Closed = res;
      this._SystemAdminComponent.setLoading(false);
      if (res == "" || res == null) {
        this.Closed = 0;
      }
    },
    err => { 
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
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
    this._SystemAdminComponent.setLoading(true);
    this.pageNo = PageNo
    this.Indexing=PageNo-1;
    this.Indexing=this.Indexing*10;
    this._TicketService.GetTicketList(this.FromDate, this.Todate, localStorage.getItem('UserCode'),localStorage.getItem('UserType'), this.pageNo, this.TicketsPerPage,this.status,  this.search).subscribe((data: any) => {
      this.Tickets = data ;
      this._SystemAdminComponent.setLoading(false);
      this.getAllTicketsCount();
    },
    err => { 
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })

  }
  getAllTicketsCount() {
    this._SystemAdminComponent.setLoading(true);
   
    this._TicketService.GetTicketCount(this.FromDate, this.Todate,localStorage.getItem('UserCode'),localStorage.getItem('UserType'),this.status,this.search).subscribe((res: any) => {
      this.totalTicketsCount = res;
      this._SystemAdminComponent.setLoading(false);
      this.totalNoOfPages();
    },
    err => { 
      this._SystemAdminComponent.setLoading(false);
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

  pass(value,status,Edit): void {
    this.storage.set('TicketId', value);
    this.router.navigateByUrl('/SystemAdmin/OpenTicketsView');
    
  }

  ChangeStatus(Value) {
    if (Value !== null && Value !== "") {
      this.status = Value;
    }
  }

  

  download() {
    this._SystemAdminComponent.setLoading(true);
    this._TicketService.DownloadTicketHeaderListForEmp(this.FromDate,this.Todate,localStorage.getItem(constStorage.UserCode),localStorage.getItem(constStorage.UserType),this.status, this.search).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
      this._SystemAdminComponent.setLoading(false);
			fileSaver.saveAs(blob, 'TicketList.xlsx');
		},
    err => { 
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })
  }



}   

