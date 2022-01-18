import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';

import { PaginationService } from '../../component/pagination/pagination.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class SuperAdminDashboardComponent implements OnInit {
  Users: any=[];
  constructor(private router: Router, private service: UserService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
    , public paginationService: PaginationService) { }
  
  pageNo: any = 1;  
  pageNumber: boolean[] = [];  
  sortOrder: any = 'UserName_ASC';  
  order:any='UserName';  
  //Pagination Variables  
  //Page Row variables  
  pageField = [];  
  exactPageList: any;  
  paginationData: number;  
  UsersPerPage: any = 10;  
  orderBy: string='Asc';  
  
  totalUsers: any;  
  totalUsersCount: any;  
  currentPage = 1;  
  
  ngOnInit() {  
    this.pageNumber[0] = true;  
    this.paginationService.temppage = 0;  
    this.getAllUsers();  
  }  
  getAllUsers() {  
       this.service.getAllUsers(this.pageNo, this.UsersPerPage).subscribe((data: any) => {
      this.Users = data ;
      this.getAllUsersCount();
    })
    
  }  
  getAllUsersCount() {  
    this.service.getAllUsersCount().subscribe((res: any) => {  
      this.totalUsersCount = res;  
      this.totalNoOfPages();  
    })  
  }  
  
  //Method For Pagination  
  totalNoOfPages() {  
  
    this.paginationData = Number(this.totalUsersCount / this.UsersPerPage);  
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
  showUsersByPageNumber(page, i) {  
    this.pageNumber = [];  
    this.pageNumber[i] = true;  
    this.pageNo = page;  
    this.currentPage =page;  
    this.getAllUsers();  
  }  
  
  //Pagination Start  
  
  showPrevUsers() {  
  
    if (this.paginationService.showNoOfCurrentPage != 1) {  
      this.paginationService.prevPage();  
      this.pageNumber = [];  
      this.pageNumber[0] = true;  
      this.currentPage = this.paginationService.pageField[0];  
      this.getAllUsers();  
    }  
  
  }  
  
  showNextUsers() {  
  
    if (this.paginationService.disabledNextBtn == false) {  
      this.pageNumber = [];  
      this.paginationService.nextPage();  
      this.pageNumber[0] = true;  
      this.currentPage = this.paginationService.pageField[0];  
      this.getAllUsers();  
    }  
  }  
  sortByHeading(value: string, id) {  
    this.sortOrder = value;  
    this.order =value;  
    if (this.orderBy == "Desc") {  
      this.orderBy = "Asc"  
      this.sortOrder =this.sortOrder+'_ASC';  
    } else {  
      this.orderBy = "Desc";  
      this.sortOrder =this.sortOrder+'_DESC'  
    }  
    this.getAllUsers();  
  }  
  

  pass(value): void {
    this.storage.set('Userid', value);
    this.router.navigateByUrl('/SuperAdmin/EditAdmin');
  }



}
