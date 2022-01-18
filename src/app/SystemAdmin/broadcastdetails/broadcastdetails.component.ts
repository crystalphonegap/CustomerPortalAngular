import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import * as fileSaver from 'file-saver';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { BroadCastServce } from 'src/app/shared/BroadCastServce';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-broadcastdetails',
  templateUrl: './broadcastdetails.component.html',
  styleUrls: ['./broadcastdetails.component.css']
})
export class SystemAdminBroadcastdetailsComponent implements OnInit {
  BroadCast: any=[];
  constructor(public datepipe: DatePipe, private _BroadCastServce: BroadCastServce, private router: Router
    , public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService) {
    this.FromDate = new Date();
    this.FromDate.setDate(this.FromDate.getDate() - 10);
    this.FromDate = this.datepipe.transform(this.FromDate, 'dd-MM-yyyy');
    this.Todate = new Date();
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
  }
  userData;
  pageNo: any = 1;
  Indexing  :number=1;
  search = null;
  FromDate = null;
  Status = 'All';
  Todate = null;
  pageNumber: boolean[] = [];
  sortBroadCast: any = 'CompanyName_ASC';
  pageField = [];
  exactPageList: any;
  paginationData: number;
  BroadCastPerPage: any = 10;
  BroadCastBy: string = 'Asc';

  totalBroadCast: any;
  totalBroadCastCount: any;
  currentPage = 1;

  ngOnInit() {
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.getAllBroadCast(1);
    this.currentPage=1;
  }

  getAllBroadCast(pageNo) {
    this.pageNo=pageNo;
    this.Indexing=pageNo-1;
    this.Indexing=this.Indexing*10;
    this._BroadCastServce.GetBroadCastList(this.pageNo, this.BroadCastPerPage, this.search).subscribe((data: any) => {
      this.BroadCast = data ;
      this.getAllBroadCastsCount();
    })

  }
  getAllBroadCastsCount() {
  
    this._BroadCastServce.GetBroadCastListCount(this.search).subscribe((res: any) => {
      this.totalBroadCastCount = res;
      this.totalNoOfPages();
    })
  }

  //Method For Pagination  
  totalNoOfPages() {

    this.paginationData = Number(this.totalBroadCastCount / this.BroadCastPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if (this.totalBroadCastCount > this.BroadCastPerPage) {
      this.pageField = this.paginationService.pageField;
    }
    else {
      this.pageField = [1];
    }


  }
  showBroadCastByPageNumber(page, i) {
    this.BroadCast = [];
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllBroadCast(this.currentPage);
  }

  //Pagination Start  

  showPrevBroadCast() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllBroadCast(this.currentPage);
    }

  }

  showNextBroadCast() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllBroadCast(this.currentPage);
    }
  }
  sortByHeading(value: string, id) {
    this.BroadCast = [];
    this.sortBroadCast = value;
    if (this.BroadCastBy == "Desc") {
      this.BroadCastBy = "Asc"
      this.sortBroadCast = this.sortBroadCast + '_ASC';
    } else {
      this.BroadCastBy = "Desc";
      this.sortBroadCast = this.sortBroadCast + '_DESC'
    }
    this.getAllBroadCast(this.currentPage);
  }
  pass(value): void {
    this.storage.set('BroadCastId', value);
    this.router.navigateByUrl('/SystemAdmin/CreateBroadCast');
  }

  ChangeStatus(Value) {
    if (Value !== null && Value !== "") {
      this.Status = Value;
    }
  }

  AddBroadCast() {
    this.storage.remove('BroadCastId');

    this.router.navigateByUrl('/SystemAdmin/CreateBroadCast');
  }

}   
