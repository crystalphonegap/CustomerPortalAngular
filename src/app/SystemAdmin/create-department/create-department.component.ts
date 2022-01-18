import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { constStorage } from 'src/app/models/Storege';
import { DepartmentService } from 'src/app/shared/DepartmentService';
import { SystemAdminComponent } from '../SystemAdmin.component';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class SystemAdminCreateDepartmentComponent implements OnInit {

  constructor(private _SystemAdminComponent: SystemAdminComponent, public datepipe: DatePipe, 
    private router: Router, @Inject(SESSION_STORAGE) 
    private storage: WebStorageService , private alertService: AlertService,
    private _DepartmentService:DepartmentService) { }
  Department;
  DepartmentId;
  Category:string;
  Day1:number;
  Day2:number;
  Day3:number;
  Assign0:string;
  Assign1:string;
  Assign2:string;
  Assign3:string;
  ngOnInit() {
    
    this.DepartmentId = this.storage.get('DepartmentId');
    if (this.DepartmentId != null && this.DepartmentId != '' || this.DepartmentId ==0) {
      this.GetDepartmentData();
    }
    else {
      this.Department = new FormGroup({
        DepartmentNamevtxt: new FormControl('', [Validators.required, Validators.maxLength(256)]),
        CreatedByvtxt: new FormControl('', [Validators.required, Validators.maxLength(256)]),
        StartDatedate: new FormControl('', [Validators.required, Validators.maxLength(256)]),
        EndDatedate: new FormControl('', [Validators.required, Validators.maxLength(256)]),
      });
    }

  }
  GetDepartmentData(){
    this._DepartmentService.GetDepartmentByID(this.DepartmentId).subscribe(
      (res: any) => {
        this.Category=res.CategoryNamevtxt;
        this.Day1=res.EscalationDays1int;
        this.Day2=res.EscalationDays2int;
        this.Day3=res.EscalationDays3int;
        this.Assign0=res.AssignTovtxt;
        this.Assign1=res.Escalation1AssignTovtxt;
        this.Assign2=res.Escalation2AssignTovtxt;
        this. Assign3=res.Escalation3AssignTovtxt;

       
      },
      err => {
        if (err.status == 400)
          this.alertService.error('Error Department not added.');
        else
          console.log(err);
      }
    );

  }
  updateTextBox(Value,Type){
    if(Type=='Category'){
        this.Category=Value;
    }else if(Type=='Day1'){
      this.Day1=Value;
    }else if(Type=='Day2'){
      this.Day2=Value;
    }else if(Type=='Day3'){
      this.Day3=Value;
    }
  }


  selectUserforAssign(UserCode,Assignto){
    if(Assignto==0){
        this.Assign0=UserCode;
    }else if(Assignto==1){
      this.Assign1=UserCode;
    }else if(Assignto==2){
      this.Assign2=UserCode;
    }else if(Assignto==3){
      this.Assign3=UserCode;
    }
  }

  onSubmit(){
    this._SystemAdminComponent.setLoading(true);
    
    if (this.DepartmentId != null && this.DepartmentId != '') {

      let Department = {
        Idbint:this.DepartmentId,
        CategoryNamevtxt:this.Category,
        AssignTovtxt:this.Assign0,
        EscalationDays1int:this.Day1,
        Escalation1AssignTovtxt:this.Assign1,
        EscalationDays2int:this.Day2,
        Escalation2AssignTovtxt:this.Assign2,
        EscalationDays3int:this.Day3,
        Escalation3AssignTovtxt:this.Assign3,
        CreatedByvtxt:  localStorage.getItem(constStorage.UserCode),
      }
      this.updateheader(Department);
    }
    else {

      let Department = {
        Idbint: 0,
        CategoryNamevtxt:this.Category,
        AssignTovtxt:this.Assign0,
        EscalationDays1int:this.Day1,
        Escalation1AssignTovtxt:this.Assign1,
        EscalationDays2int:this.Day2,
        Escalation2AssignTovtxt:this.Assign2,
        EscalationDays3int:this.Day3,
        Escalation3AssignTovtxt:this.Assign3,
        CreatedByvtxt:  localStorage.getItem(constStorage.UserCode),
      }
      this.insertheader(Department);

    }
  }
 

  redirect(type) {
    this._SystemAdminComponent.setLoading(false);
        if (type == 'insert') {
          this.router.navigateByUrl('/SystemAdmin/DepartmentList');
          this.alertService.success('Department added succesfully.');

        } else {
          this.router.navigateByUrl('/SystemAdmin/DepartmentList');
          this.alertService.success('Department Updated succesfully.');

        }
  }

  insertheader(Department) {
    this._DepartmentService.Insert(Department).subscribe(
      (res: any) => {

       this.redirect('insert');
      },
      err => {

        this._SystemAdminComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Category not added.');
        else
          console.log(err);
      }
    );
  }

  updateheader(Department) {
    this._DepartmentService.Update(Department).subscribe(
      (res: any) => {
        this.redirect('Updated');
      },
      err => {

        this._SystemAdminComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Department not Updated.');
        else
          console.log(err);
      }
    );
  }

  Back() {
    this.router.navigateByUrl('/SystemAdmin/DepartmentList');
  }
}
