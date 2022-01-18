import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { SystemAdminService } from '../../shared/SystemAdminService';
import { PaginationService } from '../../component/pagination/pagination.service';
import * as fileSaver from 'file-saver';
import { CustomerService } from 'src/app/shared/CustomerService';
import { constStorage } from 'src/app/models/Storege';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class EmpCustomerListComponent implements OnInit {
  SalesHeirachyList: any=[];
  constructor(private router: Router, private _SystemAdminService: SystemAdminService, private _CustomerService: CustomerService
    , public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  pageNo: any = 1;
  search = null;
  pageNumber: boolean[] = [];
  sortOrder: any = 'CompanyName_ASC';
  order:any='CompanyName';
  smallPageRow: boolean = true;
  mediumPageRow: boolean = false;
  largePageRow: boolean = false;
  Customers:any=[];
  small = 10;
  medium = 10;
  large =10;

  pageField = [];
  exactPageList: any;
  paginationData: number;
  CustomersPerPage: any = 10;
  orderBy: string='Asc';

  totalCustomers: any;
  totalCustomersCount: any;
  currentPage = 1;

  ngOnInit() {
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.getAllCustomers('','');
  }

  getAllCustomers(type, page) {
    if(type=='change'){
      this.pageNo=page;
    }
    this._CustomerService.getAllCustomerDataByUserTypeWiseSearch(localStorage.getItem(constStorage.UserCode),localStorage.getItem(constStorage.UserType), this.pageNo, this.CustomersPerPage, this.search,true,true).subscribe((data: any) => {
      this.Customers = data ;
     this.getAllCustomersCount();
    })
  }

  getAllCustomersCount() {
    this._CustomerService.getAllCustomerDataByUserTypeWiseSearchCount(localStorage.getItem(constStorage.UserCode),localStorage.getItem(constStorage.UserType), this.search,true,true).subscribe((res: any) => {
      this.totalCustomersCount = res;
      this.totalNoOfPages();
    })
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
    this.pageField = this.paginationService.pageField;

  }
  showCustomersByPageNumber(page, i) {
    this.SalesHeirachyList = [];
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage =page;
    this.getAllCustomers('change',this.currentPage);
  }

  //Pagination Start

  showPrevCustomers() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllCustomers('change',this.currentPage);
    }

  }

  showNextCustomers() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllCustomers('change',this.currentPage);
    }
  }
  sortByHeading(value: string, id) {
    this.SalesHeirachyList = [];
    this.sortOrder = value;
    this.order =value;
    if (this.orderBy == "Desc") {
      this.orderBy = "Asc"
      this.sortOrder =this.sortOrder+'_ASC';
    } else {
      this.orderBy = "Desc";
      this.sortOrder =this.sortOrder+'_DESC'
    }
    this.getAllCustomers('change',this.currentPage);
  }

  openProfile(CustCode){
    localStorage.setItem('CustCode',CustCode);
    this.router.navigateByUrl('/Emp/CustomerProfile');

  }

  pass(User){
    localStorage.setItem('CustID',User.Idbint);
    localStorage.setItem('CustCode',User.CustCodevtxt);
    // this.router.navigateByUrl('/Customer/dashboard');
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/Customer/dashboard'])
    );

    window.open(url, '_blank');
  }

}
