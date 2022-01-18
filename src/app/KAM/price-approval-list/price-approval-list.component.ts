import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CustomerService } from 'src/app/shared/CustomerService';
import * as fileSaver from 'file-saver';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { UserService } from 'src/app/shared/user.service';
import { PriceApprovalService } from 'src/app/shared/PriceApprovalService';
import { DatePipe } from '@angular/common';
import { KAMComponent } from '../KAM.component';

@Component({
  selector: 'app-price-approval-list',
  templateUrl: './price-approval-list.component.html',
  styleUrls: ['./price-approval-list.component.css']
})
export class PriceApprovalListComponent implements OnInit {
  PriceApprovalList: any =[];
  constructor(public datepipe: DatePipe, private _PriceApprovalService: PriceApprovalService, 
    private _KAMComponent:KAMComponent,private service: UserService, private router: Router, private _CustomerService: CustomerService
    , public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  pageNo: any = 1;
  search = null;
  status = 'All';
  pageNumber: boolean[] = [];
  sortOrder: any = 'DocNovtxt';
  order: any = 'DocNovtxt';

  SearchFilter;
  pageField = [];
  exactPageList: any;
  paginationData: number;
  OrdersPerPage: any = 10;
  orderBy: string = 'Asc';

  totalPriceApprovals: any;
  totalPriceApprovalsCount: any;
  currentPage = 1;

  Posted;
  Submitted;
  ChangeFilter(){
    this.status=this.SearchFilter.controls['status'].value;
    this.search=this.SearchFilter.controls['search'].value;
    this.Search();
  }
  ngOnInit(): void {
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.SearchFilter = new FormGroup({
      status: new FormControl('All', [Validators.required, Validators.maxLength(256)]),
      search: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    });
    this.Search();
  }
  

  
  Search(){
    this.getAllOrders(1);
  }
  getAllOrders(PageNo) {
    this._KAMComponent.setLoading(true);
    this.pageNo = PageNo
    let UserCode;
    let UserTypetxt = localStorage.getItem('UserType');
      UserCode = localStorage.getItem('UserCode');
    this._PriceApprovalService.GetPriceApprovalDetails(this.status, UserCode, this.pageNo, this.OrdersPerPage, this.search).subscribe((data: any) => {
      this.PriceApprovalList = data ;
      this._KAMComponent.setLoading(false);
      this.getAllOrdersCount();
    },
    err => { 
      this._KAMComponent.setLoading(false);
        console.log(err);
    })

  }
  getAllOrdersCount() {
    this._KAMComponent.setLoading(true);
    let UserCode;
      UserCode = localStorage.getItem('UserCode');
    this._PriceApprovalService.getPriceApprovalCount(this.status, UserCode, this.search).subscribe((res: any) => {
      this.totalPriceApprovalsCount = res;
      this._KAMComponent.setLoading(false);
      this.totalNoOfPages();
    },
    err => { 
      this._KAMComponent.setLoading(false);
        console.log(err);
    })
  }

  //Method For Pagination  
  totalNoOfPages() {

    this.paginationData = Number(this.totalPriceApprovalsCount / this.OrdersPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if (this.totalPriceApprovalsCount > this.OrdersPerPage) {
      this.pageField = this.paginationService.pageField;
    }
    else {
      this.pageField = [1];
    }
  }

  showOrdersByPageNumber(page, i) {
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllOrders(this.currentPage);
  }

  showPrevOrders() {
    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllOrders(this.currentPage);
    }

  }
  showNextOrders() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllOrders(this.currentPage);
    }
  }

  pass(value): void {
    this.storage.set('PriceApprovalid', value);
    this.router.navigateByUrl('/KAM/PriceApprovalView');
  }

  ChangeStatus(Value) {
    if (Value !== null && Value !== "") {
      this.status = Value;
    }
  }

  download() {
    this._KAMComponent.setLoading(true);
    let UserCode;
    UserCode = localStorage.getItem('UserCode');
    this._PriceApprovalService.downloadFile(this.status, UserCode, this.search).subscribe(response => {
      let blob: any = new Blob([response], { type: 'text/json; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      this._KAMComponent.setLoading(false);
      fileSaver.saveAs(blob, 'PriceApprovalList.xlsx');
    },
    err => { 
      this._KAMComponent.setLoading(false);
        console.log(err);
    })
  }

}
