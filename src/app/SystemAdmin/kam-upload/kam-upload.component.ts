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
  selector: 'app-kam-upload',
  templateUrl: './kam-upload.component.html',
  styleUrls: ['./kam-upload.component.css']
})
export class SystemAdminKAMUploadComponent implements OnInit {

  public progress: number;
  public message: string;
 @Output() public onUploadFinished = new EventEmitter();
 constructor(private http: HttpClient,
  private _SystemAdminComponent:SystemAdminComponent, private formBuilder: FormBuilder,
  private router: Router,
  private _SystemAdminService: SystemAdminService , private alertService : AlertService) { }

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
  this._SystemAdminService.KAMUpload( formData)
    .subscribe(
      (res: any) => {
        this._SystemAdminComponent.setLoading(false);
        this.router.navigateByUrl('/SystemAdmin/ZMUpload');
      },
      err => {
        this._SystemAdminComponent.setLoading(false);
        let error =err.error.text;
        if(error=='file is  uploaded Successfully.' ){
          this.alertService.error(error);
        } else if(err.status == 200 &&  error=='Error in Uploaded File' ){
          this.alertService.error(error);
          this._SystemAdminService.DownloadErrorFileforEmployeeUpload("KAM").subscribe(response => {
            let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            fileSaver.saveAs(blob, 'ErrorLogfileforZMUpload.xlsx');
          },
          err => {
            this._SystemAdminComponent.setLoading(false);
            console.log('Error downloading the file');
          }
            )
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
  this._SystemAdminService.DownloadSampleForEmployeeUpload("KAM").subscribe(response => {
    let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
    this._SystemAdminComponent.setLoading(false);
    const url = window.URL.createObjectURL(blob);
    fileSaver.saveAs(blob, 'SampleKAMUpload.xlsx');
  },
  err => {
    this._SystemAdminComponent.setLoading(false);
    console.log('Error downloading the file');
  }
    )
}
back()
{
  this.router.navigateByUrl('/SystemAdmin/KAMUpload');
}

}
