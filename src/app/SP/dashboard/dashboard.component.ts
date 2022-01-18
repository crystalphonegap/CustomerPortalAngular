

import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CFAgentService } from 'src/app/shared/CFAgentService';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { DatePipe } from '@angular/common';
import { EmployeeService } from 'src/app/shared/EmployeeService';
import { TargetSales } from 'src/app/shared/TargetSales';
import { Chart } from 'chart.js';
import {Targetsalesdata} from 'src/app/models/targetsalesdata';
import { SalesPromoterTargetData } from 'src/app/shared/SalesPromoterTargetData';
import { SPComponent } from '../SP.component';
import { UserConstant } from 'src/app/models/Userconstant';
import { constStorage } from 'src/app/models/Storege';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class SPDashboardComponent implements OnInit {
constructor(private _TargetSales:TargetSales,private _SPComponent:SPComponent, private _EmployeeService:EmployeeService,
    public datepipe: DatePipe,private router: Router, private _CFAgentService: CFAgentService,
    private _SalesPromoterTargetData:SalesPromoterTargetData
    ,  @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
      Premium=0;
      Todate;
      ProrateSale=0;
   MyARs=0;
   NoofDealersGOC;
   NoofDealerLOC;
   DealersGOA;
   DealersLOA;
   DealerGL :any=[];
   DealerLL :any=[];
   ActualSales=0;
    TargetSales=0;
   Achivement=0;
   Monthvtxt;
    DealerTargetApptint=0;
    DealerActualApptint=0;
    RetailerTargetApptint=0;
    RetailerActualApptint=0;

    Month = [];
    TotalActualSales = [];
    TotalTargetSales = [];
    Linechart ;
    Outstanding;
    UserCode;
    UserTypetxt:string;
  ngOnInit() {

    this.UserTypetxt=  localStorage.getItem(constStorage.UserType);
    if(this.UserTypetxt==UserConstant.SalesPromoter || this.UserTypetxt==UserConstant.OrderAnalyst){
      this.UserCode= localStorage.getItem(constStorage.UserCode);
    }else{
      this.UserTypetxt=UserConstant.SalesPromoter ;
      this.UserCode=localStorage.getItem(constStorage.UserSPCode);
    }
    this.Outstanding=0;
    this.SalesPromoterTargetDataForDashboard();
    this.GetOutstandingDataCountforSPSPg30Days();
    this.GetOutstandingDataListforSPSP30Days();
    this.GetOutstandingDataListforSPSPg30Days();
    this. GetOutstandingDataCountforSPSP30Days();
    this.getbarchart();
    this.getTargetSalesforDashboard();
  }
  SalesPromoterTargetDataForDashboard(){
  this._SPComponent.setLoading(true);
    this._SalesPromoterTargetData.SalesPromoterTargetDataForDashboard(this.UserCode,this.UserTypetxt).subscribe((data: any) => {
      if(data!=null&& data!=''){
        this.DealerTargetApptint = data[0].DealerTargetApptint;
        this.DealerActualApptint = data[0].DealerActualApptint;
        this.RetailerTargetApptint = data[0].RetailerTargetApptint;
        this.RetailerActualApptint = data[0].RetailerActualApptint;
        this.Monthvtxt= data[0].Monthvtxt;
      }

      this._SPComponent.setLoading(false);
    })
  }

  getbarchart()
  {

  this._SPComponent.setLoading(true);
    this.Todate  = new Date();
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
    this._EmployeeService.GetTargetVsActualDataForEmployee(this.UserCode,this.UserTypetxt,this.Todate).subscribe((result: Targetsalesdata[]) => {
      result.forEach(x => {
        this.Month.push(x.Month);
        this.TotalTargetSales.push(x.TotalTargetSales);
        this.TotalActualSales.push(x.TotalActualSales);
      });
      this._SPComponent.setLoading(false);
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
            ticks: {
                beginAtZero: true
            },
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
    this.Todate  = new Date();
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
    this._SPComponent.setLoading(true);

    this._EmployeeService.GetEmployeeWiseSalesCount(this.UserCode,this.UserTypetxt,this.Todate).subscribe((res: any) => {

      if(res!=null&& res !=''){
        this.Achivement=res['0'].Achivement.toFixed(2);
        this.TargetSales=res['0'].TargetSales.toFixed(2);
        this.ActualSales=res['0'].ActualSales.toFixed(2);
        this.MyARs=res['0'].MyARS;
        this.ProrateSale=res['0'].PremiumSales.toFixed(2);
        this.Premium=res['0'].PremiumSalesPer.toFixed(2);
        if( this.Premium==0.00){
          this.Premium=0;
        }
        if( this.ProrateSale==0.00){
          this.ProrateSale=0;
        }
        if( this.MyARs==0.00){
          this.MyARs=0;
        }
        if( this.ActualSales==0.00){
          this.ActualSales=0;
        }
        if( this.TargetSales==0.00){
          this.TargetSales=0;
        }
        if( this.Achivement==0.00){
          this.Achivement=0;
        }
        this._SPComponent.setLoading(false);
      }

    })
  }

  GetOutstandingDataCountforSPSPg30Days() {
    this._SPComponent.setLoading(true);
    this._EmployeeService.GetOutstandingDataCountforCFSPg30Days(this.UserCode,this.UserTypetxt).subscribe((data: any) => {
      if(data!=null&& data!=''){
      this.NoofDealersGOC =  data[0].DealerCount;
      this.DealersGOA =  data[0].Amount;
      }
  this._SPComponent.setLoading(false);
      this.updateOutstanding();
    })
  }

  GetOutstandingDataCountforSPSP30Days() {
    this._SPComponent.setLoading(true);
    this._EmployeeService.GetOutstandingDataCountforCFSP30Days(this.UserCode,this.UserTypetxt).subscribe((data: any) => {
      if(data!=null&& data!=''){
      this.NoofDealerLOC =  data[0].DealerCount;
      this.DealersLOA =  data[0].Amount;
      }
      this._SPComponent.setLoading(false);

      this.updateOutstanding();
    })
  }

  updateOutstanding(){

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
    this.Outstanding= parseFloat (this.DealersLOA) +parseFloat (this.DealersGOA);
    // this.Outstanding =this.Outstanding * -1;
    this.Outstanding=this.Outstanding.toFixed(2);
  }
  GetOutstandingDataListforSPSP30Days() {
    this._SPComponent.setLoading(true);
    this._EmployeeService.GetOutstandingDataListforCFSP30Days(this.UserCode,this.UserTypetxt).subscribe((data: any) => {
      this.DealerLL=data;
      this._SPComponent.setLoading(false);
    })
  }

  GetOutstandingDataListforSPSPg30Days() {
    this._SPComponent.setLoading(true);
    this._EmployeeService.GetOutstandingDataListforCFSPg30Days(this.UserCode,this.UserTypetxt).subscribe((data: any) => {
      this.DealerGL=data;
      this._SPComponent.setLoading(false);
    })
  }

}
