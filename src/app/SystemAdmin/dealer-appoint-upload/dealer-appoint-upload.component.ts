import { Component, OnInit } from '@angular/core';
import { SystemAdminService } from '../../shared/SystemAdminService';
import {  Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../component/alert.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpEventType,HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import * as fileSaver from 'file-saver';
import { SalesPromoterTargetData } from 'src/app/shared/SalesPromoterTargetData';
import { SystemAdminComponent } from '../SystemAdmin.component';


@Component({
  selector: 'app-dealer-appoint-upload',
  templateUrl: './dealer-appoint-upload.component.html',
  styleUrls: ['./dealer-appoint-upload.component.css']
})
export class SystemAdminDealerAppointUploadComponent implements OnInit {


  public progress: number;
  public message: string;
 @Output() public onUploadFinished = new EventEmitter();
 constructor(private http: HttpClient,
  private _SystemAdminComponent:SystemAdminComponent,
  private router: Router,
  private _SalesPromoterTargetData: SalesPromoterTargetData , private alertService : AlertService) { }

  fileToUpload

ngOnInit() {
}
public uploadFile = (files) => {
  if (files.length === 0) {
    return;
  }
  this.fileToUpload = <File>files[0];


}
Submit(){
  this._SystemAdminComponent.setLoading(true);
  const formData = new FormData();
  formData.append('file',  this.fileToUpload,  this.fileToUpload.name);
  this._SalesPromoterTargetData.SalesPromoterTargetDataExcelUpload( formData)
    .subscribe(
      (res: any) => {
        this._SystemAdminComponent.setLoading(false);
        this.router.navigateByUrl('/SystemAdmin/ZMUpload');
      },
      err => {
        let error =err.error.text;
        this._SystemAdminComponent.setLoading(false);
        if(error=='file is  uploaded Successfully.' ){
          this.alertService.error(error);
        } else if(err.status == 200 &&  error=='Error in Uploaded File' ){
          this.alertService.error(error);
          this._SalesPromoterTargetData.DownloadErrorSalesPromoterTargetData().subscribe(response => {
            let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            fileSaver.saveAs(blob, 'ErrorLogfileforCustomerAppointmentUpload.xlsx');
          },
          err => {
            this._SystemAdminComponent.setLoading(false);
              console.log(err);
          })
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
  this._SalesPromoterTargetData.DownloadSampleExcel().subscribe(response => {
    let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    this._SystemAdminComponent.setLoading(false);
    fileSaver.saveAs(blob, 'SampleCustomerAppointmentUpload.xlsx');
  },
  err => {
    this._SystemAdminComponent.setLoading(false);
    console.log('Error downloading the file');
  }
    )
}

back()
{
  this.router.navigateByUrl('/SystemAdmin/DealerAppointList');
}

}

