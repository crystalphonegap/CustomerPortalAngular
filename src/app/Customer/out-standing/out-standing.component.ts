import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CustomerService } from 'src/app/shared/CustomerService';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { UserService } from 'src/app/shared/user.service';
import { CustomerFloatDataComponent } from '../customer-float-data/customer-float-data.component';
import { OutStandingService } from 'src/app/shared/OutStandingService';

@Component({
  selector: 'app-out-standing',
  templateUrl: './out-standing.component.html',
  styleUrls: ['./out-standing.component.css']
})
export class CustomerOutStandingComponent implements OnInit {
  DetailData: any=[];
  constructor(private _OutStandingService: OutStandingService, private service: UserService, private router: Router, private _CustomerService: CustomerService
    , public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  userData;
  pageNo: any = 1;
  search = null;
  status = 'All';
  FromDate = null;
  Todate = null;
  pageNumber: boolean[] = [];
  sortOrder: any = 'CompanyName_ASC';
  order: any = 'CompanyName';
  
  Userid;
  User;
  pageField = [];
  exactPageList: any;
  paginationData: number;
  DetailDataPerPage: any = 10;
  orderBy: string = 'Asc';

  totalDetailData: any;
  totalDetailDataCount: any;
  currentPage = 1;



  ngOnInit() {
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.getAllDetailData();
  }


  getAllDetailData() {
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this._OutStandingService.getAllDataData(this.FromDate,this.Todate,this.status,UserCode, this.pageNo, this.DetailDataPerPage, this.search).subscribe((data: any) => {
      this.DetailData = data ;
      this.getAllDetailDataCount();
    })
  }
  getAllDetailDataCount() {
    let UserCode;
    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      UserCode= localStorage.getItem('UserCode');
    }else{
      UserCode=localStorage.getItem('CustCode');
    }
    this._OutStandingService.getAllDataCount(this.FromDate,this.Todate,this.status,UserCode, this.search).subscribe((res: any) => {
      this.totalDetailDataCount = res;
      this.totalNoOfPages();
    })
  }

  //Method For Pagination  
  totalNoOfPages() {

    this.paginationData = Number(this.totalDetailDataCount / this.DetailDataPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if(this.totalDetailDataCount > this.DetailDataPerPage){
      this.pageField = this.paginationService.pageField;
    }
    else{
      this.pageField = [1];
    }
   

  }
  showDetailDataByPageNumber(page, i) {
    this.DetailData = [];
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllDetailData();
  }

  //Pagination Start  

  showPrevDetailData() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllDetailData();
    }

  }

  showNextDetailData() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllDetailData();
    }
  }
  sortByHeading(value: string, id) {
    this.DetailData = [];
    this.sortOrder = value;
    this.order = value;
    if (this.orderBy == "Desc") {
      this.orderBy = "Asc"
      this.sortOrder = this.sortOrder + '_ASC';
    } else {
      this.orderBy = "Desc";
      this.sortOrder = this.sortOrder + '_DESC'
    }
    this.getAllDetailData();
  }

  pass(value): void {
    this.storage.set('OrderId', value);
    this.router.navigateByUrl('/Customer/DispatchOrderDetailView');
  }

  
  ChangeStatus(Value) {
    if (Value !== null && Value !== "") {
     this.status=Value;
    }
  }

}   
