import { Component, OnInit } from '@angular/core';
import { SystemAdminService } from '../../shared/SystemAdminService';
import {  Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../component/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpEventType,HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import * as fileSaver from 'file-saver';
import { SystemAdminComponent } from '../SystemAdmin.component';
import { LoyalityPointsService } from 'src/app/shared/LoyalityPointsService';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-Loyality-Points-upload.component',
  templateUrl: './Loyality-Points-upload.component.html',
  styleUrls: ['./Loyality-Points-upload.component.css']
})
export class LoyalityPointsUploadComponent implements OnInit {

  public progress: number;
  public message: string;
 @Output() public onUploadFinished = new EventEmitter();
 constructor(  private _SystemAdminComponent:SystemAdminComponent, public datepipe: DatePipe,
  private router: Router,
  private _LoyalityPointsService: LoyalityPointsService , private alertService : AlertService) { }
  formGroupName = new FormGroup({
    TillDateDatetime:new FormControl(new Date(), [Validators.required])
  })
  loadedDate
  fileToUpload

ngOnInit() {
  this.loadedDate=true;
}

changeDateLoad(){
this.loadedDate=false
}


public uploadFile = (files) => {
  if (files.length === 0) {
    return;
  }
  this.fileToUpload = <File>files[0];
  }
Submit(){
  const formData = new FormData();
  this._SystemAdminComponent.setLoading(true);
  let DatetoSend
  if(this.loadedDate==false){
    DatetoSend =  this.datepipe.transform(this.formGroupName.controls['TillDateDatetime'].value._d, 'dd-MM-yyyy');
  }
  else
  {
    DatetoSend =this.datepipe.transform(new   Date(), 'dd-MM-yyyy') ;
  }

  formData.append('file',  this.fileToUpload,  this.fileToUpload.name);
  this._LoyalityPointsService.LoyalityPointsExcelUpload(DatetoSend,formData)
    .subscribe(
      (res: any) => {
        this._SystemAdminComponent.setLoading(false);
        this.router.navigateByUrl('/SystemAdmin/LoyalityPointsList');
      },
      err => {
        this._SystemAdminComponent.setLoading(false);
        let error =err.error.text;
        this.alertService.error(error);
        if(error=='file is  uploaded Successfully.' ){
        } else if(err.status == 200 &&  error=='Error in Uploaded File' ){
          this.alertService.error(error);
          this._LoyalityPointsService.DownloadErrorLoyalityPointsTargetData().subscribe(response => {
            let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            fileSaver.saveAs(blob, 'ErrorLogfileforLoyalityPointsUpload.xlsx');
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
  this._LoyalityPointsService.DownloadSampleExcel().subscribe(response => {
    let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    this._SystemAdminComponent.setLoading(false);
    fileSaver.saveAs(blob, 'SampleLoyalityPointsUpload.xlsx');
  },
  err => {
    this._SystemAdminComponent.setLoading(false);
    console.log('Error downloading the file');
  }
    )
}

back()
{
  this.router.navigateByUrl('/SystemAdmin/LoyalityPointsList');
}

}

