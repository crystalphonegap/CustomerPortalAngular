
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { PaginationService } from '../../component/pagination/pagination.service';
import * as fileSaver from 'file-saver';
import { AlertService } from 'src/app/component/alert.service';
import { OrderService } from 'src/app/shared/OrderService';
import { DatePipe } from '@angular/common';
import { SystemAdminComponent } from '../SystemAdmin.component';
import { SystemAdminService } from 'src/app/shared/SystemAdminService';
import { MaterialTestCertificateService } from 'src/app/shared/MaterialTestCertificateService';
import { ItemMasterService } from 'src/app/shared/ItemMasterService';

@Component({
  selector: 'app-material-test-certificate-list',
  templateUrl: './material-test-certificate-list.component.html',
  styleUrls: ['./material-test-certificate-list.component.css']
})
export class MaterialTestCertificateListComponent implements OnInit {

  LoyalityPoints: any = [];
  constructor(private _MaterialTestCertificateService:MaterialTestCertificateService,public datepipe: DatePipe, private router: Router, private _Orderservice: OrderService,
              @Inject(SESSION_STORAGE) private storage: WebStorageService, private _SystemAdminComponent: SystemAdminComponent,
              private _SystemAdminService: SystemAdminService, private _ItemMasterService : ItemMasterService
    ,         public paginationService: PaginationService, private alertService: AlertService) {
  }
  Type;
  Region: string;
  Branch: string;
  Territory: string;
  search = null;
  pageNo: any = 1;
  Indexing: number = 1;
  pageNumber: boolean[] = [];
  pageField = [];
  AllItemMasterData;
  exactPageList: any;
  paginationData: number;
  LoyalityPointsPerPage: any = 10;
  totalLoyalityPoints: any;
  totalLoyalityPointsCount: any;
  currentPage = 1;
  Gradetxt = '0';
  Years = [];
  weeks = [];
  DocDatedatetime = null;
  Days = 'All';
  week = 0;
  year = 0;
  ngOnInit(){
    const startYear = parseInt(this.datepipe.transform(new Date(), 'yyyy')) - 21;
    for (let count: number = 0 ; count < 21 ; count++){
      this.weeks.push(count + 1);
      this.Years.push(startYear + count)  ;
    }
    const CurrentYear = parseInt( this.datepipe.transform(new Date(), 'yyyy'))  ;
    this.year = CurrentYear ;
    for (let count: number = 0 ; count < 30 ; count++){
      this.weeks.push(22 + count);
      this.Years.push(CurrentYear + count)  ;
    }
    this.weeks.push(52);
    this.getAllItemMasterData();
    this.Search();
  }



  getAllItemMasterData() {
    this._SystemAdminComponent.setLoading(true);
    this._ItemMasterService.getAllItemMasterData().subscribe(
      data => {
        this.AllItemMasterData = data;
        this._SystemAdminComponent.setLoading(false);
      }
    );
  }
  ChangeFilter() {
    this.Search();
  }
  Search() {
    this.pageNumber[0] = true;
    this.paginationService.temppage = 0;
    this.currentPage = 1;
    this.getallLoyalityPoints(1);

  }
  getallLoyalityPoints(pageno) {
    this.pageNo = pageno;
    this.Indexing = pageno - 1;
    this.Indexing = this.Indexing * 10;
    const model = {
      PageNo : pageno,
      PageSize : 10,
      IDbint : 0,
      DocDatedatetime : this.DocDatedatetime,
      Yeartxt : this.year,
      Gradetxt : this.Gradetxt,
      Daystxt : this.Days,
      Weektxt : this.week,
    };
    this._SystemAdminComponent.setLoading(true);
    this._MaterialTestCertificateService.GetMaterialCertificateList( model ).subscribe((data: any) => {
      this.LoyalityPoints = data;
      this._SystemAdminComponent.setLoading(false);
      this.getallLoyalityPointsCount(model);
    },
    err => {
      this._SystemAdminComponent.setLoading(false);
      console.log(err)
    })

  }
  getallLoyalityPointsCount(model) {
    this.totalLoyalityPointsCount = 1;
    this.totalNoOfPages();
    this._SystemAdminComponent.setLoading(true);
    this._MaterialTestCertificateService.GetMaterialCertificateCount(model).subscribe((res: any) => {
      this.totalLoyalityPointsCount = res;
      this._SystemAdminComponent.setLoading(false);
      this.totalNoOfPages();
    },
    err => {
      this._SystemAdminComponent.setLoading(false);
      console.log(err)
    })
  }

  totalNoOfPages() {
    this.paginationData = Number(this.totalLoyalityPointsCount / this.LoyalityPointsPerPage);
    const tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList;
    }
    this.paginationService.pageOnLoad();
    this.pageField = this.paginationService.pageField;

  }
  showLoyalityPointsByPageNumber(page, i) {
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getallLoyalityPoints(this.currentPage);
  }


  showPrevLoyalityPoints() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getallLoyalityPoints(this.currentPage);
    }

  }

  showNextLoyalityPoints() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getallLoyalityPoints(this.currentPage);
    }
  }

  download() {
    this._SystemAdminComponent.setLoading(true);
    this._MaterialTestCertificateService.Excel(this.search).subscribe(response => {
     const blob: any = new Blob([response], { type: 'text/json; charset=utf-8' });
     const url = window.URL.createObjectURL(blob);
     this._SystemAdminComponent.setLoading(false);
     fileSaver.saveAs(blob, 'LoyalityPointsList.xlsx');
   },
   err => {
     this._SystemAdminComponent.setLoading(false);
     console.log(err);
   });
  }

Add() {
    this.router.navigateByUrl('/SystemAdmin/MaterialTestCertificateUpload');
}


View(ID) {
    localStorage.setItem('ID', ID );
    this.router.navigateByUrl('/SystemAdmin/MaterailTestCertificateDetail');
}

Delete(ID) {
  this._SystemAdminComponent.setLoading(true);
  this._MaterialTestCertificateService.DeleteMaterialTestCertificate(ID).subscribe(response => {
   this.ngOnInit();
    this.alertService.success(response.toString());
 },
 err => {
   this._SystemAdminComponent.setLoading(false);
   this.ngOnInit();
   console.log(err);
 });
}

}
