import { Component, OnInit } from '@angular/core';
import { SystemAdminService } from '../../shared/SystemAdminService';
import { Router } from '@angular/router';
import * as fileSaver from 'file-saver';
import { PaginationService } from '../../component/pagination/pagination.service';
import { CustomerService } from 'src/app/shared/CustomerService';
import { UserService } from 'src/app/shared/user.service';
import { AlertService } from 'src/app/component/alert.service';
import { SalesPromoterTargetData } from 'src/app/shared/SalesPromoterTargetData';
@Component({
  selector: 'app-dealer-appoint-list',
  templateUrl: './dealer-appoint-list.component.html',
  styleUrls: ['./dealer-appoint-list.component.css']
})
export class SystemAdminDealerAppointListComponent implements OnInit {
  Customers: any=[];
  constructor(private alertService: AlertService, private _UserService: UserService, private router: Router, private _SalesPromoterTargetData: SalesPromoterTargetData
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
  Keyword;
  small = 10;
  medium = 10;
  large = 10;

  pageField = [];
  exactPageList: any;
  paginationData: number;
  CustomersPerPage: any = 10;
  orderBy: string = 'Asc';

  totalCustomers: any;
  totalCustomersCount: any;
  currentPage = 1;

  Active = 0;
  InActive = 0;
  Registered = 0;
  NotRegistered = 0;
  ngOnInit() {
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.currentPage=1;
    this.getAllCustomers(1);
  }
  getAllCustomers(pageNo) {
    this.pageNo=pageNo;
    this.Indexing=pageNo-1;
    this.Indexing=this.Indexing*10;
    this._SalesPromoterTargetData.SalesPromoterTargetData(this.pageNo, this.CustomersPerPage, this.Keyword).subscribe((data: any) => {
      this.Customers = data ;
      this.getAllCustomersCount();
    })

  }
  getAllCustomersCount() {
    this._SalesPromoterTargetData.SalesPromoterTargetDataCount(this.Keyword).subscribe((data: any) => {
      this.totalCustomersCount = data;
      this.totalNoOfPages();
    })

  }
  showCustomersByPageNumber(page, i) {
    this.Customers = [];
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllCustomers(this.currentPage );
  }

  //Pagination Start

  showPrevCustomers() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllCustomers(this.currentPage );
    }

  }

  showNextCustomers() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllCustomers(this.currentPage );
    }
  }
  sortByHeading(value: string, id) {
    this.Customers = [];
    this.sortOrder = value;
    this.order = value;
    if (this.orderBy == "Desc") {
      this.orderBy = "Asc"
      this.sortOrder = this.sortOrder + '_ASC';
    } else {
      this.orderBy = "Desc";
      this.sortOrder = this.sortOrder + '_DESC'
    }
    this.getAllCustomers(this.currentPage );
  }






  //Method For Pagination
  totalNoOfPages() {

    this.paginationData = Number(this.totalCustomersCount / this.CustomersPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if (this.totalCustomersCount > this.CustomersPerPage) {
      this.pageField = this.paginationService.pageField;
    }
    else {
      this.pageField = [1];
    }


  }



  ChangeStatus(Value) {
    if (Value !== null && Value !== "") {
      this.Status = Value;
    }
  }

  Add(){
    this.router.navigateByUrl('/SystemAdmin/DealerAppointUpload');
}
}
