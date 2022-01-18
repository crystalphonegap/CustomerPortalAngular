import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { constStorage } from 'src/app/models/Storege';
import { BroadCastServce } from 'src/app/shared/BroadCastServce';
import { ContentService } from 'src/app/shared/ContentService';
import { RoleManagementService } from 'src/app/shared/RoleManagementService';
import { SystemAdminComponent } from '../SystemAdmin.component';


@Component({
  selector: 'app-createbroadcast',
  templateUrl: './createbroadcast.component.html',
  styleUrls: ['./createbroadcast.component.css']
})
export class SystemAdminCreatebroadcastComponent implements OnInit {
  constructor(private _ContentService: ContentService, private _SystemAdminComponent: SystemAdminComponent,public datepipe: DatePipe,private _BroadCastServce: BroadCastServce, private router: Router
    , @Inject(SESSION_STORAGE) private storage: WebStorageService
    , private alertService: AlertService) { }
  StartDate;
  EndDate;
  SelectedArea: string;
  AreaData = [];
  i:number;
  j:number;
  AreaSelectedData;
  CompanyRadioButton: boolean = false;
  ZoneRadioButton: boolean = false;
  RegionRadioButton: boolean = false;
  BranchRadioButton: boolean = false;
  TerritoryRadioButton: boolean = false;
  broadcast;
  BroadCastid = null;
  ngOnInit() {
    this.BroadCastid = this.storage.get('BroadCastId');
    if (this.BroadCastid != null && this.BroadCastid != '') {
      this.GetBroadCastData();
    }
    else {
      this.broadcast = new FormGroup({
        Titlevtxt: new FormControl('', [Validators.required, Validators.maxLength(256)]),
        Messagevtxt: new FormControl('', [Validators.required, Validators.maxLength(256)]),
        StartDatedate: new FormControl('', [Validators.required, Validators.maxLength(256)]),
        EndDatedate: new FormControl('', [Validators.required, Validators.maxLength(256)]),
        Statusbit: new FormControl(true, [Validators.required]),
      });
    }

  }
  GetBroadCastData() {
    this._BroadCastServce.GetBroadCastByID(this.BroadCastid.IDbint).subscribe(
      (res: any) => {
        this.StartDate = res[0].StartDatedate;
        this.EndDate = res[0].EndDatedate;
        this.SelectedArea = res[0].Typevtxt;
        this.onContentAreaChange(this.SelectedArea);
        if (res[0].Typevtxt == 'Company') {
          this.CompanyRadioButton = true;
        }
        if (res[0].Typevtxt == 'Zone') {
          this.ZoneRadioButton = true;
        }
        if (res[0].Typevtxt == 'Region') {
          this.RegionRadioButton = true;
        }
        if (res[0].Typevtxt == 'Branch') {
          this.BranchRadioButton = true;
        }
        if (res[0].Typevtxt == 'Territory') {
          this.TerritoryRadioButton = true;
        }
        this.broadcast = new FormGroup({
          IDbint:  new FormControl(res[0].IDbint),
          Titlevtxt: new FormControl(res[0].Titlevtxt, [Validators.required, Validators.maxLength(256)]),
          Messagevtxt: new FormControl(res[0].Messagevtxt, [Validators.required, Validators.maxLength(256)]),
          StartDatedate: new FormControl(res[0].StartDatedate, [Validators.required, Validators.maxLength(256)]),
          EndDatedate: new FormControl(res[0].EndDatedate, [Validators.required, Validators.maxLength(256)]),
          Statusbit: new FormControl(res[0].Statusbit, [Validators.required]),
        });
      },
      err => {
        if (err.status == 400)
          this.alertService.error('Error Broadcast not added.');
        else
          console.log(err);
      }
    );
    
  }

  onContentAreaChange(ApplyTo) {
      this.SelectedArea = ApplyTo
    if (this.SelectedArea != 'Company')
      this.AreaData = [];
    this.GetHeirachywiseByType();
  }


  GetHeirachywiseByType() {
    
    if (this.SelectedArea != 'Company'){
      
    this._SystemAdminComponent.setLoading(true);
      this._ContentService.GetHeirachywiseByType(this.SelectedArea).subscribe(
        (res: any) => {
          this.AreaData = res
          if (this.BroadCastid != null && this.BroadCastid != '') {
          this.GetContentDetailByID()
          }
          this._SystemAdminComponent.setLoading(false);
        },
        err => {
          this._SystemAdminComponent.setLoading(false);
  
          if (err.status == 400)
            this.alertService.error('Error .');
          else
            console.log(err);
        }
      );
    
    }
  }

  GetContentDetailByID() {
    this._SystemAdminComponent.setLoading(true);
    this._BroadCastServce.GetBroadCastDetailsByID(this.BroadCastid.IDbint).subscribe(
      (res: any) => {
        this.AreaSelectedData = res
        for (let i = 0; i < this.AreaSelectedData.length; i++) {
          for (let j = 0; j < this.AreaData.length; j++) {
            if (this.AreaData[j].Code == this.AreaSelectedData[i].Codevtxt) {
              this.AreaData[j].isActive = true;
              this.AreaData[j].Checked = 1;
            }
          }
        }
        this._SystemAdminComponent.setLoading(false);
      },
      err => {
        this._SystemAdminComponent.setLoading(false);

        if (err.status == 400)
          this.alertService.error('Error Content not Updated.');
        else
          console.log(err);
      }
    );
  }
  onCheckBoxChange(Area,event){
Area.isActive=event.target.checked;
  }
  onSubmit() {
    this._SystemAdminComponent.setLoading(true);
    let StartDatedateControl = new Date(formatDate(this.broadcast.controls['StartDatedate'].value, 'yyyy-MM-dd', 'en_US'));
    let EndDatedateControl = new Date(formatDate(this.broadcast.controls['EndDatedate'].value, 'yyyy-MM-dd', 'en_US'));

    if (StartDatedateControl.getTime() > EndDatedateControl.getTime()) {
      return null;
    }
    if (this.broadcast.controls['StartDatedate'].value._d != null && this.broadcast.controls['StartDatedate'].value._d != '') {
      this.StartDate = this.datepipe.transform(this.broadcast.controls['StartDatedate'].value._d, 'MMM d, y, h:mm:ss a');
    }
    if (this.broadcast.controls['EndDatedate'].value._d != null && this.broadcast.controls['EndDatedate'].value._d != '') {
      this.EndDate = this.datepipe.transform(this.broadcast.controls['EndDatedate'].value._d, 'MMM d, y, h:mm:ss a');
    }
    if (this.BroadCastid != null && this.BroadCastid != '') {
     
    let broadcast = {
      IDbint: this.broadcast.controls['IDbint'].value,
      Titlevtxt: this.broadcast.controls['Titlevtxt'].value,
      Messagevtxt: this.broadcast.controls['Messagevtxt'].value,
      StartDatedate: this.StartDate ,
      EndDatedate: this.EndDate  ,
      Typevtxt: this.SelectedArea,
      Statusbit: this.broadcast.controls['Statusbit'].value,
      CreatedByvtxt: localStorage.getItem(constStorage.UserCode),
      CreatedByint: localStorage.getItem(constStorage.IDbint),
    }
this.updateheader(broadcast);
   
    }
    else {
      let broadcast = {
        IDbint: 0,
        Titlevtxt: this.broadcast.controls['Titlevtxt'].value,
        Messagevtxt: this.broadcast.controls['Messagevtxt'].value,
        StartDatedate: this.StartDate,
        EndDatedate: this.EndDate,
        Typevtxt: this.SelectedArea,
        Statusbit: this.broadcast.controls['Statusbit'].value,
        CreatedByvtxt: localStorage.getItem(constStorage.UserCode),
        CreatedByint: localStorage.getItem(constStorage.IDbint),
      }
  this.insertheader(broadcast);
   
    }
  }

  insertheader(broadcast) {
    this._BroadCastServce.Insert(broadcast).subscribe(
      (res: any) => {

        this.insertdetaildata(res, 'update');
        this._SystemAdminComponent.setLoading(false);
        this.router.navigateByUrl('/SystemAdmin/BroadCastDetails');
        this.alertService.success('Broadcast added succesfully.');
      },
      err => {
        this._SystemAdminComponent.setLoading(false);
        if (err.text = "Inserted..") {
          this.storage.remove('BroadCastId');
          this.router.navigateByUrl('/SystemAdmin/BroadCastDetails');
          this.alertService.success('Broadcast added succesfully.');
        }
        if (err.status == 400)
          this.alertService.error('Error Broadcast not added.');
        else
          console.log(err);
      }
    );
  }

  updateheader(broadcast) {
    
    this._BroadCastServce.Update(broadcast).subscribe(
      (res: any) => {
        this.insertdetaildata(broadcast.IDbint, 'update');
        this._SystemAdminComponent.setLoading(false);
        this.router.navigateByUrl('/SystemAdmin/BroadCastDetails');
        this.alertService.success('Broadcast Updated succesfully.');
      },
      err => {
        if (err.text = "Inserted..") {
          
    this._SystemAdminComponent.setLoading(false);
          this.alertService.success('Broadcast Updated succesfully.');
        }
        if (err.status == 400)
          this.alertService.error('Error Broadcast not Updated.');
        else
          console.log(err);
      }
    );
  }

  insertdetaildata(id, type) {
    if (this.AreaData[0] != null) {
      this.i = 0;
      this.j = 1;
      for (let i = 0; i < this.AreaData.length; i++) {
        this.i++;
        if (this.AreaData[i].isActive == true) {
          let tempdata = {
            HeaderIDbint: id,
            Codevtxt: this.AreaData[i].Code,
            Namevtxt: this.AreaData[i].Name,
          }
          this._BroadCastServce.InsertDetail(tempdata).subscribe(
            (res: any) => {
              this._SystemAdminComponent.setLoading(false);
              this.redirect(type);

            },
            err => {
              this._SystemAdminComponent.setLoading(false);
              let j = 0;
              if (err.status == 400) {
                this.alertService.error('Error Content not added.');
                return;
              }

              else
                console.log(err);
            }
          );
        }
      }

    } else {
      this.router.navigateByUrl('/SystemAdmin/BroadCastDetails');
      if (type == 'insert') {
        this.alertService.success('Content added succesfully.');

      } else {
        this.alertService.success('Content Updated succesfully.');

      }
    }
  }


  redirect(type) {
    if (this.i == this.AreaData.length) {
      if (this.j == 1) {
        this.router.navigateByUrl('/SystemAdmin/BroadCastDetails');
        if (type == 'insert') {
          this.alertService.success('Content added succesfully.');

        } else {
          this.alertService.success('Content Updated succesfully.');

        }
      } else {
        if (type == 'insert') {
          this.alertService.success('Due to some error Content did not added.');

        } else {
          this.alertService.success('Due to some error Content did not Updated.');

        }
      }
    }
  }
}
