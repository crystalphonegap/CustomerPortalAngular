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
  hideme = [];  
  Index: any;  
  BCAttachments:any=[];
  CreditAmount: number=0;
  DebitAmount: number=0;
  UserType;
  lengthofBalanceConfirmations:number;
  remark;
  BalanceConfirmationLog;
  selectedFiles = [];
  ngOnInit() {
    this.BCheader=this.storage.get('BCheader');
    this.storage.get('BCNo');
    this.storage.get('CustomerCode');
    this.UserType = localStorage.getItem(constStorage.UserType);
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

  download(attachmentname) {
    this._EmpComponent.setLoading(true);
    this._BalanceConfirmation.downloadBalanceConfAttachmentfile(this.storage.get('BCNo')).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
      this._EmpComponent.setLoading(false);
			fileSaver.saveAs(blob, attachmentname);
		},
    err => {
      this._EmpComponent.setLoading(false);
      console.log(err);
    });
}

onRemarkChange(value) {
  this.remark = value;
}

Redirect(status) {
  if (status == 0) {
    this._EmpComponent.setLoading(false);
    this.router.navigateByUrl('/Emp/BalanceConfirmationViewForRAH');
    this.alertService.success('Balance Confirmation Updated.');
  }
}

public uploadFile = (files) => {
  if (files.length === 0) {
    return ;
  }
  //this.fileToUpload =  files[0] as File;
  for (let i = 0; i < files.length; i++) {
    this.selectedFiles.push(files[i]);
  }
}

sendRemark() {
  if(this.remark==null|| this.remark==''){
    this.alertService.error("Please enter remark");
    return;
  }
  this._EmpComponent.setLoading(true);
  // let Model ={
  //   HeaderIDbint:this.storage.get('BCNo'),
  //   UserTypevtxt:localStorage.getItem(constStorage.UserType),
  //   UserCodevtxt:localStorage.getItem(constStorage.UserCode),
  //   Remarksvtxt: this.remark ,
  //   Statusvtxt:'B',
  // }
  const formData = new FormData();
    if (this.selectedFiles != null || this.selectedFiles.length === 0) {
      this.selectedFiles.forEach((f) => formData.append('files', f));
      //formData.append('file', this.fileToUpload, this.fileToUpload.name);
    }
    this._BalanceConfirmation.UpdateBalanceConfirmationByEmp(this.storage.get('BCNo'), this.BCheader.RequestNovtxt, 'B', localStorage.getItem(constStorage.UserType),localStorage.getItem(constStorage.UserCode), this.remark, formData).subscribe(
      (res: any) => {
      },
      err => {
        const error = err.error.text;
        if (error == 'file is  uploaded Successfully.') {
          this.router.navigateByUrl('/Emp/BalanceConfirmationViewForRAH');
          this.alertService.success('Balance Confirmation Updated.');
        } else if (err.status == 400) {
          this._EmpComponent.setLoading(false);
          this.alertService.error('Failed to upload Attachments...');
        } else {
          this._EmpComponent.setLoading(false);
          console.log(err);
          return;
        }
      }
    );
  // this._BalanceConfirmation.InsertBalanceConfLog(Model).subscribe(response => {

  //   this.GetBalanceConfLog(this.storage.get('BCNo'));
  //   this._EmpComponent.setLoading(false);

  // },
  // err => {
  //   this._EmpComponent.setLoading(false);
  //   console.log(err);
  // });
}

GetAttachments(index,detailID) {
  console.log(detailID);
  this._EmpComponent.setLoading(true);
    this._BalanceConfirmation.GetBalanceConfAttachments(detailID).subscribe(
      data => {
        this.BCAttachments[index] = data;
        this.changeDetection.detectChanges();
        this._EmpComponent.setLoading(false);
      },
      err => {
          this._EmpComponent.setLoading(false);
        }
    );
    this.hideme[index] = !this.hideme[index];  
    this.Index = index; 
}

}
