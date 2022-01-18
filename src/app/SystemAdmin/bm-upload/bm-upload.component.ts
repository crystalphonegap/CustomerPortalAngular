import { Component, OnInit } from '@angular/core';
import { SystemAdminService } from '../../shared/SystemAdminService';
import {  Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../component/alert.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpEventType,HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import * as fileSaver from 'file-saver';
import { SystemAdminComponent } from '../SystemAdmin.component';

@Component({
  selector: 'app-bm-upload',
  templateUrl: './bm-upload.component.html',
  styleUrls: ['./bm-upload.component.css']
})
export class SystemAdminBmUploadComponent implements OnInit {
  public progress: number;
  public message: string;
 @Output() public onUploadFinished = new EventEmitter();
 constructor(private http: HttpClient,
  private formBuilder: FormBuilder,
  private router: Router,
  private _SystemAdminService: SystemAdminService , private alertService : AlertService
  ,private _SystemAdminComponent:SystemAdminComponent) { }

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
  const formData = new FormData();
  this._SystemAdminComponent.setLoading(true);
  formData.append('file',  this.fileToUpload,  this.fileToUpload.name);
  this._SystemAdminService.uploadBMExcelData( formData)
    .subscribe(
      (res: any) => {
        this._SystemAdminComponent.setLoading(false);
        this.router.navigateByUrl('/SystemAdmin/EmployeeDetails');
      },
      err => {
        let error =err.error.text;
        this._SystemAdminComponent.setLoading(false);
          if(err.status == 200 &&  error=='Error in Uploaded File' ){
          let error =err.error.text;
          this.alertService.error(error);
          this._SystemAdminService.DownloadErrorFileforEmployeeUpload("Branch Manager").subscribe(response => {
            let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            fileSaver.saveAs(blob, 'ErrorLogfileforBMUpload.xlsx');
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
  this._SystemAdminService.DownloadSampleForEmployeeUpload("Branch Manager").subscribe(response => {
    let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    this._SystemAdminComponent.setLoading(false);
    fileSaver.saveAs(blob, 'SampleBMUpload.xlsx');
  },
  err => { 
    this._SystemAdminComponent.setLoading(false);
      console.log(err);
  })
}
back()
{
  this.router.navigateByUrl('/SystemAdmin/BMUpload');
}
}
