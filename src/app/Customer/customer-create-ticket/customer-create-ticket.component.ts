import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { CustomerService } from 'src/app/shared/CustomerService';
import { FormControl, FormGroup } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/component/alert.service';
import { DatePipe, formatDate } from '@angular/common';
import { CustomerComponent } from '../Customer.component';
import { DepartmentService } from 'src/app/shared/DepartmentService';
import { TicketService } from 'src/app/shared/TicketService';
import { constStorage } from 'src/app/models/Storege';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-customer-create-ticket',
  templateUrl: './customer-create-ticket.component.html',
  styleUrls: ['./customer-create-ticket.component.css']
})
export class CustomerCreateTicketComponent implements OnInit {
  constructor(private _DepartmentService: DepartmentService, private _CustomerService: CustomerService,
    private _CustomerComponent: CustomerComponent, 
    private alertService: AlertService, public datepipe: DatePipe,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private _TicketService: TicketService) { }
  HeaderData: any;
  Userid: string;
  TicketInfo: any = [];
  photoName:any;
  Departments: any = [];
  fileToUpload;
  fileExtension:any;
  status: number;
  fileExtensionError:boolean;
  Complaint: boolean = true;
  Feedback: boolean = false;
  Low: boolean = false;
  Normal: boolean = true;
  CustomerData: any = [];
  High: boolean = false;
  SelectedDepartmentId: number = -1;
  DescriptionTxt: string;
  SubjectTxt: string;
  SelectedDepartmentName: string;
  ngOnInit() {
    this.Userid = localStorage.getItem('UserCode');

    let UserCode;
    let UserTypetxt = localStorage.getItem('UserType');
    if (UserTypetxt == 'Customer') {
      UserCode = this.Userid;
    } else {
      UserCode = localStorage.getItem('CustCode');
    }
    this.getCustomerData(UserCode);
    this.getTicketInfo();
    this.getDepartments();
  }

  SelectedDepartment(Department) {
    if (Department != null && Department != "" && Department != "none") {
      this.SelectedDepartmentId = Department;
      this.getDepartment(Department);
    } else {
      this.SelectedDepartmentId = -1;
    }
  }

  getDepartment(Id) {
    this._CustomerComponent.setLoading(true);
    this._DepartmentService.GetDepartmentByID(Id).subscribe((res: any) => {
      this.SelectedDepartmentName = res.CategoryNamevtxt;
      this._CustomerComponent.setLoading(false);
    },
    err => {
      this._CustomerComponent.setLoading(false);
    })
  }
  onRadioButtonTypeChange(value) {

    if (value == "Complaint") {
      this.Complaint = true;
      this.Feedback = false;
    } else if (value == "Feedback") {
      this.Feedback = true;
      this.Complaint = false;
    }

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
  updateDescription(value) {
    this.DescriptionTxt = value;
  }
  updateSubject(value) {
    this.SubjectTxt = value;
  }
  getDepartments() {
    this._CustomerComponent.setLoading(true);
    this._DepartmentService.GetDepartmentMasterForDropdownlist(null, 1).subscribe((res: any) => {
      this.Departments = res;
      this._CustomerComponent.setLoading(false);
    })
  }
  getTicketInfo() {
    this._CustomerComponent.setLoading(true);
    this._TicketService.getTicketInfo().subscribe(
      data => {
        this.TicketInfo = data['0'];
        this._CustomerComponent.setLoading(false);
        // this.PoDate = this.datepipe.transform(data['0'].TicketDatedate, 'dd/MM/yyyy');
      }
    );
  }
  getCustomerData(Userid) {
    if (Userid !== null && Userid !== "") {
      this._CustomerComponent.setLoading(true);
      this._CustomerService.getCustomerData(Userid).subscribe(
        data => {
          this.CustomerData = data['0'];
          this._CustomerComponent.setLoading(false);
        }
      );
    }
  }



  onSubmit(type) {
    if (this.SelectedDepartmentId != -1) {
      if (this.DescriptionTxt != null && this.DescriptionTxt != '' && this.SubjectTxt != null && this.SubjectTxt != '') {
        this.status = 1;
        this.UpdateHeaderData(type);
        this.InsertTicketHeader(this.HeaderData);
      } else {
        this.alertService.warn("Please fill the mandatory fields..");
      }
    } else {
      this.alertService.warn("Please select department first");
    }

  }

  InsertTicketDetails(ID){
    const formData = new FormData();
    this._CustomerComponent.setLoading(true);
    formData.append('file',  this.fileToUpload,  this.fileToUpload.name);
    this._TicketService.UploadFileForCustomer( formData,ID,this.TicketInfo.RefNovtxt,localStorage.getItem(constStorage.UserCode))
      .subscribe(
        (res: any) => {
          this._CustomerComponent.setLoading(false);
          this.router.navigateByUrl('/Customer/TicketStatus');
          this.alertService.success("Ticket Raised");
        },
        err => {
          let error =err.error.text;
          this._CustomerComponent.setLoading(false);
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
      this.router.navigateByUrl('/Customer/TicketStatus');
      this.alertService.success('Ticket Raise.');
    }
  }


  InsertTicketHeader(Header) {
    this._CustomerComponent.setLoading(true);
    this._TicketService.InsertTicketHeader(Header).subscribe(
      (res: any) => {
        this._CustomerComponent.setLoading(false);
        // this.InsertTicketDetails( res);
     
        if(this.fileToUpload!=null &&this.fileExtensionError!=true){
          this.InsertTicketDetails(res);
        }else
        this.Redirect(0);
      },
      err => {
        this._CustomerComponent.setLoading(false);
        this.alertService.error('Due to some error ticket not created.');
        console.log(err);
      }
    );
  }


  UpdateHeaderData(type) {
    let UserCode;
    let UserTypetxt = localStorage.getItem('UserType');
    if (UserTypetxt == 'Customer') {
      UserCode = localStorage.getItem('UserCode');
    } else {
      UserCode = localStorage.getItem('CustCode');
    }
    let Priorityvtxt;
    if (this.Low == true) {
      Priorityvtxt = "Low";
    } else if (this.Normal == true) {
      Priorityvtxt = "Normal";
    } else if (this.High == true) {
      Priorityvtxt = "High";
    }
    let Typevtxt;
    if (this.Complaint == true) {
      Typevtxt = "Complaint";
    } else if (this.Feedback == true) {
      Typevtxt = "Feedback";
    }
    this.HeaderData = {
      CustomerCodevtxt: this.CustomerData.CustCodevtxt,
      CustomerNamevtxt: this.CustomerData.CustNamevtxt,
      Priorityvtxt: Priorityvtxt,
      Departmentidint: this.SelectedDepartmentId,
      DepartmentNamevtxt: this.SelectedDepartmentName,
      Typevtxt: Typevtxt,
      Subjectvtxt: this.SubjectTxt,
      Descriptionvtxt: this.DescriptionTxt,
      CreatedByvtxt: localStorage.getItem(constStorage.UserCode)

    }
  }
  Back() {
    this.router.navigateByUrl('/Customer/TicketStatus');
  }
}
