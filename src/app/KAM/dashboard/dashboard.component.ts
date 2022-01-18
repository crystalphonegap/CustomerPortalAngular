import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CFAgentService } from 'src/app/shared/CFAgentService';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { DatePipe } from '@angular/common';
import { EmployeeService } from 'src/app/shared/EmployeeService';
import { TargetSales } from 'src/app/shared/TargetSales';
import { Chart } from 'chart.js';
import { Targetsalesdata } from 'src/app/models/targetsalesdata';
import { UserService } from 'src/app/shared/user.service';
import { UserConstant } from 'src/app/models/Userconstant';
import { KAMComponent } from '../KAM.component';
import { constStorage } from 'src/app/models/Storege';
import { SalesPromoterTargetData } from 'src/app/shared/SalesPromoterTargetData';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class KAMDashboardComponent implements OnInit {
constructor(private _TargetSales:TargetSales,private _KAMComponent:KAMComponent, private service: UserService,private _EmployeeService:EmployeeService,
    public datepipe: DatePipe,private router: Router, private _CFAgentService: CFAgentService,
    private _KAMTargetData:SalesPromoterTargetData
    ,  @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
    Premium = 0;
    PremiumSalesChamp=0;
    PremiumSalesChampPlus=0;
    PremiumSalesDuratech=0;
    PremiumSalesChampPer=0;
    PremiumSalesChampPlusPer=0;
    PremiumSalesDuratechPer=0;
    Todate;
    UserCode;
    ProrateSale = 0;
    MyARs = 0;
    ActualSales = 0;
    TargetSales = 0;
    Achivement = 0;
    MyDealers = 0;
    OutStanding = 0;
    TopDealers :any=[];
    BottomDealer :any=[];
    Month = [];
    CMOList: string = 'none'
    ZoneList: string = 'none'
    BranchList: string = 'none'
    TerritoryList: string = 'none'
    CustomerList: string = 'none'
    rbtnQuantity:boolean=false;
    rbtnAmount:boolean=true;
    monthtoshow;
    BranchView = false;
    TotalActualSales = [];
    TotalTargetSales = [];
    Linechart  ;
    Outstanding;
    Year;
    DataDate;
    month;
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
    Performancefor: string;
  ngOnInit() {

    var today = new Date();
    this.Todate = new Date();
    this.monthtoshow = this.Todate;
    this.month = today.getMonth();
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
    this.UserCode= localStorage.getItem('UserCode');
    this.Userid = localStorage.getItem(constStorage.IDbint);
    this.UserType = localStorage.getItem(constStorage.UserType);
    if (this.UserType == UserConstant.RegionalManager) {
      this.Performancefor = 'Regional'
    }else if (this.UserType == UserConstant.BranchManager) {
      this.Performancefor = 'Branch'
    }else if (this.UserType == UserConstant.TerritorySalesExecutive) {
      this.Performancefor = 'Territory'
    }else if (this.UserType == UserConstant.ZonalManager) {
      this.Performancefor = 'Zonal'
    }else  {
      this.Performancefor = 'Company'
    }
    this.Year = new Date().getFullYear();
    this.Outstanding = 0;
    this.Linechart = [];
    this.Month = [];
    this.TotalTargetSales = [];
    this.TotalActualSales = [];
    this.MyARs =0;
    this.getKAMTargetSalesforDashboard();
    this.getbarchart();
    this.LoadContain();
  }
  GetCMOData() {
    this._KAMComponent.setLoading(true);

    this._EmployeeService.GetEmployeeWiseReport('CMO', 'All', this.Todate).subscribe((data: any) => {
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
        this._KAMComponent.setLoading(false);
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
        this._KAMComponent.setLoading(false);
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
        this._KAMComponent.setLoading(false);
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
        this._KAMComponent.setLoading(false);
          console.log(err);
      });
    }
  }

  getKAMTargetSalesforDashboard() {
    this._KAMComponent.setLoading(true);
    this.Todate  = new Date();
    //ADDED BY SUMAN ON 06_07_2021
    //this.Todate='01-03-2021';
    //ADDED BY SUMAN ON 06_07_2021
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');

    this._TargetSales.getKAMTargetSalesforDashboard( this.UserCode,this.Todate).subscribe((res: any) => {

      this._KAMComponent.setLoading(false);
      if(res != null && res !== '') {
        this.Achivement =  res['0'].Achivement > 0 ? res['0'].Achivement.toFixed(2) : 0 ;
        this.TargetSales =  res['0'].TargetSales > 0 ? res['0'].TargetSales.toFixed(2) : 0 ;
        this.ActualSales =  res['0'].ActualSales > 0 ? res['0'].ActualSales.toFixed(2) : 0 ;
        this.MyARs =  res['0'].MyARS > 0 ? res['0'].MyARS : 0 ;
        this.ProrateSale =  res['0'].PremiumSales > 0 ? res['0'].PremiumSales.toFixed(2) : 0 ;
        this.Premium =   res['0'].PremiumSalesPer > 0 ? res['0'].PremiumSalesPer.toFixed(2) : 0 ;
        this.PremiumSalesDuratechPer =  res['0'].PremiumSalesDuratechPer > 0 ? res['0'].PremiumSalesDuratechPer.toFixed(2) : 0 ;
        this.PremiumSalesChampPlusPer =  res['0'].PremiumSalesChampPlusPer > 0 ? res['0'].PremiumSalesChampPlusPer.toFixed(2) : 0 ;
        this.PremiumSalesChampPer =  res['0'].PremiumSalesChampPer > 0 ? res['0'].PremiumSalesChampPer.toFixed(2) : 0 ;
        this.PremiumSalesDuratech =  res['0'].PremiumSalesDuratech > 0 ? res['0'].PremiumSalesDuratech.toFixed(2) : 0 ;
        this.PremiumSalesChampPlus =  res['0'].PremiumSalesChampPlus > 0 ? res['0'].PremiumSalesChampPlus.toFixed(2) : 0 ;
        this.PremiumSalesChamp =  res['0'].PremiumSalesChamp > 0 ? res['0'].PremiumSalesChamp.toFixed(2) : 0 ;
      }

    });
  }

  GetZoneData(Code, Name) {
    this.SelectedZone = Name;
    this.getNameofParentArea(Code);
    this._KAMComponent.setLoading(true);
    this._EmployeeService.GetEmployeeWiseReport('Zone', Code, this.Todate).subscribe((data: any) => {
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
      this._KAMComponent.setLoading(false);
        console.log(err);
    });
  }
  GetRegionData(Code, Name) {
    this._KAMComponent.setLoading(true);
    this.SelectedRedgion = true;
    this.SelectedRedgion = Name;
    this.getNameofParentArea(Code);
    this._EmployeeService.GetEmployeeWiseReport('Region', Code, this.Todate).subscribe((data: any) => {
      this.Region = data;
      this.Branch = null;
      this.Territory = null;
      this.SelectedBranch = null;
      this.SelectedTerritory = null;
      this.ChangeView();
    },
    err => {
      this._KAMComponent.setLoading(false);
        console.log(err);
    })
  }
  GetBranchData(Code, Name) {
    this._KAMComponent.setLoading(true);
    this.SelectedBranch = Name;
    this.getNameofParentArea(Code);
    this._EmployeeService.GetEmployeeWiseReport('Branch', Code, this.Todate).subscribe((data: any) => {
      this.Branch = data;
      this.Territory = null;
      this.SelectedTerritory = null;
      this.ChangeView();
    },
    err => {
      this._KAMComponent.setLoading(false);
        console.log(err);
    })
  }
  GetTerritoryData(Code, Name) {
    this._KAMComponent.setLoading(true);
    this.SelectedTerritory = Name;
    this.getNameofParentArea(Code);
    this._EmployeeService.GetEmployeeWiseReport('Territory', Code, this.Todate).subscribe((data: any) => {
      this.Territory = data;
      this.ChangeView();
    },
    err => {
      this._KAMComponent.setLoading(false);
        console.log(err);
    })
  }
  GetKAMData(Code, Name) {
    this._KAMComponent.setLoading(true);
    this.SelectedTerritory = Name;
    this.getNameofParentArea(Code);
    this._EmployeeService.GetEmployeeWiseReport('Territory', Code, this.Todate).subscribe((data: any) => {
      this.Territory = data;
      this.ChangeView();
    },
    err => {
      this._KAMComponent.setLoading(false);
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
    this._KAMComponent.setLoading(false);
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
    if (this.UserType == UserConstant.MarketingHead || this.UserType == UserConstant.AccountingHead) {
      this.GetCMOData();
    }
    else if (this.Userid !== null && this.Userid !== "") {
      this.service.getUserData(this.Userid).subscribe(
        data => {
          this.User = data;
          if (this.UserType == UserConstant.ZonalManager) {
            this.GetZoneData(this.User.ParentCodevtxt, this.User.ParentCodevtxt);
          }
          if (this.UserType == UserConstant.RegionalManager) {
            this.GetRegionData(this.User.ParentCodevtxt, this.User.ParentCodevtxt);
          }
          if (this.UserType == UserConstant.BranchManager) {
            this.GetBranchData(this.User.ParentCodevtxt, this.User.ParentCodevtxt);
          }
          if (this.UserType == UserConstant.TerritorySalesExecutive) {
            this.GetTerritoryData(this.User.ParentCodevtxt, this.User.ParentCodevtxt);
          }
        }
      );
    } else {
      this.router.navigate(['/user/login']);
    }


    this.GetTopDealerListInEmployeeDashboard('Amount');
    this.GetbottomDealerListInEmployeeDashboard('Amount');
    this.getdashboardCount();

  }
  onMonthYearChange(value, type) {
    var today = new Date();
    var mm = today.getMonth();
    mm =mm-2;
    if(mm==-2||mm==-1){
       if(value=="11" || value=="12" ){
        this.Year = new Date().getFullYear()-1;
       }
       else{
        this.Year = new Date().getFullYear();
       }
    }
    if (type == 'y') {
      this.Year = value;
    } else if (type == 'm') {
      if (value >= 10) {
        this.month = value;
      } else {
        this.month = '0' + value;
      }

    }
    this.Todate = this.month + '-01-' + this.Year;
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
    this.monthtoshow = '01-' + this.month + '-' + this.Year
    this.monthtoshow = this.datepipe.transform(this.monthtoshow, 'dd-MM-yyyy');
    this.LoadContain();
  }
  getbarchart() {

    this._EmployeeService.GetTargetVsActualDataForEmployee(localStorage.getItem(constStorage.UserCode), this.UserType, this.Todate).subscribe((result: Targetsalesdata[]) => {
      result.forEach(x => {
        this.Month.push(x.Month);
        this.TotalTargetSales.push(x.TotalTargetSales);
        this.TotalActualSales.push(x.TotalActualSales);
      },
      err => {
        this._KAMComponent.setLoading(false);
          console.log(err);
      });
      this._KAMComponent.setLoading(false);
      var ytargetData = {
        label: 'Target Sales Data',
        data: this.TotalTargetSales,
        backgroundColor: 'rgba(59, 147, 250)',
        borderColor: 'rgba(218, 215, 148, 1)',
        yAxisID: "y-axis-Target"
      };
      var yActualData = {
        label: 'Actual Sales Data',
        data: this.TotalActualSales,
        backgroundColor: 'rgba(131, 224, 1)',
        borderColor: 'rgba(218, 215, 148, 0.1)',
        yAxisID: "y-axis-Sales"
      };
      var xMonthData = {
        labels: this.Month,
        datasets: [ytargetData, yActualData]
      };
      var chartOptions = {
        scales: {
          xAxes: [{
            display: true,
          }],
          yAxes: [{
            id: "y-axis-Target"
          }
            , {
            id: "y-axis-Sales",
            display: false,

          }
          ]
        }
      };
      this.Linechart = new Chart('canvas', {
        type: 'bar',
        data: xMonthData,
        options: chartOptions
      });
    });
  }




  getdashboardCount() {
    this._EmployeeService.GetEmployeeDashboardCount(localStorage.getItem(constStorage.UserCode), this.UserType).subscribe((data: any) => {
      if(data!=null&& data !=''){
        console.log(data);
      this.MyDealers = data[0].DealerCount;
      this.OutStanding = (data[0].MyCustomers);
      this.DataDate = data[0].SystemDateTimedatetime;
      this._KAMComponent.setLoading(false);
      }
    },
    err => {
      this._KAMComponent.setLoading(false);
        console.log(err);
    })
  }


  GetbottomDealerListInEmployeeDashboard(value) {
    this._EmployeeService.GetbottomDealerListInEmployeeDashboard(localStorage.getItem(constStorage.UserCode), this.UserType, this.Todate,value).subscribe((data: any) => {
      this.BottomDealer = data;
      this._KAMComponent.setLoading(false);
    },
    err => {
      this._KAMComponent.setLoading(false);
        console.log(err);
    })
  }

  GetTopDealerListInEmployeeDashboard(value) {

    this._EmployeeService.GetTopDealerListInEmployeeDashboard(localStorage.getItem(constStorage.UserCode), this.UserType, this.Todate,value).subscribe((data: any) => {
      this.TopDealers = data;
      this._KAMComponent.setLoading(false);
    },
    err => {
      this._KAMComponent.setLoading(false);
        console.log(err);
    })
  }
  radioChange(value)
  {
this.GetTopDealerListInEmployeeDashboard(value);
this.GetbottomDealerListInEmployeeDashboard(value);
  }

}
