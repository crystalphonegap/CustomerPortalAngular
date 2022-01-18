import { ChangeDetectorRef } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { constStorage } from 'src/app/models/Storege';
import { BalanceConfirmation } from 'src/app/shared/BalanceConfirmation';
import { EmpComponent } from '../Emp.component';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-balance-confirmation-view-ForCFSP',
  templateUrl: './balance-confirmation-view-ForCFSP.component.html',
  styleUrls: ['./balance-confirmation-view-ForCFSP.component.css']
})
export class BalanceConfirmationViewForCFSPComponent implements OnInit {

  constructor(private changeDetection: ChangeDetectorRef,private _EmpComponent:EmpComponent,private _BalanceConfirmation:BalanceConfirmation, @Inject(SESSION_STORAGE) private storage: WebStorageService, private router: Router) { }
  BalanceConfirmations:any=[];
  BCheader:any=[];
  lengthofBalanceConfirmations:number;
  ngOnInit() {

    this.BCheader=this.storage.get('BCheader');
    this.storage.get('BCNo');
    this.storage.get('CustomerCode');
 this.GetBalConfDetailDataByID(this.storage.get('BCNo'),this.storage.get('CustomerCode'));
  }

  GetBalConfDetailDataByID(BalanceConfirmationNo,UserCode){
    this._EmpComponent.setLoading(true);

    this._BalanceConfirmation.GetBalConfDetailDataByIDSPCFA(UserCode, BalanceConfirmationNo,localStorage.getItem(constStorage.UserCode)).subscribe((data: any) => {
      this.BalanceConfirmations = data ;
      this.lengthofBalanceConfirmations = this.BalanceConfirmations.length - 1;
      this.changeDetection.detectChanges();
      this._EmpComponent.setLoading(false);
    },
    err => {
      this._EmpComponent.setLoading(false);
        console.log(err);
    });
  }



  download() {
    this._EmpComponent.setLoading(true);
    this._BalanceConfirmation.downloadFileForEMP('CFSP',this.storage.get('BCNo')).subscribe(response => {
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
}
