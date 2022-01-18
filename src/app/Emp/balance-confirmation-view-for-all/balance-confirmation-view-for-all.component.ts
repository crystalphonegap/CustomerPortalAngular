import { AlertComponent } from './../../component/alert.component';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { BalanceConfirmation } from 'src/app/shared/BalanceConfirmation';
import { EmpComponent } from '../Emp.component';
import * as fileSaver from 'file-saver';
import { constStorage } from 'src/app/models/Storege';
import { UserConstant } from 'src/app/models/Userconstant';
import { ChangeDetectorRef } from '@angular/core';
import { AlertService } from 'src/app/component/alert.service';
@Component({
  selector: 'app-balance-confirmation-view-for-all',
  templateUrl: './balance-confirmation-view-for-all.component.html',
  styleUrls: ['./balance-confirmation-view-for-all.component.css']
})
export class BalanceConfirmationViewForAllComponent implements OnInit {

  constructor(private changeDetection: ChangeDetectorRef,private _EmpComponent:EmpComponent
    ,private _BalanceConfirmation:BalanceConfirmation,private alertService: AlertService,
     @Inject(SESSION_STORAGE) private storage: WebStorageService, private router: Router) { }
  BalanceConfirmations:any=[];
  BCheader:any=[];
  CreditAmount: number=0;
  DebitAmount: number=0;
  lengthofBalanceConfirmations:number;
  remark;
  BalanceConfirmationLog;
  ngOnInit() {

    this.BCheader=this.storage.get('BCheader');
    this.storage.get('BCNo');
    this.storage.get('CustomerCode');
    this.GetBalanceConfLog(this.storage.get('BCNo'));
 this.GetBalConfDetailDataByID(this.storage.get('BCNo'),this.storage.get('CustomerCode'));
  }

  GetBalanceConfLog(BalanceConfirmationNo) {
    this._EmpComponent.setLoading(true);
    this._BalanceConfirmation.GetBalanceConfLog( BalanceConfirmationNo).subscribe(
      data => {
        this.BalanceConfirmationLog = data;
        this.changeDetection.detectChanges();

        this._EmpComponent.setLoading(false);
      },
      err => {
          this._EmpComponent.setLoading(false);
        }
    );
  }




  GetBalConfDetailDataByID(BalanceConfirmationNo,UserCode){

    this._EmpComponent.setLoading(true);
    this._BalanceConfirmation.GetBalConfDetailDataByID(UserCode, BalanceConfirmationNo).subscribe((data: any) => {
      this.BalanceConfirmations = data ;

    //   for (let count = 0; count < data.length; count++) {
    //     if(data[count].DocumentTypevtxt !== 'AB') {
    //       if (count !== 0 && count !== data.length - 1) {
    //         this.CreditAmount = this.CreditAmount + data[count].Creditdcl ;
    //         this.DebitAmount = this.DebitAmount + data[count].Debitdcl ;
    //       }
    //     }
    // }
      this.lengthofBalanceConfirmations = this.BalanceConfirmations.length - 1;
      this._EmpComponent.setLoading(false);
    },
    err => {
      this._EmpComponent.setLoading(false);
        console.log(err);
    });
  }

  download() {
    this._EmpComponent.setLoading(true);
    this._BalanceConfirmation.downloadFileForEMP("Customer",this.storage.get('BCNo')).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
      this._EmpComponent.setLoading(false);
			fileSaver.saveAs(blob, this.BCheader.AttachmentFilevtxt);
		},
    err => {
      this._EmpComponent.setLoading(false);
      console.log(err);
    });
}

onRemarkChange(value) {
  this.remark = value;
}

sendRemark() {
  if(this.remark==null|| this.remark==''){
    this.alertService.error("Please enter remark");
    return;
  }
  this._EmpComponent.setLoading(true);
  let Model ={
    HeaderIDbint:this.storage.get('BCNo'),
    UserTypevtxt:UserConstant.AccountingHead,
    UserCodevtxt:localStorage.getItem(constStorage.UserCode),
    Remarksvtxt: this.remark ,
    Statusvtxt:'B',
  }
  this._BalanceConfirmation.InsertBalanceConfLog(Model).subscribe(response => {

    this.GetBalanceConfLog(this.storage.get('BCNo'));
    this._EmpComponent.setLoading(false);

  },
  err => {
    this._EmpComponent.setLoading(false);
    console.log(err);
  });
}


}
