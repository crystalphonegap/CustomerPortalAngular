import { DatePipe } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { AlertService } from 'src/app/component/alert.service';
import * as fileSaver from 'file-saver';
import { constStorage } from 'src/app/models/Storege';
import { DepartmentService } from 'src/app/shared/DepartmentService';
import { TicketService } from 'src/app/shared/TicketService';
import { EmpComponent } from '../Emp.component';

@Component({
  selector: 'app-mis-report-view-close-ticket-by-category',
  templateUrl: './mis-report-view-close-ticket-by-category.component.html',
  styleUrls: ['./mis-report-view-close-ticket-by-category.component.css']
})
export class MisReportViewCloseTicketByCategoryComponent implements OnInit {

  constructor(private _DepartmentService: DepartmentService,
    private _EmpComponent: EmpComponent,
    private alertService: AlertService, public datepipe: DatePipe,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private _TicketService: TicketService) { }
  Departments: any = [];
  DetailData:any=[];
  TicketId: number;
  fileToUpload;
  TicketInfo: any = [];
TicketDetail: any = [];
  ngOnInit() {
    this.TicketId = this.storage.get('TicketId');
    this.getTicketInfo();
    this.getTicketDetail();
  }
  uploadFile(file) {

  }


  getTicketInfo() {
    this._EmpComponent.setLoading(true);
    this._TicketService.getTicketHeaderDetail(this.TicketId).subscribe((res: any) => {
      this.TicketInfo = res;
      this._EmpComponent.setLoading(false);
    },
      err => {
        this._EmpComponent.setLoading(false);
        console.log(err);
      })
  }

  getTicketDetail() {
    this._EmpComponent.setLoading(true);
    this._TicketService.getTicketDetail(this.TicketId).subscribe((res: any) => {
      this.TicketDetail = res;
     
      this._EmpComponent.setLoading(false);
    },
      err => {
        this._EmpComponent.setLoading(false);
        console.log(err);
      })
  }


  Back() {
    this.router.navigateByUrl('/Emp/TicketMISCategoryTypeWiseList');
  }
  customerDownload(ID,saveAs){
    this.download(ID,"Customer",saveAs);
  }
  
  employeeDownload(ID,saveAs){
    this.download(ID,"Employee",saveAs);
  }
  
  download(ID,Type,saveAs) {
    this._EmpComponent.setLoading(true);
  
    this._TicketService.downloadFile(ID,Type).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
      this._EmpComponent.setLoading(false);
			fileSaver.saveAs(blob, saveAs);
		},
    err => {
      this._EmpComponent.setLoading(false);
      console.log(err);
    });
}

}

export interface ProgressStatus {
  status: ProgressStatusEnum;
  percentage?: number;
}
 
export enum ProgressStatusEnum {
  START, COMPLETE, IN_PROGRESS, ERROR
}
