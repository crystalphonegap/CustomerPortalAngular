import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl ,Validators, AbstractControl } from '@angular/forms';
import { CustomerService } from 'src/app/shared/CustomerService';
import { SalesOrderService } from 'src/app/shared/SalesOrderService';
import { DeliveryOrderService } from 'src/app/shared/DeliveryOrderService';
import { TargetSales } from 'src/app/shared/TargetSales';
import { DatePipe } from '@angular/common';
import { Chart } from 'chart.js';
import {Targetsalesdata} from 'src/app/models/targetsalesdata';
import { RFCCallService } from 'src/app/shared/RFCCallService';
import { CustomerComponent } from '../Customer.component';
import { LoyalityPointsService } from 'src/app/shared/LoyalityPointsService';
import { RoleManagementService } from 'src/app/shared/RoleManagementService';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  data: Targetsalesdata[];
  Month = [];
  TotalActualSales = [];
  TotalTargetSales = [];
  Linechart  ;
  LinechartBrandWise = [];
  Linechartt ;
  ShowLoyalityPoints='none';
  PremiumPer: string='none';
  PremiumSales: string='none';
  Achievementper: string='none';
  MonthlyTarget: string='none';
  MyARss: string='none';
  LoyaltyPointss: string='none';
  EarnLoyalityPointss:string='none';
  ReedemLoyalityPointss:string='none';

  constructor(private _RoleManagementService: RoleManagementService,private _LoyalityPointsService:LoyalityPointsService,private _RFCCallService:RFCCallService,
     public datepipe: DatePipe,private _TargetSales:TargetSales, private router: Router, private _CustomerService: CustomerService
    , public paginationService: PaginationService, private _CustomerComponent:CustomerComponent,
     private _SalesService :SalesOrderService,
    private _DeliveryOrderService :DeliveryOrderService ) {
     }
RFCoutStanding:number;
TotalOrders;
ActualSales=0;
Achivement=0;
ProrateSale=0;
Premium=0;
TargetSales=0;
PremiumSalesChamp=0;
PremiumSalesChampPlus=0;
PremiumSalesDuratech=0;
PremiumSalesChampPer=0;
PremiumSalesChampPlusPer=0;
PremiumSalesDuratechPer=0;
DataDate;
LoyalityDate;
MyARs=0;
LoyaltyPoints=0;
EarnLoyalityPoints=0;
ReedemLoyalityPoints=0;
OutStanding;
AvailableCreditLimit;
Todate
RetailOrder;
UserCode;
TypeNT:string='none';
TypeNTN:string='inherit';
canvasNT="";
canvasNTN="canvas";
CustomerUserType='TR' ;
  ngOnInit(): void {

    this.Todate  = new Date();
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');

    let UserTypetxt=  localStorage.getItem('UserType');
    if(UserTypetxt=='Customer'){
      this.UserCode= localStorage.getItem('UserCode');
    }else{
      this.UserCode=localStorage.getItem('CustCode');
    }
    this.getLoyaltyPointsforDashboard();
    this.getAllOutStandingforDashboard();
    this.getAllOrdersCountforDashboard();
    this.getAllSalesOrderforDashboard();
    this.getTargetSalesforDashboard();
    this.getbarchart();
   this.GetUserRolesDetailsByCustomercode();
  }

  GetUserRolesDetailsByCustomercode(){
    this._RoleManagementService.GetUserRolesDetailsByCustomercode(this.UserCode).subscribe(
      (res: any) => {
        if (res.Typevtxt == "NT") {
          this.CustomerUserType= "NT";
          this.canvasNT="canvas";
          this.canvasNTN="";
          this.TypeNT='inherit';
          this.TypeNTN='none';
           this.PremiumPer = 'none';
           this.PremiumSales='none';
           this.Achievementper='none';
           this.MonthlyTarget='none';
           this.MyARss='none';
           this.LoyaltyPointss='none';
          // this.PlaceOrderRequest = 'none';
          // this.OrdersPlaced = 'none';
          // this.MyOrderList = 'none';
          // this.MyRetailList = 'none';
          // this.Retailer = 'none';
          // this.promoter="TPC";
        }
        else
        {
          this.CustomerUserType= "TR";
          this.canvasNT="";
          this.canvasNTN="canvas";
          this.TypeNT='none';
          this.TypeNTN='inherit';
          this.PremiumPer = 'block';
          this.PremiumSales='block';
          this.Achievementper='block';
          this.MonthlyTarget='block';
          this.MyARss='block';
          this.LoyaltyPointss='block';
         // this.promoter="Sales Promoter";

        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getbarchart()
  {
   this._CustomerComponent.setLoading(true);
    this._TargetSales.getTargetSalesforDashboardBarChart( this.UserCode,this.Todate).subscribe((result: Targetsalesdata[]) => {
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

    this._CustomerComponent.setLoading(false);
  }

  getTargetSalesforDashboard() {
    this._CustomerComponent.setLoading(true);
    this.Todate  = new Date();
    //ADDED BY SUMAN ON 06_07_2021
    //this.Todate='01-03-2021';
    //ADDED BY SUMAN ON 06_07_2021
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');

    this._TargetSales.getTargetSalesforDashboard( this.UserCode,this.Todate).subscribe((res: any) => {

      this._CustomerComponent.setLoading(false);
      if(res!=null&& res !=''){
        this.Achivement=res['0'].Achivement.toFixed(2);
        this.TargetSales=res['0'].TargetSales.toFixed(2);
        this.ActualSales=res['0'].ActualSales.toFixed(2);
        this.MyARs=res['0'].MyARS;
        this.ProrateSale=res['0'].PremiumSales.toFixed(2);
        this.Premium=res['0'].PremiumSalesPer.toFixed(2);
        this.PremiumSalesDuratechPer=res['0'].PremiumSalesDuratechPer.toFixed(2);
        this.PremiumSalesChampPlusPer=res['0'].PremiumSalesChampPlusPer.toFixed(2);
        this.PremiumSalesChampPer=res['0'].PremiumSalesChampPer.toFixed(2);
        this.PremiumSalesDuratech=res['0'].PremiumSalesDuratech.toFixed(2);
        this.PremiumSalesChampPlus=res['0'].PremiumSalesChampPlus.toFixed(2);
        this.PremiumSalesChamp=res['0'].PremiumSalesChamp.toFixed(2);

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

        if( this.PremiumSalesChamp==0.00){
          this.PremiumSalesChamp=0;
        }
        if( this.PremiumSalesChampPlus==0.00){
          this.PremiumSalesChampPlus=0;
        }

        if( this.PremiumSalesDuratech==0.00){
          this.PremiumSalesDuratech=0;
        }
        if( this.PremiumSalesChampPer==0.00){
          this.PremiumSalesChampPer=0;
        }
        if( this.PremiumSalesChampPlusPer==0.00){
          this.PremiumSalesChampPlusPer=0;
        }
        if( this.PremiumSalesDuratechPer==0.00){
          this.PremiumSalesDuratechPer=0;
        }


      }

    });
  }

  getAllOrdersCountforDashboard() {
    this._CustomerComponent.setLoading(true);
    this._DeliveryOrderService.getAllOrdersCountforDashboard( this.UserCode).subscribe((res: any) => {
      this.TotalOrders = res;
      this._CustomerComponent.setLoading(false);
    })
  }
  getAllOutStandingforDashboard() {

    this._CustomerComponent.setLoading(true);
    this._CustomerService.getAllOutStandingforDashboard( this.UserCode).subscribe((res: any) => {

  if(res.length!=0){
      this.DataDate =res[0].SystemDateTimedatetime,
      //  this.datepipe.transform( res[0].SystemDateTimedatetime, 'dd-MM-yyyy');
      this.OutStanding = res[0].OutStandingdcl;
      // this.CreditLimit = res[0].CreditLimitdcl;
      this.AvailableCreditLimit = res[0].AvailableCreditLimitdcl;
      // this.OutStanding = this.OutStanding *-1;
      this._CustomerComponent.setLoading(false);
      }
    })
  }

  Refreash(){
    this._CustomerComponent.setLoading(true);
    this._RFCCallService.getAllOutStandingforDashboardFromRFC( this.UserCode).subscribe((res: any) => {
      this.RFCoutStanding = res;
       this.getAllOutStandingforDashboard();
    })
  }

  getAllSalesOrderforDashboard() {
    this._CustomerComponent.setLoading(true);
    this._SalesService.getAllSalesOrderforDashboard( this.UserCode).subscribe((res: any) => {
      this.RetailOrder = res;
      this._CustomerComponent.setLoading(false);
    })
  }

  getLoyaltyPointsforDashboard() {
    this._CustomerComponent.setLoading(true);
    this._LoyalityPointsService.GetLoyalityPointsDashboard( this.UserCode).subscribe((res: any)  => {

      if(res!=null){
        this.ShowLoyalityPoints='inherit';
          this.LoyalityDate = this.datepipe.transform(res.TillDateDatetime, 'dd-MM-yyyy');
          this.EarnLoyalityPoints = res.EarnPoints;
          this.ReedemLoyalityPoints = res.UtilizePoints;
          this._CustomerComponent.setLoading(false);
          }
          else{
            this.ShowLoyalityPoints='none';
          }
        })
  }

}
