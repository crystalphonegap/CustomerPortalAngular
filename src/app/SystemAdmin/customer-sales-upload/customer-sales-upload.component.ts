import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/component/alert.service';
import { TargetSales } from 'src/app/shared/TargetSales';
import { SystemAdminComponent } from '../SystemAdmin.component';
import * as fileSaver from 'file-saver';
import { MatRadioChange } from '@angular/material';
@Component({
  selector: 'app-customer-sales-list',
  templateUrl: './customer-sales-upload.component.html',
  styleUrls: ['./customer-sales-upload.component.css']
})
export class CustomerSalesUploadComponent implements OnInit {

  constructor( private _SystemAdminComponent:SystemAdminComponent, public datepipe: DatePipe,private _TargetSales:TargetSales,
    private router: Router, private alertService : AlertService,) { }
  fileToUpload;
  SaleType='NCR';
  ngOnInit(): void {

  }

  Back(){
    this.router.navigateByUrl('/SystemAdmin/CustomerSalesList');
}


public uploadFile = (files) => {
  if (files.length === 0) {
    return;
  }
  this.fileToUpload = <File>files[0];
  }


BooleancheckForValueNotExist (value){
  return value == null || value =="";
}

// changeRadioButton(e)
// {
//   this.SaleType= e.value;
// }
Submit(){
  this.alertService.clear();
  const formData = new FormData();

  if(this.BooleancheckForValueNotExist(this.SaleType)){
    this.alertService.error("Please Select Sale Type");
    return;
  }
  if(this.BooleancheckForValueNotExist(this.fileToUpload)){
    this.alertService.error("Please attach file");
    return;
  }
  this._SystemAdminComponent.setLoading(true);
  formData.append('file',  this.fileToUpload,  this.fileToUpload.name);
   this._TargetSales.CustomerSalesExcelUpload(this.SaleType ,formData)
    .subscribe(
      (res: any) => {
        this._SystemAdminComponent.setLoading(false);
        this.router.navigateByUrl('/SystemAdmin/CustomerSalesList');
      },
      err => {
        this._SystemAdminComponent.setLoading(false);
        let error =err.error.text;
        if(error=='file is  uploaded Successfully.' ){
          this.alertService.error(error);
          this.router.navigateByUrl('/SystemAdmin/CustomerSalesList');
          this.alertService.error(error);
        } else if(err.status == 200 &&  error=='Error in Uploaded File' ){
          this.alertService.error(error);
          return;
        }
        else if (err.status == 400)
          this.alertService.error('Failed to upload.');
        else
          console.log(err);;
          return
      }
    );
}


download() {
  this._SystemAdminComponent.setLoading(true);
  this._TargetSales.DownloadCustomerSalesSampleExcel().subscribe(response => {
    let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    this._SystemAdminComponent.setLoading(false);
    fileSaver.saveAs(blob, 'SampleCustomerSalesUpload.xlsx');
  },
  err => {
    this._SystemAdminComponent.setLoading(false);
    console.log('Error downloading the file');
  }
    )
}

}
