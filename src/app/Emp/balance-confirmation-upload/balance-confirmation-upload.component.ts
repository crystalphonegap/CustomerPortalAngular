import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../component/alert.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpEventType, HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import * as fileSaver from 'file-saver';
import { BalanceConfirmation } from 'src/app/shared/BalanceConfirmation';
import { DatePipe } from '@angular/common';
import { constStorage } from 'src/app/models/Storege';
import { EmpComponent } from '../Emp.component';


@Component({
  selector: 'app-balance-confirmation-upload',
  templateUrl: './balance-confirmation-upload.component.html',
  styleUrls: ['./balance-confirmation-upload.component.css']
})
export class BalanceConfirmationUploadComponent implements OnInit {
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private _EmpComponent: EmpComponent,
    public datepipe: DatePipe,
    private router: Router,
    private _BalanceConfirmation: BalanceConfirmation, private alertService: AlertService) { }
  fileToUpload
  FormData: FormGroup;
  Type:string='C';
  ngOnInit() {
    this.FormData = new FormGroup({
      StartDatedate: new FormControl('', [Validators.required, Validators.maxLength(256)]),
      EndDatedate: new FormControl('', [Validators.required, Validators.maxLength(256)]),
      ExpiryDatedate: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    });
  }
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    this.fileToUpload = <File>files[0];


  }
  onTypeChange(value){
    this.Type=value;
  }
  Submit() {
    this._EmpComponent.setLoading(true);
    let Fromdate
    let Todate;
    let Expireydate
    if (this.FormData.controls['StartDatedate'].value._d != null && this.FormData.controls['StartDatedate'].value._d != '') {
      Fromdate = this.datepipe.transform(this.FormData.controls['StartDatedate'].value._d, 'dd-MM-yyyy');
    } else {
      this.alertService.error('Please Select From Date');
      return;
    }
    if (this.FormData.controls['EndDatedate'].value._d != null && this.FormData.controls['EndDatedate'].value._d != '') {
      Todate = this.datepipe.transform(this.FormData.controls['EndDatedate'].value._d, 'dd-MM-yyyy');
    } else {
      this.alertService.error('Please Select To Date');
      return;
    }
    if (this.FormData.controls['ExpiryDatedate'].value._d != null && this.FormData.controls['ExpiryDatedate'].value._d != '') {
      Expireydate = this.datepipe.transform(this.FormData.controls['ExpiryDatedate'].value._d, 'dd-MM-yyyy');
    } else {
      this.alertService.error('Please Select Expiry Date');
      return;
    }
    const formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    this._BalanceConfirmation.UploadBalanceConfirmation(Fromdate, Todate, Expireydate, localStorage.getItem(constStorage.UserCode),this.Type, formData)
      .subscribe(
        (res: any) => {
          this.router.navigateByUrl('/Emp/dashboard');
          this._EmpComponent.setLoading(false);
        },
        err => {
          let error = err.error.text;
          this._EmpComponent.setLoading(false);
          if (error == 'Error in Uploaded File') {
            this.alertService.error(error);
            this._BalanceConfirmation.DownloadBalanceConfirmation(localStorage.getItem(constStorage.UserCode)).subscribe(response => {
              let blob: any = new Blob([response], { type: 'text/json; charset=utf-8' });
              const url = window.URL.createObjectURL(blob);
              fileSaver.saveAs(blob, 'ErrorLogfileforBalanceConfirmationUpload.xlsx');
            })
            return;
          }
          else if (error == 'file is  uploaded Successfully.') {
            this._EmpComponent.setLoading(false);
            this.alertService.error(error);
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
    this._EmpComponent.setLoading(true);
    this._BalanceConfirmation.DownloadSampleBalanceConf().subscribe(response => {
      let blob: any = new Blob([response], { type: 'text/json; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      this._EmpComponent.setLoading(false);
      fileSaver.saveAs(blob, 'SampleBalanceConfirmationUpload.xlsx');
    },
      err => {
        this._EmpComponent.setLoading(false);
        console.log(err);
      })
  }
  back() {
    this.router.navigateByUrl('/Emp/dashboard');
  }

}
