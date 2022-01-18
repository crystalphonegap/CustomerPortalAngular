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
import { constStorage } from 'src/app/models/Storege';
import { UserConstant } from 'src/app/models/Userconstant';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class CfAgentDashboardComponent implements OnInit {
  constructor(private _TargetSales: TargetSales, private _EmployeeService: EmployeeService, public datepipe: DatePipe, private router: Router, private _CFAgentService: CFAgentService
    , @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  Premium = 0;
  Todate;
  ProrateSale = 0;
  MyARs = 0;
  NoofDealersGOC
  NoofDealerLOC
  DealersGOA
  DealersLOA
  DealerGL
  DealerLL
  ActualSales = 0;
  TargetSales = 0;
  Achivement = 0;
  DealerApptTarget = 0;
  DealerApptActual = 0;
  RetailerApptTarget = 0;
  RetailerApptActual = 0;
  Month = [];
  TotalActualSales = [];
  TotalTargetSales = [];
  Linechart  ;
  Outstanding;
  UserCode;
  ngOnInit() {
  this.Search();
  }
Search(){
  let UserTypetxt = localStorage.getItem(constStorage.UserType);
  if (UserTypetxt == UserConstant.CFAgent) {
    this.UserCode = localStorage.getItem(constStorage.UserCode);
  } else {
    this.UserCode = localStorage.getItem(constStorage.UserCFCode);
  }
  this.Outstanding = 0;
  this.GetOutstandingDataCountforCFSPg30Days();
  this.GetOutstandingDataListforCFSP30Days();
  this.GetOutstandingDataListforCFSPg30Days();
  this.GetOutstandingDataCountforCFSP30Days();
  this.getdashboardCount();
  this.getbarchart();
  this.getTargetSalesforDashboard();

}

  getbarchart() {

    this.Todate = new Date();
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
    this._EmployeeService.GetTargetVsActualDataForEmployee(this.UserCode, UserConstant.CFAgent, this.Todate).subscribe((result: Targetsalesdata[]) => {
      result.forEach(x => {
        this.Month.push(x.Month);
        this.TotalTargetSales.push(x.TotalTargetSales);
        this.TotalActualSales.push(x.TotalActualSales);
      });
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
            ticks: {
                beginAtZero: true
            },
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



  getTargetSalesforDashboard() {
    this.Todate = new Date();
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');

    this._EmployeeService.GetEmployeeWiseSalesCount(this.UserCode, UserConstant.CFAgent, this.Todate).subscribe((res: any) => {

      if (res != null && res != '') {
        this.Achivement = res['0'].Achivement.toFixed(2);
        this.TargetSales = res['0'].TargetSales.toFixed(2);
        this.ActualSales = res['0'].ActualSales.toFixed(2);
        this.MyARs = res['0'].MyARS;
        this.ProrateSale = res['0'].PremiumSales.toFixed(2);
        this.Premium = res['0'].PremiumSalesPer.toFixed(2);
        if (this.Premium == 0.00) {
          this.Premium = 0;
        }
        if (this.ProrateSale == 0.00) {
          this.ProrateSale = 0;
        }
        if (this.MyARs == 0.00) {
          this.MyARs = 0;
        }
        if (this.ActualSales == 0.00) {
          this.ActualSales = 0;
        }
        if (this.TargetSales == 0.00) {
          this.TargetSales = 0;
        }
        if (this.Achivement == 0.00) {
          this.Achivement = 0;
        }

      }

    })
  }
  getdashboardCount() {
    this._CFAgentService.getCFAgentDashboard(this.UserCode).subscribe((data: any) => {
      this.DealerApptTarget = data[0].DealerCount;
      this.DealerApptActual = data[0].PendingOrderCount;
      this.RetailerApptTarget = data[0].TodaysOrderCount;
      this.RetailerApptActual = data[0].TotalOrderCount;
    })
  }

  GetOutstandingDataCountforCFSPg30Days() {
    this._EmployeeService.GetOutstandingDataCountforCFSPg30Days(this.UserCode, UserConstant.CFAgent).subscribe((data: any) => {
      this.NoofDealersGOC = data[0].DealerCount;
      this.DealersGOA = data[0].Amount;
      this.updateOutstanding();
    })
  }

  GetOutstandingDataCountforCFSP30Days() {
    this._EmployeeService.GetOutstandingDataCountforCFSP30Days(this.UserCode,UserConstant.CFAgent).subscribe((data: any) => {
      this.NoofDealerLOC = data[0].DealerCount;
      this.DealersLOA = data[0].Amount;

      this.updateOutstanding();
    })
  }

  updateOutstanding() {

    if (this.NoofDealersGOC == null || this.NoofDealersGOC == '') {
      this.NoofDealersGOC = 0;
    }
    if (this.NoofDealerLOC == null || this.NoofDealerLOC == '') {
      this.NoofDealerLOC = 0;
    }
    if (this.DealersGOA == null || this.DealersGOA == '') {
      this.DealersGOA = 0;
    }
    if (this.DealersLOA == null || this.DealersLOA == '') {
      this.DealersLOA = 0;
    }
    this.Outstanding = parseFloat(this.DealersLOA) + parseFloat(this.DealersGOA);
    this.Outstanding = this.Outstanding.toFixed(2);
  }
  GetOutstandingDataListforCFSP30Days() {
    this._EmployeeService.GetOutstandingDataListforCFSP30Days(this.UserCode, UserConstant.CFAgent).subscribe((data: any) => {
      this.DealerLL = data;
    })
  }

  GetOutstandingDataListforCFSPg30Days() {
    this._EmployeeService.GetOutstandingDataListforCFSPg30Days(this.UserCode,UserConstant.CFAgent).subscribe((data: any) => {
      this.DealerGL = data;
    })
  }

}
