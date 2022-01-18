import { Component, Inject, OnInit } from '@angular/core';
import {  Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../component/alert.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpEventType,HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import * as fileSaver from 'file-saver';
import { BalanceConfirmation } from 'src/app/shared/BalanceConfirmation';
import { DatePipe } from '@angular/common';
import { constStorage } from 'src/app/models/Storege';
import { EmpComponent } from '../Emp.component';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-balance-confirmation-edit',
  templateUrl: './balance-confirmation-edit.component.html',
  styleUrls: ['./balance-confirmation-edit.component.css']
})
export class BalanceConfirmationEditComponent implements OnInit {
  public progress: number;
  public message: string;
 @Output() public onUploadFinished = new EventEmitter();
  constructor(private http: HttpClient,private _EmpComponent:EmpComponent,
    private formBuilder: FormBuilder,public datepipe: DatePipe,
    private router: Router,
    private _BalanceConfirmation: BalanceConfirmation , private alertService : AlertService
    , @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
    fileToUpload
    FormData:FormGroup;
    BCs;
    ngOnInit() {
      this.FormData = new FormGroup({
        ExpiryDatedate: new FormControl('', [Validators.required, Validators.maxLength(256)]),
      });
      let BCNo =this.storage.get('BCId');
      this._BalanceConfirmation.GetBalConfDetailsDataForAHcc(BCNo).subscribe((data: any) => {
        this.BCs = data ;
        this.FormData = new FormGroup({
          ExpiryDatedate: new FormControl(this.BCs[0].ExpiryDatedatetime, [Validators.required, Validators.maxLength(256)]),
        });
      }); 
     
    }
  
   
     
   
  
    Submit(){
      let Expireydate
   
    
      if (this.FormData.controls['ExpiryDatedate'].value._d != null && this.FormData.controls['ExpiryDatedate'].value._d != '') {
        Expireydate = this.datepipe.transform(this.FormData.controls['ExpiryDatedate'].value._d, 'dd-MM-yyyy');
      }else{
        this.alertService.error('Please Select new Expiry Date');
        return;
      }
let Data={
  IDbint  : this.storage.get('BCId'),
  ExpiryDatedatetime  :Expireydate,
CreatedByvtxt:localStorage.getItem(constStorage.UserCode)
}
this._EmpComponent.setLoading(true);
    this._BalanceConfirmation.UpdateExpiryDate(Data)
        .subscribe(
          (res: any) => {
            this._EmpComponent.setLoading(false);
            this.router.navigateByUrl('/Emp/BalanceConfirmationList');
          },
          err => {
            let error =err.error.text;
            this._EmpComponent.setLoading(false);
              console.log(err);;
              return
          }
        );
    }
  
    back()
    {
      this.router.navigateByUrl('/Emp/BalanceConfirmationList');
    }

}
