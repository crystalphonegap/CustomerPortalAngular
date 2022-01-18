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
import { EmpComponent } from '../Emp.component';

@Component({
  selector: 'app-ticket-mis-list-for-category',
  templateUrl: './ticket-mis-list-for-category.component.html',
  styleUrls: ['./ticket-mis-list-for-category.component.css']
})
export class TicketMisListForCategoryComponent implements OnInit {
  Tickets: any =[];
  constructor(public datepipe: DatePipe,  private _TicketService: TicketService, private service: UserService, private router: Router, private _CustomerService: CustomerService
    , public paginationService: PaginationService,
    private _EmpComponent : EmpComponent , @Inject(SESSION_STORAGE) private storage: WebStorageService) {
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
  Indexing: any = 1;
  search = null;
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
  Posted;
  Priority:string;
  Type:string;
  Category:string
  From:number;
  To:number;
  Submitted;
  MISDATA:any=[];
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
    this.search=this.SearchFilter.controls['search'].value;
    this.Search();
  }

  ngOnInit() {
     this.MISDATA= this.storage.get("MIS");
     this.Priority=this.MISDATA.Priority;
     this.Type=this.MISDATA.Type;
     this.Category=this.MISDATA.Category;
     this.Type=this.MISDATA.Type;
     this.From=this.MISDATA.From;
     this.To=this.MISDATA.To;
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.loadedFromDate=true;
    this.LoadedToDate=true;
    this.SearchFilter = new FormGroup({
      FromDate: new FormControl( this.FromDate, [Validators.required, Validators.maxLength(256)]),
      Todate: new FormControl( this.Todate , [Validators.required, Validators.maxLength(256)]),
      search: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    });
    this.Search();

  }
  Search(){

    this.getAllTickets(1);
  }
  getAllTickets(PageNo) {
    this._EmpComponent.setLoading(true);
    this.pageNo = PageNo
    this.Indexing=PageNo-1;
    this.Indexing=this.Indexing*10;
    this._TicketService.getTicketMISListByCategory(localStorage.getItem('UserCode'),localStorage.getItem('UserType'),
    this.Priority,this.Type,this.Category,this.From,this.To,
    this.pageNo, this.TicketsPerPage, this.search).subscribe((data: any) => {
      this.Tickets = data ;
      this._EmpComponent.setLoading(false);
      this.getAllTicketsCount();
    },
    err => { 
      this._EmpComponent.setLoading(false);
        console.log(err);
    })

  }
  getAllTicketsCount() {
   
    this._EmpComponent.setLoading(true);
    this._TicketService.getTicketMISListCountByCategory(localStorage.getItem('UserCode'),localStorage.getItem('UserType')
    ,this.Priority,this.Type,this.Category,this.From,this.To,this.search).subscribe((res: any) => {
      this.totalTicketsCount = res;
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
    if(Edit == 0){
        if(status=='Open' ||status=='In-Process'  )
      this.router.navigateByUrl('/Emp/MisReportViewOpenTicketByCategory');
      else{
        this.router.navigateByUrl('/Emp/MisReportViewCloseTicketByCategory');
      }
    }
    else{
      this.router.navigateByUrl('/Emp/MisReportViewCloseTicketByCategory');
    }
  }



  download() {
    this._EmpComponent.setLoading(true);
    this._TicketService.DownloadMISReportCategoryWiseMIS(localStorage.getItem('UserCode'),localStorage.getItem('UserType')
   ,this.Priority,this.Type,this.Category,this.From,this.To,this.search).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
      this._EmpComponent.setLoading(false);
			fileSaver.saveAs(blob, 'TicketMISReportCategoryWiseList.xlsx');
    },
    err => {
      this._EmpComponent.setLoading(false);
      console.log(err);
    })
  }



}   

