import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { SystemAdminService } from '../../shared/SystemAdminService';
import { PaginationService } from '../../component/pagination/pagination.service';
import * as fileSaver from 'file-saver';
import { SystemAdminComponent } from '../SystemAdmin.component';

@Component({
  selector: 'app-target-sales-list',
  templateUrl: './target-sales-list.component.html',
  styleUrls: ['./target-sales-list.component.css']
})
export class SystemAdminTargetSalesListComponent implements OnInit {
  TargetSales: any=[];
  constructor(private router: Router, private _SystemAdminService: SystemAdminService
    ,private _SystemAdminComponent:SystemAdminComponent, public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  pageNo: any = 1;
  Indexing:number=1;
  search = null;
  pageNumber: boolean[] = [];
  sortOrder: any = 'CompanyName_ASC';
  order:any='CompanyName';
  //Pagination Variables
  //Page Row variables
  smallPageRow: boolean = true;
  mediumPageRow: boolean = false;
  largePageRow: boolean = false;

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
    this.getAllTargetSales(1);
    this.currentPage =1;
  }
  getAllTargetSales(pageNo) {
    this._SystemAdminComponent.setLoading(true);
    this.pageNo=pageNo
    this.Indexing=pageNo-1;
    this.Indexing=this.Indexing*10;
       this._SystemAdminService.GetAllTargetSalesExcelData(localStorage.getItem('Division'),this.pageNo, this.CustomersPerPage,this.search).subscribe((data: any) => {
      this.TargetSales = data ;
      this._SystemAdminComponent.setLoading(false);
      this.getAllTargetSalescount();
    },
    err => {
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })

  }
  Add(){
    this.router.navigateByUrl('/SystemAdmin/TargetSales');
}
  getAllTargetSalescount() {
    this._SystemAdminComponent.setLoading(true);
    this._SystemAdminService.getTargetSalesExcelDataCount(localStorage.getItem('Division'),this.search).subscribe((res: any) => {
      this.totalCustomersCount = res;
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
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage =page;
    this.getAllTargetSales(this.currentPage );
  }

  //Pagination Start

  showPrevCustomers() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllTargetSales(this.currentPage );
    }

  }

  showNextCustomers() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllTargetSales(this.currentPage );
    }
  }
  sortByHeading(value: string, id) {
    this.TargetSales = [];
    this.sortOrder = value;
    this.order =value;
    if (this.orderBy == "Desc") {
      this.orderBy = "Asc"
      this.sortOrder =this.sortOrder+'_ASC';
    } else {
      this.orderBy = "Desc";
      this.sortOrder =this.sortOrder+'_DESC'
    }
    this.getAllTargetSales(this.currentPage );
  }
  download() {
    this._SystemAdminComponent.setLoading(true);
    this._SystemAdminService.DownloadTargetSalesExcelData(localStorage.getItem('Division'),this.search).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
      this._SystemAdminComponent.setLoading(false);
			fileSaver.saveAs(blob, 'TargetSales.xlsx');
		},
    err => {
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })
  }

}
