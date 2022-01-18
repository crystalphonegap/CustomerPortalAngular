import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { UserService } from 'src/app/shared/user.service';

import * as fileSaver from 'file-saver';
import { DatePipe, formatDate } from '@angular/common';
import { AlertService } from 'src/app/component/alert.service';
import { UserComponent } from '../user.component';
import { AuthService } from 'src/app/auth/auth.service';
import { constStorage } from 'src/app/models/Storege';
import { ModalService } from 'src/app/component/ErrorHandler-Dialog-box';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  Errors: any = [];
  constructor(private modalService: ModalService, private _UserComponent: UserComponent, private _AuthService: AuthService, private alertService: AlertService, public datepipe: DatePipe, private service: UserService, private router: Router
    , public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService) {
  }
  userData;
  pageNo: any = 1;
  search = null;
  status = 'All';
  FromDate = null;
  Todate = null;
  PGIDONE;
  ErrorDelMessage: string;
  DELIVERYDONE;
  DelDate;
  pageNumber: boolean[] = [];
  sortOrder: any = 'CompanyName_ASC';
  order: any = 'CompanyName';
  Userid;
  User;
  pageField = [];
  exactPageList: any;
  paginationData: number;
  ErrorsPerPage: any = 10;
  orderBy: string = 'Asc';
  Todays;
  totalErrors: any;
  totalErrorsCount: any;
  currentPage = 1;
  UserCode;
  UserType;
  UserName;
  Year: string = (new Date()).getFullYear().toString();

  getYear() {
    this.service.GetYear().subscribe(
      data => {
        this.Year = data.toString();
      }
    );
  }
  loadedFromDate; LoadedToDate;
  SearchFilter;
  ngOnInit() {
    this.UserType = localStorage.getItem(constStorage.UserType);
    this.UserName = localStorage.getItem(constStorage.UserName);
    this.getYear();
    this.FromDate = new Date();
    this.FromDate.setDate(this.FromDate.getDate() - 10);
    this.FromDate = this.datepipe.transform(this.FromDate, 'dd-MM-yyyy');
    this.Todate = new Date();
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
    this.loadedFromDate = true;
    this.LoadedToDate = true;
    this.SearchFilter = new FormGroup({
      status: new FormControl('All', [Validators.required, Validators.maxLength(256)]),
      FromDate: new FormControl(this.FromDate, [Validators.required, Validators.maxLength(256)]),
      Todate: new FormControl(this.Todate, [Validators.required, Validators.maxLength(256)]),
      search: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    });
    let UserTypetxt = localStorage.getItem('UserType');
    if (UserTypetxt == 'Customer') {
      this.UserCode = localStorage.getItem('UserCode');
    } else {
      this.UserCode = localStorage.getItem('CustCode');
    }
    this.Search();
  }
  changeDateLoad(value) {
    if (value == 'From') {
      this.loadedFromDate = false
    }
    else if (value == 'To') {
      this.LoadedToDate = false
    }
  }
  ChangeFilter() {
    if (this.loadedFromDate == false) {
      this.FromDate = this.datepipe.transform(this.SearchFilter.controls['FromDate'].value._d, 'dd-MM-yyyy');
    }
    if (this.LoadedToDate == false) {
      this.Todate = this.datepipe.transform(this.SearchFilter.controls['Todate'].value._d, 'dd-MM-yyyy');
    }
    this.status = this.SearchFilter.controls['status'].value;
    this.search = this.SearchFilter.controls['search'].value;
    this.Search();
  }
  Delete() {
    this.openModal("custom-modal-1");
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  saveModal() {
    if(this.DelDate != null){
      this.service.DeleteLogs(this.DelDate).subscribe(
        (res: any) => {
          this.modalService.close('custom-modal-1');
          this.Search();
          this._UserComponent.setLoading(false);
          this.alertService.error(res +'Error Log Deleted');
        },
        err => {
          this._UserComponent.setLoading(false);
          if (err.status == 400)
            this.alertService.error('Error Order not Deleted.');
          else
            console.log(err);
          return
        }
      );
     
    
    }
  }

  closeModal() {
    this.DelDate = null;
    this.modalService.close('custom-modal-1');
  }

  updateDateValue(DateCount) {
    if (DateCount > -1 && DateCount < 999999) {
      this.DelDate = new Date();
      this.DelDate.setDate(this.DelDate.getDate() - DateCount);
      this.DelDate = this.datepipe.transform(this.DelDate, 'dd-MM-yyyy');
      this.ErrorDelMessage = " Error Log before " + this.DelDate + " will be Deleted";
    } else {
      this.DelDate = null;
      this.ErrorDelMessage = " Error Log can't be deleted based on Input";
    }

  }

  Search() {
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.getAllErrors(1);
    this.getTodays();
  }

  onDateChange(order, event) {
    let tempData = event.value._d
    order.OrderRecivedDate = this.datepipe.transform(tempData, 'MM-dd-yyyy');
  }

  getAllErrors(pageNo) {
    this.pageNo = pageNo;
    this._UserComponent.setLoading(true);
    this.service.getError(this.FromDate, this.Todate, this.pageNo, this.ErrorsPerPage, this.search).subscribe((data: any) => {
      this.Errors = data;
      this._UserComponent.setLoading(false);
      this.getAllErrorsCount();
    })
  }

  getAllErrorsCount() {
    this._UserComponent.setLoading(true);
    this.service.getErrorCount(this.FromDate, this.Todate, this.search).subscribe((res: any) => {
      this.totalErrorsCount = res[0].Id;
      this._UserComponent.setLoading(false);
      this.totalNoOfPages();
    })
  }

  getTodays() {
    this._UserComponent.setLoading(true);
    this.service.getErrorCount(this.FromDate, this.Todate, 'TodaysData').subscribe((res: any) => {
      this.Todays = res[0].Id;
      this._UserComponent.setLoading(false);
      if (res == "" || res == null) {
        this.DELIVERYDONE = 0;
      }
    })
  }

  //Method For Pagination  
  totalNoOfPages() {

    this.paginationData = Number(this.totalErrorsCount / this.ErrorsPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if (this.totalErrorsCount > this.ErrorsPerPage) {
      this.pageField = this.paginationService.pageField;
    }
    else {
      this.pageField = [1];
    }
  }

  showErrorsByPageNumber(page, i) {
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllErrors(this.currentPage);
  }

  showPrevErrors() {
    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllErrors(this.currentPage);
    }
  }

  showNextErrors() {
    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllErrors(this.currentPage);
    }
  }

  pass(value): void {
    this.storage.set('OrderId', value);
    this.router.navigateByUrl('/Customer/DispatchOrderDetailView');
  }

  onLogout() {
    this._AuthService.logout();
  }

}

