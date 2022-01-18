import { AlertComponent } from './../../component/alert.component';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Chart } from 'chart.js';
import { CustomerService } from 'src/app/shared/CustomerService';
import { MaterialTestCertificateService } from 'src/app/shared/MaterialTestCertificateService';
import { TargetSales } from 'src/app/shared/TargetSales';
import { SystemAdminComponent } from '../SystemAdmin.component';
import { AlertService } from 'src/app/component/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  constructor(private router: Router,private alertService: AlertService,private _MaterialTestCertificateService: MaterialTestCertificateService,
    private _CustomerService:CustomerService,
     public datepipe: DatePipe, private _TargetSales: TargetSales, private sanitizer: DomSanitizer, private _SystemAdminComponent: SystemAdminComponent,) { }
  PaymnetSales;
  NCR;
  NCRCanvos = "NCRCanvos";
  PaymnetSalesCanvos = "PaymnetSalesCanvos";
  TranscationSalesHistoryCanvos = "TranscationSalesHistoryCanvos";
  TranscationSalesHistory ;
  SalesBreakUp = [];
  Mason = [];
  Retailer = [];
  TargetSales;
  TargetSalesCanvos = "TargetSalesCanvos";
  UserCode;
  fileToUpload;
  LoadedfileToUpload;
  submitphoto = false;
  deletephoto = false;
  Reports = [];
  CustomerProfileEffective ;
  CustomerProfileConsistency;
  showMason="none";
  showRetailer="none";
  Columns = [];
  DealerEffectiveLastMonth;
  rows = [];
  rows2 = [];
  Base;
  ProfileData;
  rows1 = [];
  Todate;
  base64textString;
  ngOnInit(): void {
    Chart.defaults.global.legend.display = false;
    this.Todate = new Date();
    this.Todate = this.datepipe.transform(this.Todate, 'dd-MM-yyyy');
    this.UserCode = localStorage.getItem('CustCode');
    this.getProfile();
    this.getprofileimage();
    this.GetNCRForDealerProfile();
    this.GetPaymnetSalesForDealerProfile();
    this.GetSalesBreakUpForDealerProfile();
    this.GetTargetSalesForDealerProfile();
    this.getMason();
    this.getRetailer();
    this.GetCustomerProfileTranscationSalesHistory();
    this.GetCustomerProfileEffective();
    this.GetCustomerProfileConsistency();
  }
  ondeletephotoclick() {
    this.deletephoto = true;
  }

  getProfile() {
    this._MaterialTestCertificateService.GetStaticDealerProfileData(this.UserCode).subscribe((res: any) => {
      this._SystemAdminComponent.setLoading(false);
      this.ProfileData = res[0];
    },
      err => {
        this._SystemAdminComponent.setLoading(false);

        console.log(err)
      })

  }

  getRetailer() {
    this._CustomerService.getGetShipToData(this.UserCode).subscribe((res: any) => {
      this._SystemAdminComponent.setLoading(false);
      this.Retailer = res;
    },
      err => {
        this._SystemAdminComponent.setLoading(false);

        console.log(err)
      })

  }
  showMasonfucn(value){
    if(value){
      this.showMason="block";

    }else{
      this.showMason="none";

    }
  }
  showRetailerfucn(value){
    if(value){
      this.showRetailer="block";

    }else{
      this.showRetailer="none";

    }
  }

  getMason() {
    this._CustomerService.getMasonSearch( 0, 10, this.UserCode).subscribe((res: any) => {
      this._SystemAdminComponent.setLoading(false);
      this.Mason = res;
    },
      err => {
        this._SystemAdminComponent.setLoading(false);

        console.log(err)
      })

  }
  getprofileimage() {
    this._MaterialTestCertificateService.GetImageByID(this.UserCode, "DealerProfile").subscribe((res: any) => {
      this._SystemAdminComponent.setLoading(false);
      this.Base = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${res}`);
      this.LoadedfileToUpload = this.Base;
    },
      err => {
        this._SystemAdminComponent.setLoading(false);

        console.log(err)
      })

  }

  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(localStorage.getItem('base64Image'));
  }

  public uploadFile = (files) => {
    this._SystemAdminComponent.setLoading(true);
    if (files === null) {
      this.Base = this.LoadedfileToUpload;
      this.submitphoto = false;
      this.deletephoto = false;
      this._SystemAdminComponent.setLoading(false);
      return;
    }
    if (files.length === 0) {
      this.Base = this.LoadedfileToUpload;
      this.deletephoto = false;
      this.submitphoto = false;
      this._SystemAdminComponent.setLoading(false);
      return;
    }

    this.fileToUpload = <File>files[0];


    if (files && this.fileToUpload) {
      var reader = new FileReader();

      reader.onload = this.handleFile.bind(this);

      reader.readAsBinaryString(this.fileToUpload);
      this.submitphoto = true;
      this._SystemAdminComponent.setLoading(false);
    }


  }
  handleFile(event) {
    var binaryString = event.target.result;
    this.base64textString = btoa(binaryString);
    this.Base = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.base64textString}`);
  }


  UpdateUserProfileImage() {
    let model = {
      UserCodetxt: this.UserCode,
      AttachmentBytesvtxt: this.base64textString
    }
    this._SystemAdminComponent.setLoading(true);
    this._MaterialTestCertificateService.UpdateUserProfileImage(model).subscribe((result: any) => {
      this.submitphoto = false
      if(result==0){
        this.alertService.error("Customer Profile did not updated as customer has not register")
      }else{

        this.alertService.error("Customer Profile updated  successfully")
      }
      this._SystemAdminComponent.setLoading(false);
    },
      err => {
        this._SystemAdminComponent.setLoading(false);
        console.log(err);
      });

  }


  DeleteUserProfileImage() {
    let model = {
      UserCodetxt: this.UserCode,
      AttachmentBytesvtxt: null
    }
    this._SystemAdminComponent.setLoading(true);
    this._MaterialTestCertificateService.UpdateUserProfileImage(model).subscribe((result: any) => {
      this.submitphoto = false
      this.getprofileimage();
      this._SystemAdminComponent.setLoading(false);
    },
      err => {
        this._SystemAdminComponent.setLoading(false);
        console.log(err);
      });

  }



  GetPaymnetSalesForDealerProfile() {
    let Month = [], TotalPaymentSales = [];
    this._SystemAdminComponent.setLoading(true);
    this._TargetSales.GetNCRorPaymnetSalesForDealerProfile(this.UserCode, this.Todate, "Payment").subscribe((result: any) => {
      result.forEach(x => {
        Month.push(x.Month + '_' + x.YEAR);
        TotalPaymentSales.push(x.TotalPaymentSales);
        // YEAR.push(x.YEAR);
      });
      const data = {
        labels: Month,
        beginAtZero: true,
        datasets: [{
          label: 'Payment/CD Reversal History (last 9 months)',
          data: TotalPaymentSales,
          fill: true,
          borderColor: 'rgb(2,211,114)',
          tension: 0.1
        }]
      };

      this.PaymnetSales = new Chart(this.PaymnetSalesCanvos, {
        type: 'line',
        data: data
      });


      this._SystemAdminComponent.setLoading(false);
    },
      err => {
        this._SystemAdminComponent.setLoading(false);
        console.log(err);
      });

  }


  GetNCRForDealerProfile() {
    let Month = [], TotalNCRSales = [];
    this._SystemAdminComponent.setLoading(true);
    this._TargetSales.GetNCRorPaymnetSalesForDealerProfile(this.UserCode, this.Todate, "NCR").subscribe((result: any) => {
      result.forEach(x => {
        Month.push(x.Month + '_' + x.YEAR);
        TotalNCRSales.push(x.TotalNCRSales);
        // YEAR.push(x.YEAR);
      });
      const data = {
        labels: Month,

        beginAtZero: true,
        datasets: [{
          label: 'NCR Revenues (rolling 9 months)',

          data: TotalNCRSales,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };

      this.NCR = new Chart(this.NCRCanvos, {
        type: 'line',
        data: data
      });
      this._SystemAdminComponent.setLoading(false);
    },
      err => {
        this._SystemAdminComponent.setLoading(false);
        console.log(err);
      });

  }


  GetSalesBreakUpForDealerProfile() {
    this._SystemAdminComponent.setLoading(true);
    this._TargetSales.GetSalesBreakUpForDealerProfile(this.UserCode, this.Todate).subscribe((result: any) => {

      this.Reports = result;
      this.Columns = [];
      this.rows = [];
      this.rows1 = [];
      // this.rows2 = [];

      if (this.Reports.length > 0) {
        for (const [key, value] of Object.entries(this.Reports[0])) {
          this.Columns.push(key);
        }
      }
      for (let columncount = 0; columncount < this.Columns.length; columncount++) {
        for (let count = 0; count < this.Reports.length; count++) {
          if (count == 0) {

            if (this.Reports[0][this.Columns[0]] == 'Couter Sales') {
              this.rows = this.Reports[0]
            } else if (this.Reports[0][this.Columns[0]] == 'Retailer Sales') {
              this.rows1 = this.Reports[0]
            // } else {
            //   this.rows2 = this.Reports[0]
            }
          }
          if (count == 1) {
            if (this.Reports[1][this.Columns[0]] == 'Couter Sales') {
              this.rows = this.Reports[1]
            } else if (this.Reports[1][this.Columns[0]] == 'Retailer Sales') {
              this.rows1 = this.Reports[1]
            // } else {
            //   this.rows2 = this.Reports[1]
            }
          }
          // if (count == 2) {
          //   if (this.Reports[2][this.Columns[0]] == 'Couter Sales') {
          //     this.rows = this.Reports[2]
          //   } else if (this.Reports[2][this.Columns[0]] == 'Mason Sales') {
          //     this.rows1 = this.Reports[2]
          //   } else {
          //     this.rows2 = this.Reports[2]
          //   }
          }

      }

      this._SystemAdminComponent.setLoading(false);
    },
      err => {
        this._SystemAdminComponent.setLoading(false);
        console.log(err);
      });
  }




  GetTargetSalesForDealerProfile() {
    let Month = [];
    let TotalTargetSales = [];
    let TotalActualSales = [];
    this._SystemAdminComponent.setLoading(true);
    this._TargetSales.GetTargetSalesForDealerProfile(this.UserCode, this.Todate).subscribe((result: any) => {
      result.forEach(x => {
        Month.push(x.Month + '_' + x.YEAR);
        TotalTargetSales.push(x.TotalTargetSales);
        TotalActualSales.push(x.TotalActualSales);
      });
      var ytargetData = {
        label: 'Target Sales Data',
        data: TotalTargetSales,
        backgroundColor: 'rgba(59, 147, 250)',
        borderColor: 'rgba(218, 215, 148, 1)',
        yAxisID: "y-axis-Target"
      };
      var yActualData = {
        label: 'Actual Sales Data',
        data: TotalActualSales,
        backgroundColor: 'rgba(131, 224, 1)',
        borderColor: 'rgba(218, 215, 148, 0.1)',
        yAxisID: "y-axis-Sales"
      };
      var xMonthData = {
        labels: Month,
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
            beginAtZero: true,
            id: "y-axis-Sales",
            display: false,

          }
          ]
        }
      };
      this.TargetSales = new Chart(this.TargetSalesCanvos, {
        type: 'bar',
        data: xMonthData,
        options: chartOptions
      });
      this._SystemAdminComponent.setLoading(false);
    },
      err => {
        this._SystemAdminComponent.setLoading(false);
        console.log(err);
      });
  }



  GetCustomerProfileTranscationSalesHistory() {
    let Month = [];

    this._SystemAdminComponent.setLoading(true);
    this._TargetSales.GetCustomerProfileTranscationSalesHistory(this.UserCode, this.Todate ).subscribe((result: any) => {

      Month=['previous month'];
      var TotalSalesHistory = {
        label: 'TotalSalesHistory',
        data:[result.TotalSalesHistory],
        backgroundColor: 'rgba(59, 147, 250)',
        borderColor: 'rgba(218, 215, 148, 1)',
        yAxisID: "y-axis-Target"

      };
      var ChampionPlusPerHistory = {
        label: 'ChampionPlusPerHistory',
        data: [result.ChampionPlusPerHistory],
        backgroundColor: 'rgba(131, 224, 1)',
        borderColor: 'rgba(218, 215, 148, 0.1)',
        yAxisID: "y-axis-Sales"
      };

      var DuraTechPerHistory = {
        label: 'DuraTechPerHistory',
        data: [result.DuraTechPerHistory],
        backgroundColor: 'rgba(131, 224, 1)',
        borderColor: 'rgba(218, 215, 148, 0.1)',
        yAxisID: "y-axis-Sales"
      };

      var xMonthData = {
        labels:  Month,
        datasets: [TotalSalesHistory, ChampionPlusPerHistory,DuraTechPerHistory]
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
              ticks: {
                  beginAtZero: true
              },
            id: "y-axis-Sales",
            display: false,

          }
          ],
          beginAtZero: true,
        }
      };


      this.TranscationSalesHistory = new Chart(this.TranscationSalesHistoryCanvos, {
        type: 'bar',
        data: xMonthData,
        options: chartOptions,
      });

      this._SystemAdminComponent.setLoading(false);
    },
      err => {
        this._SystemAdminComponent.setLoading(false);
        console.log(err);
      });

  }



  GetCustomerProfileConsistency() {
    this._SystemAdminComponent.setLoading(true);
    this._TargetSales.GetCustomerProfileConsistency(this.UserCode, this.Todate ).subscribe((result: any) => {
      this.CustomerProfileConsistency=result;
      this._SystemAdminComponent.setLoading(false);
    },
      err => {
        this._SystemAdminComponent.setLoading(false);
        console.log(err);
      });

  }

  GetCustomerProfileEffective() {
    this._SystemAdminComponent.setLoading(true);
    this._TargetSales.GetCustomerProfileEffective(this.UserCode, this.Todate ).subscribe((result: any) => {
      this.CustomerProfileEffective=result;
      this._SystemAdminComponent.setLoading(false);
    },
      err => {
        this._SystemAdminComponent.setLoading(false);
        console.log(err);
      });

  }

BacK(){
  this.router.navigateByUrl('/SystemAdmin/SwicthUser');
}

}
