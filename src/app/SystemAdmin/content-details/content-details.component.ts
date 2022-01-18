import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import * as fileSaver from 'file-saver';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { DatePipe } from '@angular/common';
import { ContentService } from 'src/app/shared/ContentService';


@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.css']
})
export class SystemAdminContentDetailsComponent implements OnInit {

  Content: any=[];
  constructor(public datepipe: DatePipe, private _ContentService: ContentService, private router: Router
    , public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService) {
    this.FromDate = new Date();
    this.FromDate.setDate(this.FromDate.getDate() - 10);
    this.FromDate = this.datepipe.transform(this.FromDate, 'dd-MM-yyyy');
    this.Todate = new Date();
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
  }
  userData;
  pageNo: any = 1;
Indexing :number=1;
  search = null;
  FromDate = null;
  Status = 'All';
  Todate = null;
  pageNumber: boolean[] = [];
  sortContent: any = 'CompanyName_ASC';
  //Pagination Variables  
  //Page Row variables  

  pageField = [];
  exactPageList: any;
  paginationData: number;
  ContentPerPage: any = 10;
  ContentBy: string = 'Asc';

  totalContent: any;
  totalContentCount: any;
  currentPage = 1;

  ngOnInit() {
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.getAllContent(1);
    this.currentPage=1;
  }

  getAllContent(pageNo) {
    this.pageNo=pageNo;
    this.Indexing=pageNo-1;
    this.Indexing=this.Indexing*10;
    this._ContentService.GetContentList(this.pageNo, this.ContentPerPage, this.search).subscribe((data: any) => {
      this.Content = data ;
      this.getAllContentsCount();
    })

  }
  getAllContentsCount() {
  
    this._ContentService.GetContentListCount(this.search).subscribe((res: any) => {
      this.totalContentCount = res;
      this.totalNoOfPages();
    })
  }

  //Method For Pagination  
  totalNoOfPages() {

    this.paginationData = Number(this.totalContentCount / this.ContentPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if (this.totalContentCount > this.ContentPerPage) {
      this.pageField = this.paginationService.pageField;
    }
    else {
      this.pageField = [1];
    }


  }
  showContentByPageNumber(page, i) {
    this.Content = [];
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllContent( this.currentPage);
  }

  //Pagination Start  

  showPrevContent() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllContent( this.currentPage);
    }

  }

  showNextContent() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllContent( this.currentPage);
    }
  }
  sortByHeading(value: string, id) {
    this.Content = [];
    this.sortContent = value;
    if (this.ContentBy == "Desc") {
      this.ContentBy = "Asc"
      this.sortContent = this.sortContent + '_ASC';
    } else {
      this.ContentBy = "Desc";
      this.sortContent = this.sortContent + '_DESC'
    }
    this.getAllContent( this.currentPage);
  }
  pass(value): void {
    this.storage.set('ContentId', value);
    this.router.navigateByUrl('/SystemAdmin/CreateContent');
  }

  ChangeStatus(Value) {
    if (Value !== null && Value !== "") {
      this.Status = Value;
    }
  }

  AddContent() {
    this.storage.remove('ContentId');

    this.router.navigateByUrl('/SystemAdmin/CreateContent');
  }

}   
