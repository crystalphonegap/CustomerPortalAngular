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
  selector: 'app-target-sales',
  templateUrl: './target-sales.component.html',
  styleUrls: ['./target-sales.component.css']
})
export class SystemAdminTargetSalesComponent implements OnInit {
  public progress: number;
  public message: string;
 @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient,
    private _SystemAdminComponent:SystemAdminComponent,private formBuilder: FormBuilder,
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

  ReloadData(){
    this._SystemAdminComponent.setLoading(false);
    window.location.reload();
  }
  Submit(){
    this._SystemAdminComponent.setLoading(true);
    const formData = new FormData();
    formData.append('file',  this.fileToUpload,  this.fileToUpload.name);
    this._SystemAdminService.uploadTargetSalesExcelData( formData)
      .subscribe(
        (res: any) => {
          this.ReloadData();
          // this.router.navigateByUrl('/SystemAdmin/TargetSalesList');
        },
        err => {
          this._SystemAdminComponent.setLoading(false);
          let error =err.error.text;
          if(error=='file is  uploaded Successfully.' ){
            this.alertService.error(error);
          } else if(err.status == 200 &&  error=='Error in Uploaded File' ){
            this.alertService.error(error);
            this._SystemAdminService.DownloadErrorFileforEmployeeUpload("Regional Manager").subscribe(response => {
              let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
              const url = window.URL.createObjectURL(blob);
              fileSaver.saveAs(blob, 'ErrorLogfileforRMUpload.xlsx');
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
    this._SystemAdminService.DownloadSampleExcel().subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
      this._SystemAdminComponent.setLoading(false);
			fileSaver.saveAs(blob, 'SampleTargetSales.xlsx');
		},
    err => {
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })
  }
  back()
  {
    this.router.navigateByUrl('/SystemAdmin/TargetSalesList');
  }
}
