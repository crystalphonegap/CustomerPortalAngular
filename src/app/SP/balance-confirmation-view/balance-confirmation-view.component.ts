import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { ModalService } from 'src/app/component/SP_Model';
import { constStorage } from 'src/app/models/Storege';
// import { ModalComponent } from 'src/app/component/dialog-box/dialog-box.component';
import { BalanceConfirmation } from 'src/app/shared/BalanceConfirmation';
import { SPComponent } from '../SP.component';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-balance-confirmation-view',
  templateUrl: './balance-confirmation-view.component.html',
  styleUrls: ['./balance-confirmation-view.component.css']
})
export class BalanceConfirmationViewComponent implements OnInit {
  bodyText;
  constructor(private _SPComponent:SPComponent,private alertService: AlertService, private modalService: ModalService,
    private _BalanceConfirmation: BalanceConfirmation, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
  BalanceConfirmations: any=[];
  BalanceConfirmationInfo: any=[];
  remark: string;
  Save=true;
  savetemp=true;;
  fileToUpload;
  lengthofBalanceConfirmations: number;
  Userid;
  loader;
  ngOnInit() {
    this.Userid = localStorage.getItem('UserCode');
    let BalanceConfirmationNo = this.storage.get('BC');
    this.getBalanceConfirmationHeaderDataByBalanceConfirmationNo(BalanceConfirmationNo);

    this.getAllBalanceConfirmationDataByBalanceConfirmationNo(BalanceConfirmationNo);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    this.fileToUpload = <File>files[0];
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
   
    this._SPComponent.setLoading(true);
        this._BalanceConfirmation.GetBalConfDetailDataByIDSPCFA(localStorage.getItem('UserCode'), BalanceConfirmationNo,localStorage.getItem('UserCode')).subscribe((data: any) => {
      this.BalanceConfirmations = data ;
      this._SPComponent.setLoading(false);
      this.lengthofBalanceConfirmations = this.BalanceConfirmations.length - 1;
    },
    err => {
        this._SPComponent.setLoading(false);
      });
  }

  getBalanceConfirmationHeaderDataByBalanceConfirmationNo(BalanceConfirmationNo) {
    this._SPComponent.setLoading(true);
   
    this._BalanceConfirmation.GetBalConfHeaderDataByIDSPCFA(localStorage.getItem('UserCode'), BalanceConfirmationNo).subscribe(
      data => {
        this.BalanceConfirmationInfo = data[0];
        this._SPComponent.setLoading(false);
      },
      err => {
          this._SPComponent.setLoading(false);
        }
    );
  }
  onRowChange(Ledger, value, type) {
    if (type == 'amount') {
      Ledger.amount = value;

    } else  {
      Ledger.remark = value;

    }
  }
  onRemarkChange(value) {
    this.remark = value;
  }
  onStatusChange( event, type,ledger) {
    if (type == 'checkbox') {
      if (event == true) {
        ledger.editmode=false;
      } else if (event == false) {
        ledger.editmode=true;
        this.openModal('custom-modal-'+ledger.IDbint);
      }
    } else {
     
      this.openModal('custom-modal-'+ledger.IDbint);
    }

  }
  Back() {
    this.storage.remove('BC');
    this.router.navigateByUrl('SP/BalanceConfirmation');
  }
  Agree() {
    this.Submit("A");

  }
  Disagree() {
    this.Submit("B");
  } 
  hideSave(){
    this.savetemp=true
    for(let i =0 ; i<this.BalanceConfirmations.length;i++){
      if(this.BalanceConfirmations[i].editmode==true){
      this.savetemp=false;
      }
    }
    if( this.savetemp)
    this.Save=true
    else
    this.Save=false
  }
    Submit(type) {
      for(let i =0 ; i<this.BalanceConfirmations.length;i++){
        if(this.BalanceConfirmations[i].editmode==true){
          type="B";
        }
      }
  this.loader=0
  this._SPComponent.setLoading(true);
  const formData = new FormData();
  if( this.fileToUpload !=null)
  formData.append('file',  this.fileToUpload,  this.fileToUpload.name);
    this._BalanceConfirmation.UpdateBalanceConfirmationBySPCFA(this.BalanceConfirmationInfo.IDbint,this.BalanceConfirmationInfo.RequestNovtxt,type,localStorage.getItem(constStorage.UserCode),this.remark,formData).subscribe(
      (res: any) => {

      },
      err => {
        let error =err.error.text;
       if (error=='file is  uploaded Successfully.'){
          this.alertService.error(error);
          this.UpdateBalanceConfirmationByDealerDetails();
        }
        else if (err.status == 400){
          this._SPComponent.setLoading(false);
          this.alertService.error('Failed to upload.');
        }
        else{
          this._SPComponent.setLoading(false);
          console.log(err);;
          return
        }
       
      }
    );
  }
  UpdateBalanceConfirmationByDealerDetails(){
    let count=0;
    for(let i =0 ; i<this.BalanceConfirmations.length;i++){
      if(this.BalanceConfirmations[i].editmode==true){
        count++;
        let formData={
          IDbint:this.BalanceConfirmations[i].IDbint,
          EditAmoutdcl:this.BalanceConfirmations[i].amount,
          Remarksvtxt:this.BalanceConfirmations[i].remark,
          Statusvtxt:'D',
        }
        this._BalanceConfirmation.UpdateBalanceConfirmationBySPCFADetails(formData).subscribe(
          (res: any) => {
            this.Redirect(this.loader);
            this.loader++;
          },
          err => {
            this._SPComponent.setLoading(false);
            if (err.status == 400)
            this.alertService.error('Due to some error order not inserted.');
          else
            console.log(err);
          }
        );
      }
    }
   if(count==0){
    this.Redirect(this.loader);
   }
  }

  Redirect(status){
    if(status==0){
      this._SPComponent.setLoading(false);
      this.router.navigateByUrl('SP/BalanceConfirmation');
        this.alertService.success('Balance Confirmation Updated.');
    }
  }
  
  
download() {
  this._SPComponent.setLoading(true);
  this._BalanceConfirmation.downloadFile(localStorage.getItem('UserCode'),this.storage.get('BC')).subscribe(response => {
    let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    this._SPComponent.setLoading(false);
    fileSaver.saveAs(blob, this.BalanceConfirmationInfo.AttachmentFilevtxt);
  },
  err => {
    this._SPComponent.setLoading(false);
    console.log(err);
  });
}

}