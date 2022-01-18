import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { DepartmentService } from 'src/app/shared/DepartmentService';
import { TicketService } from 'src/app/shared/TicketService';
import { CustomerComponent } from '../Customer.component';
import * as fileSaver from 'file-saver';


@Component({
  selector: 'app-customer-ticket-view',
  templateUrl: './customer-ticket-view.component.html',
  styleUrls: ['./customer-ticket-view.component.css']
})
export class CustomerTicketViewComponent implements OnInit {

  constructor(private _DepartmentService:DepartmentService,
    private _CustomerComponent:CustomerComponent,
   private alertService: AlertService,public datepipe: DatePipe,
   private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService,
   private _TicketService:TicketService) { }
 Departments:any=[];
 TicketId:number;
 fileToUpload;
 TicketDetail:any=[];
 SelectedDepartmentId:number=-1;
  TicketInfo:any=[];
  ngOnInit() {
   this.TicketId= this.storage.get('TicketId');
    this.getDepartments();
    this.getTicketInfo();
    this.getTicketDetail();
  }
  uploadFile(file){

  }

  getDepartments() {
    this._CustomerComponent.setLoading(true);
      this._DepartmentService.GetDepartmentMasterForDropdownlist(null,1).subscribe((res: any) => {
        this.Departments = res;
        this._CustomerComponent.setLoading(false);
      },
      err => {
        this._CustomerComponent.setLoading(false);
          console.log(err);
      })
  }

  getTicketDetail() {
    this._CustomerComponent.setLoading(true);
    this._TicketService.getTicketDetail(this.TicketId).subscribe((res: any) => {
      this.TicketDetail = res;
     
      this._CustomerComponent.setLoading(false);
    },
      err => {
        this._CustomerComponent.setLoading(false);
        console.log(err);
      })
  }

  getTicketInfo(){
    this._CustomerComponent.setLoading(true);
      this._TicketService.getTicketHeaderDetail(this.TicketId).subscribe((res: any) => {
        this.TicketInfo = res;
        this.SelectedDepartmentId=res.Departmentidint;
        this._CustomerComponent.setLoading(false);
      },
      err => {
        this._CustomerComponent.setLoading(false);
          console.log(err);
      })
  }

  SelectedDepartment(Departmentid) {
    if (Departmentid != null && Departmentid != "" && Departmentid != "none") {
    this.SelectedDepartmentId=Departmentid;
    }else{
      this.SelectedDepartmentId=-1;
    }
  }
  Back() {
    this.router.navigateByUrl('/Customer/TicketStatus');
  }

  customerDownload(ID,saveAs){
    this.download(ID,"Customer",saveAs);
  }
  
  employeeDownload(ID,saveAs){
    this.download(ID,"Employee",saveAs);
  }
  
  download(ID,Type,saveAs) {
    this._CustomerComponent.setLoading(true);
  
    this._TicketService.downloadFile(ID,Type).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
      this._CustomerComponent.setLoading(false);
			fileSaver.saveAs(blob, saveAs);
		},
    err => {
      this._CustomerComponent.setLoading(false);
      console.log(err);
    });
}

}
