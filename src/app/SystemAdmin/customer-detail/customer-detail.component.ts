import { Component, OnInit } from '@angular/core';
import { SystemAdminService } from '../../shared/SystemAdminService';
import { Router } from '@angular/router';
import * as fileSaver from 'file-saver';
import { PaginationService } from '../../component/pagination/pagination.service';
import { CustomerService } from 'src/app/shared/CustomerService';
import { UserService } from 'src/app/shared/user.service';
import { AlertService } from 'src/app/component/alert.service';
import { SystemAdminComponent } from '../SystemAdmin.component';
import { constStorage } from 'src/app/models/Storege';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class SystemAdminCustomerDetailComponent implements OnInit {
  Customers: any=[];
constructor(private _SystemAdminComponent:SystemAdminComponent,private alertService: AlertService, private _UserService: UserService, private router: Router, private _CustomerService: CustomerService
    , public paginationService: PaginationService) { }

  pageNo: any = 1;
  Indexing  :number=1;
  pageNumber: boolean[] = [];
  sortOrder: any = 'CompanyName_ASC';
  order: any = 'CompanyName';
  //Pagination Variables
  //Page Row variables
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
    this.getAllCustomers(1);
    this.currentPage=1;
    this.getAllActiveCustomersCount();
    this.getAllInActiveCustomersCount();
    this.getAllRegisteredCustomersCount();
    this.getAllNotRegisteredCustomersCount();
  }

  getAllActiveCustomersCount() {
    this._SystemAdminComponent.setLoading(true);
    this._CustomerService.GetAllCustomersforSystemAdminSearchCount('Active', localStorage.getItem('Division'), this.Keyword).subscribe((res: any) => {
      this.Active = res;
      this._SystemAdminComponent.setLoading(false);
    },
    err => {
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })
  }
  getAllInActiveCustomersCount() {
    this._SystemAdminComponent.setLoading(true);
    this._CustomerService.GetAllCustomersforSystemAdminSearchCount('InActive', localStorage.getItem('Division'), this.Keyword).subscribe((res: any) => {
      this.InActive = res;
      this._SystemAdminComponent.setLoading(false);
    },
    err => {
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })
  }
  getAllRegisteredCustomersCount() {
    this._SystemAdminComponent.setLoading(true);
    this._CustomerService.GetAllCustomersforSystemAdminSearchCount('Registered', localStorage.getItem('Division'), this.Keyword).subscribe((res: any) => {
      this.Registered = res;
      this._SystemAdminComponent.setLoading(false);
    },
    err => {
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })
  }
  getAllNotRegisteredCustomersCount() {
    this._SystemAdminComponent.setLoading(true);
    this._CustomerService.GetAllCustomersforSystemAdminSearchCount('NotRegistered', localStorage.getItem('Division'), this.Keyword).subscribe((res: any) => {
      this.NotRegistered = res;
      this._SystemAdminComponent.setLoading(false);
    },
    err => {
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })
  }
  getAllCustomers(pageNo) {
    this.pageNo=pageNo;
    this.Indexing=pageNo-1;
    this.Indexing=this.Indexing*10;
    this.getAllCustomersCount();

    this._SystemAdminComponent.setLoading(true);
    this._CustomerService.GetAllCustomersforSystemAdminSearch(this.pageNo, this.CustomersPerPage, this.Status, localStorage.getItem('Division'), this.Keyword).subscribe((data: any) => {
      this.Customers = data ;
      this._SystemAdminComponent.setLoading(false);
    },
    err => {
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })

  }
  getAllCustomersCount() {
    this._SystemAdminComponent.setLoading(true);
    this._CustomerService.GetAllCustomersforSystemAdminSearchCount(this.Status, localStorage.getItem('Division'), this.Keyword).subscribe((res: any) => {
      this.totalCustomersCount = res;
      this._SystemAdminComponent.setLoading(false);
      this.totalNoOfPages();
      this._SystemAdminComponent.setLoading(false);
    },
    err => {
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })
  }

  showCustomersByPageNumber(page, i) {
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllCustomers(this.currentPage);
  }

  //Pagination Start

  showPrevCustomers() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllCustomers(this.currentPage);
    }

  }

  showNextCustomers() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllCustomers(this.currentPage);
    }
  }
  sortByHeading(value: string, id) {
    this.sortOrder = value;
    this.order = value;
    if (this.orderBy == "Desc") {
      this.orderBy = "Asc"
      this.sortOrder = this.sortOrder + '_ASC';
    } else {
      this.orderBy = "Desc";
      this.sortOrder = this.sortOrder + '_DESC'
    }
    this.getAllCustomers(this.currentPage);
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

  changedStatus(Customer,event) {
    if (Customer.Statusbit == true) {

      let UserMaster = {
        CustCodevtxt:Customer.CustCodevtxt,
        IsActivebit:event.checked,
        Modifiertxt: localStorage.getItem(constStorage.UserCode)
      };
      this._CustomerService.ChangeUserStatus(UserMaster).subscribe(
        (res: any) => {
          this.ngOnInit();
           this.alertService.success('Customer Status Changed');
        },
        err => {
           if (err.status == 400)
             this.alertService.error('Error Occourd.');
           else
            console.log(err);
        }
      );


    } else {
      this.alertService.error('User not register');
    }

  }
  download() {
    this._SystemAdminComponent.setLoading(true);
    this._CustomerService.ExportToExcelForSystemAdmin(this.Status, localStorage.getItem('Division'), this.Keyword).subscribe(response => {
      let blob: any = new Blob([response], { type: 'text/json; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      this._SystemAdminComponent.setLoading(false);
      fileSaver.saveAs(blob, 'Excel.xlsx');
    },
    err => {
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })
  }

  download1() {
    this._SystemAdminComponent.setLoading(true);
    this._CustomerService.ExportToExcelForSystemAdmin(this.Status, localStorage.getItem('Division'), this.Keyword).subscribe(response => {
      let blob: any = new Blob([response], { type: 'text/json; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      this._SystemAdminComponent.setLoading(false);
      fileSaver.saveAs(blob, 'Customer.xlsx');
    },
    err => {
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })
  }

}
