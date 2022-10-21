import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { PaginationService } from '../../component/pagination/pagination.service';
import * as fileSaver from 'file-saver';
import { AlertService } from 'src/app/component/alert.service';
import { EmpComponent } from '../Emp.component';
import { constStorage } from 'src/app/models/Storege';

@Component({
  selector: 'app-regionalhead',
  templateUrl: './regionalhead.component.html',
  styleUrls: ['./regionalhead.component.css']
})
export class RegionalheadComponent implements OnInit {

  Users: any=[];
  constructor(private router: Router, private _userservice: UserService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
    ,private _EmpComponent:EmpComponent, public paginationService: PaginationService, private alertService : AlertService) { 
      
    }

    pageNo: any = 1;
    FromDate = null;
     Todate = null;
    Indexing :number=1;
    search = null;
    pageNumber: boolean[] = [];
    sortOrder: any = 'CompanyName_ASC';
    order:any='CompanyName';
    smallPageRow: boolean = true;
    mediumPageRow: boolean = false;
    largePageRow: boolean = false;
    usercode="";
    UserType="";
    small = 10;
    medium = 10;
    large =10;

    pageField = [];
    exactPageList: any;
    paginationData: number;
    UsersPerPage: any = 10;
    orderBy: string='Asc';
    
    totalUsers: any;
    totalUsersCount: any;
    currentPage = 1;
    

  ngOnInit() {
    this.usercode=localStorage.getItem(constStorage.UserCode);
    this.UserType = localStorage.getItem(constStorage.UserType)
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.getallUsers(1);
    this.currentPage =1;
  }
  getallUsers(pageno) {
    this._EmpComponent.setLoading(true);
    this.pageNo=pageno;
    this.Indexing=pageno-1;
    this.Indexing=this.Indexing*10;
    this._userservice.getAllRegionalHeadEMployees(this.usercode,this.UserType,this.pageNo, this.UsersPerPage,this.search).subscribe((data: any) => {
   this.Users = data ;
   this._EmpComponent.setLoading(false);
   this.getallUsersCount();
 },
 err => {
   this._EmpComponent.setLoading(false);
     console.log(err);
 })

}
getallUsersCount() {
  this._EmpComponent.setLoading(true);
 this._userservice.GetRegionalHeadListCount(this.usercode,this.UserType,this.search).subscribe((res: any) => {
   this.totalUsersCount = res;
   this._EmpComponent.setLoading(false);
   this.totalNoOfPages();
 },
 err => {
   this._EmpComponent.setLoading(false);
     console.log(err);
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
 this.getallUsers(this.currentPage);
}

//Pagination Start

showPrevUsers() {

 if (this.paginationService.showNoOfCurrentPage != 1) {
   this.paginationService.prevPage();
   this.pageNumber = [];
   this.pageNumber[0] = true;
   this.currentPage = this.paginationService.pageField[0];
   this.getallUsers(this.currentPage);
 }

}

showNextUsers() {

 if (this.paginationService.disabledNextBtn == false) {
   this.pageNumber = [];
   this.paginationService.nextPage();
   this.pageNumber[0] = true;
   this.currentPage = this.paginationService.pageField[0];
   this.getallUsers(this.currentPage);
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
 this.getallUsers(this.currentPage);
}
download() {
  this._EmpComponent.setLoading(true);
 this._userservice.ExportToExceRegionalHeadList(this.search).subscribe(response => {
   let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
   const url = window.URL.createObjectURL(blob);
   this._EmpComponent.setLoading(false);
   fileSaver.saveAs(blob, 'EmployeeList.xlsx');
 },
 err => {
   this._EmpComponent.setLoading(false);
     console.log(err);
 })
}

pass(value): void {
  if(value.UserTypetxt=='Order Analyst'){
    this.storage.set('Userid', value.Idbint);
  this.router.navigateByUrl('/SystemAdmin/OrderAnalystEdit');
  }
  else{
    this.storage.set('Userid', value.Idbint);
    this.router.navigateByUrl('/SystemAdmin/EmployeeEdit');
  }
}


View(value): void {

    this.storage.set('Userid', value.Idbint);
    this.router.navigateByUrl('/SystemAdmin/EmployeeView');
}

changedStatus(Emp,event) {


    let Userdata= {
      Idbint : Emp.Idbint,
      UserCodetxt :  Emp.UserCodetxt,
      UserNametxt :Emp.UserNametxt,
      UserTypetxt : Emp.UserTypetxt,
      Divisionvtxt : Emp.Divisionvtxt,
      Mobilevtxt :Emp.Mobilevtxt,
      Emailvtxt :Emp.Emailvtxt,
      Passwordvtxt : Emp.Passwordvtxt,
      IsActivebit:event.checked
    };
    this._userservice.updateUserStatus(Userdata).subscribe(
      (res: any) => {
        this.ngOnInit();
         this.alertService.success('Employee Status Changed');
      },
      err => {
         if (err.status == 400)
           this.alertService.error('Error Occourd.');
         else
          console.log(err);
      }
    );



}

}
