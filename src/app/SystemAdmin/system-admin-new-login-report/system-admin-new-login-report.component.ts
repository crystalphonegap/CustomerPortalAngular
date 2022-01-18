import { Component, OnInit } from '@angular/core';
import { SystemAdminService } from '../../shared/SystemAdminService';
import { Router } from '@angular/router';
import * as fileSaver from 'file-saver';
import { PaginationService } from '../../component/pagination/pagination.service';
import { UserService } from 'src/app/shared/user.service';
import { AlertService } from 'src/app/component/alert.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SystemAdminComponent } from '../SystemAdmin.component';

@Component({
  selector: 'app-system-admin-new-login-report',
  templateUrl: './system-admin-new-login-report.component.html',
  styleUrls: ['./system-admin-new-login-report.component.css']
})
export class SystemAdminNewLoginReportComponent implements OnInit {

  Reports: any = [];
  constructor(public datepipe: DatePipe, private alertService: AlertService,
    private _SystemAdminService: SystemAdminService, private _SystemAdminComponent: SystemAdminComponent
    , public paginationService: PaginationService) { }
  search: any = [];
  SearchType:string;
  FromDate = null;
  Todate = null;
  loadedFromDate; LoadedToDate;
  SearchFilter;
  ColumnCount:number=0;
  UserType: string = "Customer";
  Zone: string = "NoSearch";
  Region: string = "NoSearch";
  Branch: string = "NoSearch";
  Territory: string = "NoSearch";
  Columns1: any = [];
  Columns2: any = [];
  ZoneDate: any = [];
  RegionDate: any = [];
  BranchDate: any = [];
  TerritoryDate: any = [];
  Type: any = "Login Report";
  ngOnInit() {
    this.FromDate = new Date();
    this.FromDate.setDate(this.FromDate.getDate() - 7);
    this.FromDate = this.datepipe.transform(this.FromDate, 'dd-MM-yyyy');
    this.Todate = new Date();
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
    this.loadedFromDate = true;
    this.LoadedToDate = true;
    this.SearchFilter = new FormGroup({
      FromDate: new FormControl(this.FromDate, [Validators.required, Validators.maxLength(256)]),
      Todate: new FormControl(this.Todate, [Validators.required, Validators.maxLength(256)]),
      search: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    });
    this.GetZoneData();
    this.GetRegionData();
    this.GetBranchData();
    this.GetTerritoryDate();
    this.Search();

  }
  GetZoneData() {
    this._SystemAdminComponent.setLoading(true);
    this._SystemAdminService.GetArea("Zone", null).subscribe((data: any) => {
      this.ZoneDate = data;
      this._SystemAdminComponent.setLoading(false);
    },
      err => {
        this._SystemAdminComponent.setLoading(false);;
        console.log(err)
      });
  }
  GetRegionData() {
    this._SystemAdminComponent.setLoading(true);
    let Search = null
    if (this.Zone != 'NoSearch') {
      Search = this.Zone;
    }
    this._SystemAdminService.GetArea("Region", Search).subscribe((data: any) => {
      this.RegionDate = data;
      this._SystemAdminComponent.setLoading(false);
    },
      err => {
        this._SystemAdminComponent.setLoading(false);;
        console.log(err)
      });
  }
  GetBranchData() {
    this._SystemAdminComponent.setLoading(true);
    let Search = null
    if (this.Zone != 'NoSearch') {
      Search = this.Zone;
    }
    if (this.Region != 'NoSearch') {
      Search = this.Region;
    }
    this._SystemAdminService.GetArea("Branch", Search).subscribe((data: any) => {
      this.BranchDate = data;
      this._SystemAdminComponent.setLoading(false);
    },
      err => {
        this._SystemAdminComponent.setLoading(false);
        console.log(err)
      });
  }
  GetTerritoryDate() {
    this._SystemAdminComponent.setLoading(true);
    let Search = null
    if (this.Zone != 'NoSearch') {
      Search = this.Zone;
    }
    if (this.Region != 'NoSearch') {
      Search = this.Region;
    }
    if (this.Branch != 'NoSearch') {
      Search = this.Branch;
    }
    this._SystemAdminService.GetArea("SalesOffice", Search).subscribe((data: any) => {
      this._SystemAdminComponent.setLoading(false);
      this.TerritoryDate = data;
    },
      err => {
        this._SystemAdminComponent.setLoading(false);
        console.log(err)
      });

  }
  changeDateLoad(value) {
    if (value == 'From') {
      this.loadedFromDate = false
    }
    else if (value == 'To') {
      this.LoadedToDate = false
    }
    if (this.loadedFromDate == false) {
      this.FromDate = this.datepipe.transform(this.SearchFilter.controls['FromDate'].value._d, 'dd-MM-yyyy');
    }
    if (this.LoadedToDate == false) {
      this.Todate = this.datepipe.transform(this.SearchFilter.controls['Todate'].value._d, 'dd-MM-yyyy');
    }
  }



  Search() {
    if(this.Region=="NoSearch"&&this.Branch=="NoSearch"&&this.Territory=="NoSearch"&&this.Zone=="NoSearch"){
      this.SearchType='NoSearch';
      this.search = {
        fromDate: this.FromDate,
        todate: this.Todate,
        UserType: this.UserType,
        Zone: "NoSearch",
        Region: "NoSearch",
        Branch: "NoSearch",
        Territory: "NoSearch",
        Type: this.Type,
        Search:this.SearchType,
      }
    }else if(this.Region=="NoSearch"&&this.Branch=="NoSearch"&&this.Territory=="NoSearch"&&this.Zone!="NoSearch"){
      this.SearchType='Search';
      this.search = {
        fromDate: this.FromDate,
        todate: this.Todate,
        UserType: this.UserType,
        Zone: this.Zone,
        Region: "NoSearch",
        Branch: "NoSearch",
        Territory: "NoSearch",
        Type: this.Type,
        Search:this.SearchType,
      }
    }else  if(this.Region!="NoSearch"&&this.Branch=="NoSearch"&&this.Territory=="NoSearch"&&this.Zone!="NoSearch"){
      this.SearchType='Search';
      this.search = {
        fromDate: this.FromDate,
        todate: this.Todate,
        UserType: this.UserType,
        Zone: "NoSearch",
        Region: this.Region,
        Branch: "NoSearch",
        Territory: "NoSearch",
        Type: this.Type,
        Search:this.SearchType,
      }
    }else  if(this.Region!="NoSearch"&&this.Branch!="NoSearch"&&this.Territory=="NoSearch"&&this.Zone!="NoSearch"){
      this.SearchType='Search';
      this.search = {
        fromDate: this.FromDate,
        todate: this.Todate,
        UserType: this.UserType,
        Zone: "NoSearch",
        Region: "NoSearch",
        Branch: this.Branch,
        Territory: "NoSearch",
        Type: this.Type,
        Search:this.SearchType,
      }
    }else  if(this.Region!="NoSearch"&&this.Branch!="NoSearch"&&this.Territory!="NoSearch"&&this.Zone!="NoSearch"){
      this.SearchType='Search';
      this.search = {
        fromDate: this.FromDate,
        todate: this.Todate,
        UserType: this.UserType,
        Zone: "NoSearch",
        Region: "NoSearch",
        Branch: "NoSearch",
        Territory: this.Territory,
        Type: this.Type,
        Search:this.SearchType,
      }
    }
    if(this.Type=="Login Report"){
      this.getAllReports(1);
    }
   else if(this.Type=="Download"){
        this.download();
   }
  }
  ChangeFilter(Type) {
    this.Type=Type
    if (this.loadedFromDate == false) {
      this.FromDate = this.datepipe.transform(this.SearchFilter.controls['FromDate'].value._d, 'dd-MM-yyyy');
    }
    if (this.LoadedToDate == false) {
      this.Todate = this.datepipe.transform(this.SearchFilter.controls['Todate'].value._d, 'dd-MM-yyyy');
    }
    this.Search();
  }
  getAllReports(pageNo) {

    this._SystemAdminComponent.setLoading(true);
    this._SystemAdminService.NewLoginReport(this.search).subscribe((data: any) => {
      this._SystemAdminComponent.setLoading(false);
      this.Reports = data;
      this.Columns1 = [];
      this.Columns2 = [];
      this.ColumnCount=0;
      for (const [key, value] of Object.entries(this.Reports[0])) {
        if(this.ColumnCount<8){
          this.Columns1.push(key);
        }else{
          this.Columns2.push(key);
        }
        this.ColumnCount++
      }
    },
      err => {
        this._SystemAdminComponent.setLoading(false);
        console.log(err)
      });
  }

  ChangeUserType(value) {
    this.UserType = value;
    this.Type='ChangeFilter';
    this.Search();
  }
  ChangeZone(value) {
    this.Zone = value
    this.Type='ChangeFilter';
    this.Search();
    this.GetRegionData();
    this.GetBranchData();
    this.GetTerritoryDate();
  }
  ChangeRegion(value) {
    this.Region = value
    this.Type='ChangeFilter';
    this.Search();
    this.GetBranchData();
    this.GetTerritoryDate();
  }
  ChangeBranch(value) {
    this.Branch = value
    this.Type='ChangeFilter';
    this.Search();
    this.GetTerritoryDate();
  }
  ChangeTerritory(value) {
    this.Territory = value
    this.Type='ChangeFilter';
    this.Search();
  }
  download() {
    this._SystemAdminComponent.setLoading(true);
    this._SystemAdminService.NewLoginReportDownloadExcel(this.search.fromDate,this.search.todate
      ,this.search.Zone,this.search.Region,this.search.Branch,this.search.Territory,this.search.UserType,
      this.search.Type, this.search.Search).subscribe(response => {
        let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        this._SystemAdminComponent.setLoading(false);
        fileSaver.saveAs(blob, 'LoginReport.xlsx');
    },
    err => {
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })
  }



}
