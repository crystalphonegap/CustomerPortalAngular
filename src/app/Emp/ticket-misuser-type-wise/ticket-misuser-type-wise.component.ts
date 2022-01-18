import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { constStorage } from 'src/app/models/Storege';
import { TicketService } from 'src/app/shared/TicketService';
import { EmpComponent } from '../Emp.component';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-ticket-misuser-type-wise',
  templateUrl: './ticket-misuser-type-wise.component.html',
  styleUrls: ['./ticket-misuser-type-wise.component.css']
})
export class TicketMISUserTypeWiseComponent implements OnInit {
  constructor(
    private _EmpComponent: EmpComponent,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private _TicketService: TicketService) { }
    MISReport:any=[];


  ngOnInit(): void {
    this.getMISReport();
  }


  getMISReport() {
    this._EmpComponent.setLoading(true);
    this._TicketService.ticketMISReportAssignToWise( localStorage.getItem(constStorage.UserCode) ,localStorage.getItem(constStorage.UserType)).subscribe((res: any) => {
      this.MISReport = res;
      this._EmpComponent.setLoading(false);
    },
      err => {
        this._EmpComponent.setLoading(false);
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
    this.router.navigateByUrl('/Emp/TicketMISUserTypeWiseList');
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
    this.router.navigateByUrl('/Emp/TicketMISUserTypeWiseList');
  }



  download() {
    this._EmpComponent.setLoading(true);
    this._TicketService.DownloadMISReportAssignToWise(localStorage.getItem(constStorage.UserCode),localStorage.getItem(constStorage.UserType)).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
      this._EmpComponent.setLoading(false);
			const url = window.URL.createObjectURL(blob);
			fileSaver.saveAs(blob, 'Ticket_MIS_UserType_Wise.xlsx');
		},
    err => {
      this._EmpComponent.setLoading(false);
      console.log(err);
    }) 
  }
}
