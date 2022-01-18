
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { constStorage } from 'src/app/models/Storege';
import { DepartmentService } from 'src/app/shared/DepartmentService';
import { TicketService } from 'src/app/shared/TicketService';

import * as fileSaver from 'file-saver';
import { SystemAdminComponent } from '../SystemAdmin.component';
@Component({
  selector: 'app-mis-report-view-open-ticket-by-category',
  templateUrl: './mis-report-view-open-ticket-by-category.component.html',
  styleUrls: ['./mis-report-view-open-ticket-by-category.component.css']
})
export class MisReportViewOpenTicketByCategoryComponent implements OnInit {

  constructor(private _DepartmentService: DepartmentService,
    private _SystemAdminComponent : SystemAdminComponent,
    private alertService: AlertService, public datepipe: DatePipe,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private _TicketService: TicketService) { }
  Departments: any = [];
  Remark: string;
  DetailData:any=[];
  photoName :string; fileExtension:string;fileExtensionError:boolean;
  Low: boolean = false;
  Open: boolean = false;
  InProcess: boolean = false;
  Resolved: boolean = false;
  Normal: boolean = true;
  High: boolean = false;
  TicketId: number;
  PreSelectedDepartmentId: number = -1;
  SelectedDepartmentName:string;
  fileToUpload;
  SelectedDepartmentId: number = -1;
  TicketInfo: any = [];
TicketDetail: any = [];
  ngOnInit() {
    this.TicketId = this.storage.get('TicketId');
    this.getDepartments();
    this.getTicketInfo();
    this.getTicketDetail();
  }
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    this.fileToUpload = <File>files[0];
    this.photoName = this.fileToUpload.name;
    var allowedExtensions = 
       ["jpg","jpeg","png","JPG","JPEG","JFIF","BMP","SVG","pdf","txt","doc","docx","xls","xlsx","csv","gif"];
    this.fileExtension = this.photoName.split('.').pop();

    if(this.isInArray(allowedExtensions, this.fileExtension)) {
        this.fileExtensionError = false;
    } else {
      this.alertService.warn("Note your file can not be uploaded because Images , Excel, Docs, Pdf, Text file's are only Allowed");
        this.fileExtensionError = true;
    }
  }
  
  isInArray(array, word) {
    return array.indexOf(word.toLowerCase()) > -1;
}
  getDepartments() {
    this._SystemAdminComponent.setLoading(true);
    this._DepartmentService.GetDepartmentMasterForDropdownlist(null, 1).subscribe((res: any) => {
      this.Departments = res;
      this._SystemAdminComponent.setLoading(false);
    },
      err => {
        this._SystemAdminComponent.setLoading(false);
        console.log(err);
      })
  }

  getTicketInfo() {
    this._SystemAdminComponent.setLoading(true);
    this._TicketService.getTicketHeaderDetail(this.TicketId).subscribe((res: any) => {
      this.TicketInfo = res;
      if(this.TicketInfo.Priorityvtxt=='Low'){
        this.Low=true;
      }else if(this.TicketInfo.Priorityvtxt=='Normal'){
        this.Normal=true;
      }else if(this.TicketInfo.Priorityvtxt=='High'){
        this.High=true;
      }

      if (this.TicketInfo.Statusvtxt == "Open") {
        this.Open = true;
        this.InProcess = false;
        this.Resolved = false;
      } else if (this.TicketInfo.Statusvtxt == "In-Process") {
        this.Open = false;
        this.InProcess = true;
        this.Resolved = false;
      } else if (this.TicketInfo.Statusvtxt == "Resolved") {
        this.Open = false;
        this.InProcess = false;
        this.Resolved = true;
      }
      this.SelectedDepartmentId = res.Departmentidint;
      this.PreSelectedDepartmentId=res.Departmentidint;
      this.SelectedDepartmentName=res.DepartmentNamevtxt;
      this._SystemAdminComponent.setLoading(false);
    },
      err => {
        this._SystemAdminComponent.setLoading(false);
        console.log(err);
      })
  }

  getTicketDetail() {
    this._SystemAdminComponent.setLoading(true);
    this._TicketService.getTicketDetail(this.TicketId).subscribe((res: any) => {
      this.TicketDetail = res;
     
      this._SystemAdminComponent.setLoading(false);
    },
      err => {
        this._SystemAdminComponent.setLoading(false);
        console.log(err);
      })
  }


  onRadioButtonTypePriorityChange(value) {
    if (value == "Low") {
      this.Low = true;
      this.Normal = false;
      this.High = false;
    } else if (value == "Normal") {
      this.Low = false;
      this.Normal = true;
      this.High = false;
    } else if (value == "High") {
      this.Low = false;
      this.Normal = false;
      this.High = true;
    }

  }
  onRadioButtonStatusChange(value) {
    if (value == "Open") {
      this.Open = true;
      this.InProcess = false;
      this.Resolved = false;
    } else   if (value == "InProcess") {
      this.Open = false;
      this.InProcess = true;
      this.Resolved = false;
    } else if (value == "Resolved") {
      this.Open = false;
      this.InProcess = false;
      this.Resolved = true;
    }

  }
  SelectedDepartment(Departmentid) {
    if (Departmentid != null && Departmentid != "" && Departmentid != "none") {
      this.SelectedDepartmentId = Departmentid;
      this.getDepartment(Departmentid);
    } else {
      this.SelectedDepartmentId = -1;
    }
  }
  updateRemark(value){
    this.Remark=value;
  }


  onSubmit() {


    if (this.SelectedDepartmentId != -1 ) {
      if (this.SelectedDepartmentId == this.PreSelectedDepartmentId ) {
          if (this.Open ==true) {
            this.Open=false;
            this.InProcess=true;
          }
            if (this.Remark != null && this.Remark != '') {
              this.updateDetailData();
              this.InsertTicketDetail();
            } else {
              this.alertService.warn("Please fill the mandatory fields..");
            }
         
       }else{
          if (this.Remark != null && this.Remark != '') {
            this.updateDetailData();
            this.InsertTicketDetail();
          } else {
            this.alertService.warn("Please fill the mandatory fields..");
          }
       
       }
    } else {
      this.alertService.warn("Please select department first");
    }

  }

  getDepartment(Id) {
    this._SystemAdminComponent.setLoading(true);
    this._DepartmentService.GetDepartmentByID(Id).subscribe((res: any) => {
      this.SelectedDepartmentName = res.CategoryNamevtxt;
      this._SystemAdminComponent.setLoading(false);
    })
  }

  updateDetailData(){
    let status;
   if (this.InProcess == true) {
      status = "In-Process";
    } else if (this.Resolved == true) {
      status = "Resolved";
    } else if (this.Open == true) {
      status = "Open";
    }
    let Priorityvtxt;
    if (this.Low == true) {
      Priorityvtxt = "Low";
    } else if (this.Normal == true) {
      Priorityvtxt = "Normal";
    } else if (this.High == true) {
      Priorityvtxt = "High";
    }


  this.DetailData={
    HIDbint : this.TicketInfo.Idbint,
    CustomerCodevtxt : this.TicketInfo.CustomerCodevtxt,
    UserCodevtxt : localStorage.getItem(constStorage.UserCode),
    UserTypevtxt : localStorage.getItem(constStorage.UserType),
    Remarksvtxt : this.Remark,
    Departmentidint:this.SelectedDepartmentId,
    DepartmentNamevtxt:this.SelectedDepartmentName,
    Priorityvtxt:Priorityvtxt,
    Statusvtxt:status,
    CreatedByvtxt : localStorage.getItem(constStorage.UserCode),
  }
  }


  InsertTicketDetail() {
    this._SystemAdminComponent.setLoading(true);
    this._TicketService.InsertTicketDetail(this.DetailData).subscribe(
      (res: any) => {
        this._SystemAdminComponent.setLoading(false);
        if(this.fileToUpload!=null && this.fileExtensionError!=true){
          this.UploadAttachment( res);
        }else
        this.Redirect(0);
      },
      err => {
        this._SystemAdminComponent.setLoading(false);
        this.alertService.error('Due to some error ticket not created.');
        console.log(err);
      }
    );
  }


  UploadAttachment(ID){
    const formData = new FormData();
    this._SystemAdminComponent.setLoading(true);
    formData.append('file',  this.fileToUpload,  this.fileToUpload.name);
    this._TicketService.UploadFileForEmp( formData,ID,this.TicketInfo.RefNovtxt,localStorage.getItem(constStorage.UserCode))
      .subscribe(
        (res: any) => {
          this._SystemAdminComponent.setLoading(false);
          this.router.navigateByUrl('/SystemAdmin/TicketMISCategoryTypeWiseList');
          this.alertService.success("Ticket Updated");
        },
        err => {
          let error =err.error.text;
          this._SystemAdminComponent.setLoading(false);
            if(err.status == 200 &&  error=='Error in Uploaded File' ){
            let error =err.error.text;
            this.alertService.error(error);
            return;   
          }
          else if (err.status == 400)
            this.alertService.error('Failed to upload.');
          else
            console.log(err);;
            return
        }
      );
  }

  

  Redirect(status) {
    if (status == 0) {
      this.router.navigateByUrl('/SystemAdmin/TicketMISCategoryTypeWiseList');
      this.alertService.success('Ticket Updated.');
    }
  }

  Back() {
    this.router.navigateByUrl('/SystemAdmin/TicketMISCategoryTypeWiseList');
  }
  customerDownload(ID,saveAs){
    this.download(ID,"Customer",saveAs);
  }
  
  employeeDownload(ID,saveAs){
    this.download(ID,"Employee",saveAs);
  }
  
  download(ID,Type,saveAs) {
    this._SystemAdminComponent.setLoading(true);
  
    this._TicketService.downloadFile(ID,Type).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
      this._SystemAdminComponent.setLoading(false);
			fileSaver.saveAs(blob, saveAs);
		},
    err => {
      this._SystemAdminComponent.setLoading(false);
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
