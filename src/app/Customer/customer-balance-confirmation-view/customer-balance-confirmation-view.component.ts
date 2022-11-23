import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { ModalService } from 'src/app/component/dialog-box';
import { constStorage } from 'src/app/models/Storege';
// import { ModalComponent } from 'src/app/component/dialog-box/dialog-box.component';
import { BalanceConfirmation } from 'src/app/shared/BalanceConfirmation';
import { CustomerComponent } from '../Customer.component';
import * as fileSaver from 'file-saver';
import { UserConstant } from 'src/app/models/Userconstant';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-balance-confirmation-view',
  templateUrl: './customer-balance-confirmation-view.component.html',
  styleUrls: ['./customer-balance-confirmation-view.component.css']
})
export class CustomerBalanceConfirmationViewComponent implements OnInit {
  bodyText;
  myGroup: FormGroup;
  constructor(private changeDetection: ChangeDetectorRef, private _CustomerComponent: CustomerComponent, private alertService: AlertService, private modalService: ModalService,
              private _BalanceConfirmation: BalanceConfirmation, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  BalanceConfirmations: any = [];
  BalanceConfirmationInfo: any = [];
  TotalQty=0;
  BalanceConfirmationLog: any = [];
  remark: string;
  hideme = [];  
  Index: any;  
  BCAttachments:any=[];
  savetemp = true;
  Save = true;
  showconfirmation=false;
  CreditAmount: number=0;
  DebitAmount: number=0;
  fileToUpload;
  selectedFiles = [];
  lengthofBalanceConfirmations: number;
  Userid;
  loader;
  mobilenumber;
  AgreeDesagree=false;

  
  ngOnInit() {
    this.Userid = localStorage.getItem('UserCode');
    const BalanceConfirmationNo = this.storage.get('BC');
    this.getBalanceConfirmationHeaderDataByBalanceConfirmationNo(BalanceConfirmationNo);
    this.GetBalanceConfLog(BalanceConfirmationNo);
    this.getAllBalanceConfirmationDataByBalanceConfirmationNo(BalanceConfirmationNo);
    this.myGroup = new FormGroup({
      Passwordvtxt: new FormControl()
   });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    //this.fileToUpload =  files[0] as File;
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
  }
  onDebitChange(Ledger, value) {
    Ledger.Debit = value;
  }
  onQuantityChange(Ledger, value) {
    Ledger.Quantity = value;
  }
  onCreditChange(Ledger, value) {
    Ledger.Credit = value;
  }
  saveModal(id: string, Ledger) {
    this.modalService.close(id);
  }
  closeModal(id: string, Ledger) {
    this.modalService.close(id);
  }
  getAllBalanceConfirmationDataByBalanceConfirmationNo(BalanceConfirmationNo) {
    let UserCode;
    const UserTypetxt = localStorage.getItem('UserType');
    if (UserTypetxt === 'Customer') {
      UserCode = this.Userid;
    } else {
      UserCode = localStorage.getItem('CustCode');
    }
    this._CustomerComponent.setLoading(true);
    this._BalanceConfirmation.GetBalConfDetailDataByID(UserCode, BalanceConfirmationNo).subscribe((data: any) => {
      // tslint:disable-next-line: prefer-for-of
      // for (let count = 0; count < data.length; count++) {
      //     // if(data[count].DocumentTypevtxt !== 'AB') {
      //     //   if (count !== 0 && count !== data.length - 1 && count !== data.length - 2) {
      //     //     this.CreditAmount = this.CreditAmount + data[count].Creditdcl ;
      //     //     this.DebitAmount = this.DebitAmount + data[count].Debitdcl ;
      //     //   }
      //     // }
      //     this.BalanceConfirmations.push(data[count]);
      // }
      this.BalanceConfirmations = data;
      this.findsum(this.BalanceConfirmations);
      this.changeDetection.detectChanges();
      this._CustomerComponent.setLoading(false);
      this.lengthofBalanceConfirmations = this.BalanceConfirmations.length - 1;
    },
      err => {
        this._CustomerComponent.setLoading(false);
      });
  }

  GetBalanceConfLog(BalanceConfirmationNo) {
    this._CustomerComponent.setLoading(true);
    this._BalanceConfirmation.GetBalanceConfLog(BalanceConfirmationNo).subscribe(
      data => {
        this.BalanceConfirmationLog = data;
        this.changeDetection.detectChanges();

        this._CustomerComponent.setLoading(false);
      },
      err => {
        this._CustomerComponent.setLoading(false);
      }
    );
  }

  getBalanceConfirmationHeaderDataByBalanceConfirmationNo(BalanceConfirmationNo) {
    this._CustomerComponent.setLoading(true);
    let UserCode;
    const UserTypetxt = localStorage.getItem('UserType');
    if (UserTypetxt == 'Customer') {
      UserCode = this.Userid;
    } else {
      UserCode = localStorage.getItem('CustCode');
    }
    this._BalanceConfirmation.GetBalConfHeaderDataByID(UserCode, BalanceConfirmationNo).subscribe(
      data => {
        this.BalanceConfirmationInfo = data[0];
        this.findsum(this.BalanceConfirmationInfo);
        this.changeDetection.detectChanges();
        this._CustomerComponent.setLoading(false);
      },
      err => {
        this._CustomerComponent.setLoading(false);
      }
    );
  }
  findsum(data){    
    for(let j=0;j<data.length;j++){   
         this.TotalQty=this.TotalQty+data[j].Quantitydcl;
    } 
  }

  onRowChange(Ledger, value, type) {
    if (type == 'amount') {
      Ledger.amount = value;

    } else {
      Ledger.remark = value;

    }
  }
  onRemarkChange(value) {
    this.remark = value;
  }
  onStatusChange(event, type, ledger) {
    if (type == 'checkbox') {
      if (event == true) {
        ledger.editmode = false;
      } else if (event == false) {
        ledger.editmode = true;
        this.openModal('custom-modal-' + ledger.IDbint);
      }
    } else {

      this.openModal('custom-modal-' + ledger.IDbint);
    }

    this.hideSave();
  }
  Back() {
    this.storage.remove('BC');
    this.router.navigateByUrl('/Customer/BalanceConfirmation');
  }
  Agree() {
    this.showconfirmation=true;
    this.AgreeDesagree=true;
    this.sendOTP();
 

  }
  Disagree() {
    this.AgreeDesagree =false;
    this.sendOTP();
  
  }
  hideSave() {
    this.savetemp = true;
    for (let i = 0; i < this.BalanceConfirmations.length; i++) {
      if (this.BalanceConfirmations[i].editmode == true) {
        this.savetemp = false;
      }
    }
    if (this.savetemp) {
      this.Save = true;
    } else {
      this.Save = false;
    }
  }
  Submit(type) {
    for (let i = 0; i < this.BalanceConfirmations.length; i++) {
      if (this.BalanceConfirmations[i].editmode == true) {
        type = 'B';
      }
    }
    this.loader = 0;
    this._CustomerComponent.setLoading(true);
    const formData = new FormData();
    if (this.selectedFiles != null || this.selectedFiles.length === 0) {
      this.selectedFiles.forEach((f) => formData.append('files', f));
      //formData.append('file', this.fileToUpload, this.fileToUpload.name);
    }
    this._BalanceConfirmation.UpdateBalanceConfirmationByDealer(this.BalanceConfirmationInfo.IDbint, this.BalanceConfirmationInfo.RequestNovtxt, type, localStorage.getItem(constStorage.UserCode), this.remark, formData).subscribe(
      (res: any) => {

      },
      err => {
        const error = err.error.text;
        if (error == 'file is  uploaded Successfully.') {
          this.alertService.error(error);
          this.UpdateBalanceConfirmationByDealerDetails();
        } else if (err.status == 400) {
          this._CustomerComponent.setLoading(false);
          this.alertService.error('Failed to upload.');
        } else {
          this._CustomerComponent.setLoading(false);
          console.log(err);
          return;
        }

      }
    );
  }
  UpdateBalanceConfirmationByDealerDetails() {
    let count = 0;
    for (let i = 0; i < this.BalanceConfirmations.length; i++) {
      if (this.BalanceConfirmations[i].editmode == true) {
        count++;
        const formData = {
          IDbint: this.BalanceConfirmations[i].IDbint,
          EditAmoutdcl: this.BalanceConfirmations[i].amount,
          Remarksvtxt: this.BalanceConfirmations[i].remark,
          Statusvtxt: 'D',
        };
        this._BalanceConfirmation.UpdateBalanceConfirmationByDealerDetails(formData).subscribe(
          (res: any) => {
            this.Redirect(this.loader);
            this.loader++;
          },
          err => {
            this._CustomerComponent.setLoading(false);
            if (err.status == 400) {
              this.alertService.error('Due to some error order not inserted.');
            } else {
              console.log(err);
            }
          }
        );
      }
    }
    if (count == 0) {
      this.Redirect(this.loader);
    }
  }

  Redirect(status) {
    if (status == 0) {
      this._CustomerComponent.setLoading(false);
      this.router.navigateByUrl('/Customer/BalanceConfirmation');
      this.alertService.success('Balance Confirmation Updated.');
    }
  }


  // download() {
  //   this._CustomerComponent.setLoading(true);
  //   this._BalanceConfirmation.downloadFileForEMP('Customer', this.storage.get('BC')).subscribe(response => {
  //     const blob: any = new Blob([response], { type: 'text/json; charset=utf-8' });
  //     const url = window.URL.createObjectURL(blob);
  //     this._CustomerComponent.setLoading(false);
  //     fileSaver.saveAs(blob, this.BalanceConfirmationInfo.AttachmentFilevtxt);
  //   },
  //     err => {
  //       this._CustomerComponent.setLoading(false);
  //       console.log(err);
  //     });
  // }
  download(no,attachmentname) {
    this._CustomerComponent.setLoading(true);
    this._BalanceConfirmation.downloadBalanceConfAttachmentfile(no).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
      this._CustomerComponent.setLoading(false);
			fileSaver.saveAs(blob, attachmentname);
		},
    err => {
      this._CustomerComponent.setLoading(false);
      console.log(err);
    });
}

  sendRemark(type, status) {
    if (type != 'ts') {
      if (this.remark == null || this.remark == '') {
        this.alertService.error('Please enter remark');
        return;
      }
    }
    this._CustomerComponent.setLoading(true);
    const Model = {
      HeaderIDbint: this.storage.get('BC'),
      UserTypevtxt: UserConstant.Customer,
      UserCodevtxt: localStorage.getItem(constStorage.UserCode),
      Remarksvtxt: this.remark,
      Statusvtxt: status,
    };
    // this._BalanceConfirmation.InsertBalanceConfLog(Model).subscribe(response => {

    //   this.GetBalanceConfLog(this.storage.get('BC'));
    //   this._CustomerComponent.setLoading(false);

    // },
    //   err => {
    //     this._CustomerComponent.setLoading(false);
    //     console.log(err);
    //   });
  }
  GetAttachments(index,detailID) {
    console.log(detailID);
    this._CustomerComponent.setLoading(true);
      this._BalanceConfirmation.GetBalanceConfAttachments(detailID).subscribe(
        data => {
          this.BCAttachments[index] = data;
          this.changeDetection.detectChanges();
          this._CustomerComponent.setLoading(false);
        },
        err => {
            this._CustomerComponent.setLoading(false);
          }
      );
      this.hideme[index] = !this.hideme[index];  
      this.Index = index; 
  }

  sendOTP(){
    this._CustomerComponent.setLoading(true);
    this._BalanceConfirmation.GetOTPFORcONFIRM(this.BalanceConfirmationInfo.CustomerCodevtxt).subscribe(res=>{
      this.mobilenumber=res.MOBILE;
      this.alertService.success(res.MESSAGE);
      this._CustomerComponent.setLoading(false);
    },err=>
    {
      this._CustomerComponent.setLoading(false);
    });
  }

  ValidatOTP(){
    debugger;
    let OPTValue=this.myGroup.get('Passwordvtxt').value
    this._CustomerComponent.setLoading(true);
    this._BalanceConfirmation.SubmitOTPcONFIRM(this.mobilenumber,OPTValue,this.BalanceConfirmationInfo.CustomerCodevtxt).subscribe(res=>{
      this._CustomerComponent.setLoading(false);
      if(res.MESSAGE=="Invalid OTP"){
this.alertService.warn(res.MESSAGE);
      }else{
        if(this.AgreeDesagree==true){
         this.Submit('A');
         this.sendRemark('ts', 'A');
         }
         else{
          this.Submit('B');
          this.sendRemark('ts', 'B');
        }
      }
      
    },err=>
    {
      this._CustomerComponent.setLoading(false);
    });
  }
}

