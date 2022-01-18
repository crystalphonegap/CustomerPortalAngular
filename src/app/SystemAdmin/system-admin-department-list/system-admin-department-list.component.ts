import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import * as fileSaver from 'file-saver';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { DatePipe } from '@angular/common';
import { constStorage } from 'src/app/models/Storege';
import { DepartmentService } from 'src/app/shared/DepartmentService';


@Component({
  selector: 'app-system-admin-department-list',
  templateUrl: './system-admin-department-list.component.html',
  styleUrls: ['./system-admin-department-list.component.css']
})
export class SystemAdminDepartmentListComponent implements OnInit {
  Departments: any = [];
  constructor(public datepipe: DatePipe, private router: Router
    , private _DepartmentService: DepartmentService, public paginationService: PaginationService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  pageNo: any = 1;
  Indexing:number=1;
  search = null;
  status = 'All';
  Draft;
  pageNumber: boolean[] = [];
  sortOrder: any = 'CompanyName_ASC';
  order: any = 'CompanyName';
  pageField = [];
  exactPageList: any;
  paginationData: number;
  DepartmentsPerPage: any = 10;
  orderBy: string = 'Asc';

  totalDepartments: any;
  totalDepartmentsCount: any;
  currentPage = 1;
  SearchFilter;
  ChangeFilter() {
    this.search = this.SearchFilter.controls['search'].value;
    this.Search();
  }
  ngOnInit() {

    this.SearchFilter = new FormGroup({
      search: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    });
    this.Search();

  }
  Search() {
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.getAllDepartments(1);
  }


  getAllDepartments(pageno) {
    this.pageNo = pageno
    this.Indexing=pageno-1;
    this.Indexing=this.Indexing*10;
    this._DepartmentService.GetDepartmentList(this.pageNo, this.DepartmentsPerPage, this.search).subscribe((data: any) => {
      this.Departments = data;
      // this.getAllDepartmentsCount();
    })

  }
  getAllDepartmentsCount() {
    this._DepartmentService.GetDepartmentListCount(this.search).subscribe((res: any) => {
      this.totalDepartmentsCount = res;
      this.totalNoOfPages();
    })
  }
  totalNoOfPages() {

    this.paginationData = Number(this.totalDepartmentsCount / this.DepartmentsPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if (this.totalDepartmentsCount > this.DepartmentsPerPage) {
      this.pageField = this.paginationService.pageField;
    }
    else {
      this.pageField = [1];
    }
  }
  showDepartmentsByPageNumber(page, i) {
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllDepartments(this.currentPage);
  }

  //Pagination Start  

  showPrevDepartments() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllDepartments(this.currentPage);
    }

  }

  showNextDepartments() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllDepartments(this.currentPage);
    }
  }

  Add(){
    this.storage.remove('DepartmentId');
    this.router.navigateByUrl('/SystemAdmin/CreateDepartment');
  }

  pass(value): void {
    this.storage.set('DepartmentId', value);
    this.router.navigateByUrl('/SystemAdmin/CreateDepartment');
  }
}

