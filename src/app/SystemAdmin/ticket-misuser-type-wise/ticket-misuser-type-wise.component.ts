import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { constStorage } from 'src/app/models/Storege';
import { TicketService } from 'src/app/shared/TicketService';
import { SystemAdminComponent } from '../SystemAdmin.component';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-ticket-misuser-type-wise',
  templateUrl: './ticket-misuser-type-wise.component.html',
  styleUrls: ['./ticket-misuser-type-wise.component.css']
})
export class TicketMISUserTypeWiseComponent implements OnInit {
  constructor(
    private _SystemAdminComponent: SystemAdminComponent,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private _TicketService: TicketService) { }
    MISReport:any=[];


  ngOnInit(): void {
    this.getMISReport();
  }


  getMISReport() {
    this._SystemAdminComponent.setLoading(true);
    this._TicketService.ticketMISReportAssignToWise( localStorage.getItem(constStorage.UserCode) ,localStorage.getItem(constStorage.UserType)).subscribe((res: any) => {
      this.MISReport = res;
      this._SystemAdminComponent.setLoading(false);
    },
      err => {
        this._SystemAdminComponent.setLoading(false);
        console.log(err);
      })
  }

  
  download() {
    this._SystemAdminComponent.setLoading(true);
    this._TicketService.DownloadMISReportAssignToWise(localStorage.getItem(constStorage.UserCode),localStorage.getItem(constStorage.UserType)).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
      this._SystemAdminComponent.setLoading(false);
			fileSaver.saveAs(blob, 'Ticket_MIS_UserType_Wise.xlsx');
		},
    err => { 
      this._SystemAdminComponent.setLoading(false);
        console.log(err);
    })
  }
  passuserTypeByType(Priority,Type,userType){
    let DATA ={
      Priority:Priority,
      Type:Type,
      userType:userType,
      From:0,
      To:0,
    }
    this.storage.set("MIS",DATA);
    this.router.navigateByUrl('/SystemAdmin/TicketMISUserTypeWiseList');
  }
  passuserTypeByDays(userType,From,To){
    let DATA ={
      Priority:null,
      Type:null,
      userType:userType,
      From:From,
      To:To,
    }
    this.storage.set("MIS",DATA);
    this.router.navigateByUrl('/SystemAdmin/TicketMISUserTypeWiseList');
  }
}
