import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CFAgentService } from 'src/app/shared/CFAgentService';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { DatePipe } from '@angular/common';
import { EmployeeService } from 'src/app/shared/EmployeeService';
import { TargetSales } from 'src/app/shared/TargetSales';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Chart } from 'chart.js';
import { Targetsalesdata } from 'src/app/models/targetsalesdata';
import { UserService } from 'src/app/shared/user.service';
import { UserConstant } from 'src/app/models/Userconstant';
import { EmpComponent } from '../Emp.component';
import { constStorage } from 'src/app/models/Storege';
import { ExcelService } from 'src/app/services/excel.service';
import * as Excel from "exceljs/dist/exceljs.min.js";
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-rahemp-dashboard',
  templateUrl: './rahemp-dashboard.component.html',
  styleUrls: ['./rahemp-dashboard.component.css']
})
export class RAHEmpDashboardComponent implements OnInit {

  constructor(private _EmpComponent: EmpComponent, private service: UserService,
    private _TargetSales: TargetSales, private _EmployeeService: EmployeeService,
    public datepipe: DatePipe, private router: Router, private _CFAgentService: CFAgentService
   , @Inject(SESSION_STORAGE) private storage: WebStorageService,private excelService:ExcelService) {
    this.FromDate = new Date();
      this.FromDate.setDate(this.FromDate.getDate() - 2590);
      this.FromDate = this.datepipe.transform(this.FromDate, 'dd-MM-yyyy');
      this.Todate = new Date();
      this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
    }

   FromDate=null;
   Todate=null;   
   CMOList: string = 'none'
   ZoneList: string = 'none'
   BranchList: string = 'none'
   TerritoryList: string = 'none'
   CustomerList: string = 'none'
   BranchView = false;
   SelectedZone;
   SelectedRedgion;
   SelectedBranch;
   SelectedTerritory;
   DataNotAvailable: boolean = false;
   DataNotAvailablefor: string;
   CMO :any = [];
   Zone :any = [];
   Region :any = [];
   Branch  :any = [];
   Territory  :any = [];
   Userid;
   UserType;
   User;
   SearchFilter;
  loadedFromDate:boolean;
  LoadedToDate:boolean;
   Performancefor: string;
   objects: any = [];
   objects1: any = [];
   Indexing: number = 1;
   ngOnInit() {
     debugger
     this.loadedFromDate=true;
    this.LoadedToDate=true;
     this.Userid = localStorage.getItem(constStorage.IDbint);
     this.UserType = localStorage.getItem(constStorage.UserType);
     this.SearchFilter = new FormGroup({
      status: new FormControl('All', [Validators.required, Validators.maxLength(256)]),
      FromDate: new FormControl( this.FromDate, [Validators.required, Validators.maxLength(256)]),
      Todate: new FormControl( this.Todate , [Validators.required, Validators.maxLength(256)]),
      search: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    });
     if (this.UserType == UserConstant.RegionalAccountingHead) {
      this.Performancefor = 'Regional'
    }else  {
       this.Performancefor = 'Company'
     }
     debugger
     this.LoadContain();
   }
 
   GetCMOData() {
     this._EmpComponent.setLoading(true);
 
     this._EmployeeService.GetAccountingHeadEmployeeWiseReport('CMO', 'All', this.FromDate,this.Todate).subscribe((data: any) => {
       this.CMO = data;
       this.Zone = null;
       this.Region = null;
       this.Branch = null;
       this.Territory = null;
       this.SelectedRedgion = null;
       this.SelectedBranch = null;
       this.SelectedTerritory = null;
       this.ChangeView();
     });
   }
 
   getNameofParentArea(Code) {
     if (this.UserType == UserConstant.ZonalManager) {
       this._EmployeeService.GetAreaNameByAreaCode('Zone', Code).subscribe((data: any) => {
         if(data!=null&& data !=''){
         this.SelectedZone = data[0].Name;
         }
       },
       err => {
         this._EmpComponent.setLoading(false);
           console.log(err);
       });
     }
     if (this.UserType == UserConstant.RegionalManager) {
       this._EmployeeService.GetAreaNameByAreaCode('Region', Code).subscribe((data: any) => {
         if(data!=null&& data !=''){
         this.SelectedRedgion = data[0].Name;
         }
 
       },
       err => {
         this._EmpComponent.setLoading(false);
           console.log(err);
       });
     }
     if (this.UserType == UserConstant.BranchManager) {
       this._EmployeeService.GetAreaNameByAreaCode('Branch', Code).subscribe((data: any) => {
         if(data!=null&& data !=''){
         this.SelectedBranch = data[0].Name;
         }
       },
       err => {
         this._EmpComponent.setLoading(false);
           console.log(err);
       });
     }
     if (this.UserType == UserConstant.TerritorySalesExecutive) {
       this._EmployeeService.GetAreaNameByAreaCode('Territory', Code).subscribe((data: any) => {
         if(data!=null&& data !=''){
         this.SelectedTerritory = data[0].Name;
         }
       },
       err => {
         this._EmpComponent.setLoading(false);
           console.log(err);
       });
     }
   }
 
   GetZoneData(Code, Name) {
     this.SelectedZone = Name;
     this.getNameofParentArea(Code);
     this._EmpComponent.setLoading(true);
     this._EmployeeService.GetAccountingHeadEmployeeWiseReport('Zone', Code, this.FromDate,this.Todate).subscribe((data: any) => {
       this.Zone = data;
       this.Region = null;
       this.Branch = null;
       this.Territory = null;
       this.SelectedRedgion = null;
       this.SelectedBranch = null;
       this.SelectedTerritory = null;
 
       this.ChangeView();
     },
     err => {
       this._EmpComponent.setLoading(false);
         console.log(err);
     });
   }
   changeDateLoad(value){
    if(value=='From'){
this.loadedFromDate=false
    }
    else  if(value=='To'){
      this.LoadedToDate=false
          }
  }
   GetRegionData(Code, Name) {
     this._EmpComponent.setLoading(true);
     this.SelectedRedgion = true;
     this.SelectedRedgion = Name;
     this.getNameofParentArea(Code);
     this._EmployeeService.GetAccountingHeadEmployeeWiseReport('Region', Code, this.FromDate,this.Todate).subscribe((data: any) => {
       this.Region = data;
       this.Branch = null;
       this.Territory = null;
       this.SelectedBranch = null;
       this.SelectedTerritory = null;
       this.ChangeView();
     },
     err => {
       this._EmpComponent.setLoading(false);
         console.log(err);
     })
   }
   GetBranchData(Code, Name) {
     this._EmpComponent.setLoading(true);
     this.SelectedBranch = Name;
     this.getNameofParentArea(Code);
     this._EmployeeService.GetAccountingHeadEmployeeWiseReport('Branch', Code, this.FromDate,this.Todate).subscribe((data: any) => {
       this.Branch = data;
       this.Territory = null;
       this.SelectedTerritory = null;
       this.ChangeView();
       console.log("branch",this.Branch)
     },
     err => {
       this._EmpComponent.setLoading(false);
         console.log(err);
     })
   }
   GetTerritoryData(Code, Name) {
     this._EmpComponent.setLoading(true);
     this.SelectedTerritory = Name;
     this.getNameofParentArea(Code);
     this._EmployeeService.GetAccountingHeadEmployeeWiseReport('Territory', Code, this.FromDate,this.Todate).subscribe((data: any) => {
       this.Territory = data;
       this.ChangeView();
     },
     err => {
       this._EmpComponent.setLoading(false);
         console.log(err);
     })
   }
   CloseZone(value) {
     if (value == 'All') {
       this.SelectedRedgion = null;
       this.Region = null;
       this.SelectedBranch = null;
       this.Branch = null;
       this.SelectedTerritory = null;
       this.Territory = null;
     }
     this.SelectedZone = null;
     this.Zone = null;
     this.ChangeView();
   }
   CloseRegion(value) {
     if (value == 'All') {
       this.SelectedBranch = null;
       this.Branch = null;
       this.SelectedTerritory = null;
       this.Territory = null;
     }
     this.SelectedRedgion = null;
     this.Region = null;
     this.ChangeView();
   }
   CloseBranch(value) {
     if (value == 'All') {
       this.SelectedTerritory = null;
       this.Territory = null;
     }
 
     this.SelectedBranch = null;
     this.Branch = null;
     this.ChangeView();
   }
 
   CloseTerritory() {
     this.SelectedTerritory = null;
     this.Territory = null;
     this.ChangeView();
   }
   ChangeView() {
     this._EmpComponent.setLoading(false);
     if (this.CMO != null && this.CMO[0] != null) {
       this.CMOList = 'block'
     } else {
       this.CMOList = 'none'
     }
     if (this.Zone != null && this.Zone[0] != null) {
       this.ZoneList = 'block'
     } else {
       this.ZoneList = 'none'
     }
     if (this.Region != null && this.Region[0] != null) {
       this.BranchList = 'block'
     } else {
       this.BranchList = 'none'
     }
     if (this.Branch != null && this.Branch[0] != null) {
       this.TerritoryList = 'block'
     } else {
       this.TerritoryList = 'none'
     }
     if (this.Territory != null && this.Territory[0] != null) {
       this.CustomerList = 'block'
     } else {
       this.CustomerList = 'none'
     }
 
     if (
       (this.CMO != null && this.CMO[0] != null) ||
       (this.Zone != null && this.Zone[0] != null) ||
       (this.Region != null && this.Region[0] != null) ||
       (this.Branch != null && this.Branch[0] != null) ||
       (this.Territory != null && this.Territory[0] != null)
     ) {
       this.DataNotAvailable = false
     } else {
       this.DataNotAvailable = true
     }
   }
 
   LoadContain() {
     debugger
     if (this.UserType == UserConstant.MarketingHead || this.UserType == UserConstant.AccountingHead ) {
       this.GetCMOData();
     }
     else if (this.Userid !== null && this.Userid !== "") {
       this.service.getUserData(this.Userid).subscribe(
         data => {
           this.User = data;
           if (this.UserType == UserConstant.RegionalAccountingHead) {
             this.GetRegionData(this.User.ParentCodevtxt, this.User.ParentCodevtxt);
           }
         }
       );
     } else {
       this.router.navigate(['/user/login']);
     }
     this.getdashboardCount();
 
   }
   
   
   ChangeFilter(){
    if(this.loadedFromDate==false){
      this.FromDate=  this.datepipe.transform(this.SearchFilter.controls['FromDate'].value._d, 'dd-MM-yyyy');
    }
    if(this.LoadedToDate==false){
      this.Todate=  this.datepipe.transform(this.SearchFilter.controls['Todate'].value._d, 'dd-MM-yyyy');
    }
    this.LoadContain();
  }
 
 
   
   getdashboardCount() {
     this._EmployeeService.GetEmployeeDashboardCount(localStorage.getItem(constStorage.UserCode), this.UserType).subscribe((data: any) => {
       if(data!=null&& data !=''){
         console.log(data);
       this._EmpComponent.setLoading(false);
       }
     },
     err => {
       this._EmpComponent.setLoading(false);
         console.log(err);
     })
   }

   exportAsXLSX():void {
    
    
    console.log(this.Region);
    for (let i=0 ; i< this.Region.length ; i++)
    {  
      
          this.objects1.push([i+1, this.Region[i].Name, this.Region[i].NoOfDealers, this.Region[i].ActiveDealers,this.Region[i].InActiveDealers,this.Region[i].BalancePendingCount,this.Region[i].BalanceAgreedCount,this.Region[i].BalanceDisagreedCount]); 
       
    }

    this.generateExcel(this.objects1);
  }

  exportAsXLSX2():void {
    for (let i=0 ; i< this.Branch.length ; i++)
    {  

          this.objects.push([i+1, this.Branch[i].Name, this.Branch[i].NoOfDealers, this.Branch[i].ActiveDealers,this.Branch[i].InActiveDealers,this.Branch[i].BalancePendingCount,this.Branch[i].BalanceAgreedCount,this.Branch[i].BalanceDisagreedCount]);
    }

   
    this.generateExcel(this.objects);
  
    
  }


  generateExcel(objects): void{

    var options = {
      filename: './streamed-workbook.xlsx',
      useStyles: true,
      useSharedStrings: true
    };
    let workbook = new Excel.Workbook(options);

    
    var worksheet = workbook.addWorksheet('My Sheet', {properties:{tabColor:{argb:''}}});
    worksheet.columns = [
      { header: 'SrNo', key: 'SrNo', width: 5 },
      { header: 'Territory Name', key: 'Territory Name', width: 32, },
      { header: 'NoOfDealers', key: 'NoOfDealers', width: 32, },
      { header: 'ActiveDealers', key: 'ActiveDealers', width: 32, },
      { header: 'InActiveDealers', key: 'InActiveDealers', width: 32, },
      { header: 'BalanceconfirmationsPending', key: 'BalanceconfirmationsPending', width: 32, },
      { header: 'BalanceconfirmationsAgreed', key: 'BalanceconfirmationsAgreed', width: 32, },
      { header: 'BalanceconfirmationsDisagreed', key: 'BalanceconfirmationsDisagreed', width: 32, }
      
      
    ];
    worksheet.addRows(objects,"n");
 
    let fileName="Balance_Confirmation_Report.xlsx";
    const excelBuffer: any = workbook.xlsx.writeBuffer();
    workbook.xlsx.writeBuffer()
        .then(function(buffer) {
            // done buffering
            const data: Blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            FileSaver.saveAs(data, fileName);
        });

        
  }


  
  generateExcel2(objects1): void{

        

    var options = {
      filename: './streamed-workbook.xlsx',
      useStyles: true,
      useSharedStrings: true
    };
    let workbook = new Excel.Workbook(options);

    
    var worksheet = workbook.addWorksheet('My Sheet', {properties:{tabColor:{argb:''}}});
    worksheet.columns = [
      { header: 'SrNo', key: 'SrNo', width: 5 },
      { header: 'Branch Name', key: 'Territory Name', width: 32, },
      { header: 'NoOfDealers', key: 'NoOfDealers', width: 32, },
      { header: 'ActiveDealers', key: 'ActiveDealers', width: 32, },
      { header: 'InActiveDealers', key: 'InActiveDealers', width: 32, },
      { header: 'BalanceconfirmationsPending', key: 'BalanceconfirmationsPending', width: 32, },
      { header: 'BalanceconfirmationsAgreed', key: 'BalanceconfirmationsAgreed', width: 32, },
      { header: 'BalanceconfirmationsDisagreed', key: 'BalanceconfirmationsDisagreed', width: 32, }
      
      
    ];
    worksheet.addRows(objects1,"n");
 
    let fileName="Balance_Confirmation_Report.xlsx";
    const excelBuffer: any = workbook.xlsx.writeBuffer();
    workbook.xlsx.writeBuffer()
        .then(function(buffer) {
            // done buffering
            const data: Blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            FileSaver.saveAs(data, fileName);
        });

        
  }


 
 
 }
 
