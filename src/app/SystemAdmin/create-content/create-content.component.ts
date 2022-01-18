import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { AlertService } from 'src/app/component/alert.service';
import { Heirachy } from 'src/app/models/Heirachy';
import { constStorage } from 'src/app/models/Storege';
import { ContentService } from 'src/app/shared/ContentService';
import { SystemAdminComponent } from '../SystemAdmin.component';


@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.css']
})
export class SystemAdminCreateContentComponent implements OnInit {

  StartDate;
  EndDate;
  SelectedArea: string;
  AreaData = [];
  OtherData;
  i: number = 1;
  j: number = 1;
  AreaSelectedData;
  CompanyRadioButton: boolean = false;
  ZoneRadioButton: boolean = false;
  RegionRadioButton: boolean = false;
  BranchRadioButton: boolean = false;
  TerritoryRadioButton: boolean = false;
  constructor(private _SystemAdminComponent: SystemAdminComponent, public datepipe: DatePipe, private _ContentService: ContentService, private router: Router
    , @Inject(SESSION_STORAGE) private storage: WebStorageService
    , private alertService: AlertService) { }
  Content;
  Contentid = null;
  ngOnInit() {
    this.Contentid = this.storage.get('ContentId');
    if (this.Contentid != null && this.Contentid != '') {
      this.GetContentData();
    }
    else {
      this.Content = new FormGroup({
        Titlevtxt: new FormControl('', [Validators.required, Validators.maxLength(256)]),
        Contentvtxt: new FormControl('', [Validators.required, Validators.maxLength(256)]),
        StartDatedate: new FormControl('', [Validators.required, Validators.maxLength(256)]),
        EndDatedate: new FormControl('', [Validators.required, Validators.maxLength(256)]),
        Statusbit: new FormControl(true, [Validators.required]),
      });
    }

  }
  GetContentData() {
    this._ContentService.GetContentByID(this.Contentid.IDbint).subscribe(
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
        this.Content = new FormGroup({
          IDbint: new FormControl(res[0].IDbint),
          Titlevtxt: new FormControl(res[0].Titlevtxt, [Validators.required, Validators.maxLength(256)]),
          Contentvtxt: new FormControl(res[0].Contentvtxt, [Validators.required, Validators.maxLength(256)]),
          StartDatedate: new FormControl(res[0].StartDatedate, [Validators.required, Validators.maxLength(256)]),
          EndDatedate: new FormControl(res[0].EndDatedate, [Validators.required, Validators.maxLength(256)]),
          Statusbit: new FormControl(res[0].Statusbit, [Validators.required]),
        });
      },
      err => {
        if (err.status == 400)
          this.alertService.error('Error Content not added.');
        else
          console.log(err);
      }
    );

  }

  onContentAreaChange(ApplyTo) {
    this.SelectedArea = ApplyTo;
    if (this.SelectedArea != 'Company')
      this.AreaData = [];
    this.GetHeirachywiseByType();
  }

  GetContentDetailByID() {
    this._SystemAdminComponent.setLoading(true);
    this._ContentService.GetContentDetailByID(this.Contentid.IDbint).subscribe(
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
  GetHeirachywiseByType() {
    if (this.SelectedArea != 'Company'){

      this._SystemAdminComponent.setLoading(true);
      this._ContentService.GetHeirachywiseByType(this.SelectedArea).subscribe(
        (res: any) => {
          this.AreaData = res
          if (this.Contentid != null && this.Contentid != '') {
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

  onCheckBoxChange(Area, event) {
    Area.isActive = event.target.checked;
  }
  onSubmit() {
    this._SystemAdminComponent.setLoading(true);
    let StartDatedateControl = new Date(formatDate(this.Content.controls['StartDatedate'].value, 'yyyy-MM-dd', 'en_US'));
    let EndDatedateControl = new Date(formatDate(this.Content.controls['EndDatedate'].value, 'yyyy-MM-dd', 'en_US'));

    if (StartDatedateControl.getTime() > EndDatedateControl.getTime()) {
      return null;
    }
    if (this.Content.controls['StartDatedate'].value._d != null && this.Content.controls['StartDatedate'].value._d != '') {
      this.StartDate = this.datepipe.transform(this.Content.controls['StartDatedate'].value._d, 'MMM d, y, h:mm:ss a');
    }
    if (this.Content.controls['EndDatedate'].value._d != null && this.Content.controls['EndDatedate'].value._d != '') {
      this.EndDate = this.datepipe.transform(this.Content.controls['EndDatedate'].value._d, 'MMM d, y, h:mm:ss a');
    }
    if (this.Contentid != null && this.Contentid != '') {

      let Content = {
        IDbint: this.Content.controls['IDbint'].value,
        Titlevtxt: this.Content.controls['Titlevtxt'].value,
        Contentvtxt: this.Content.controls['Contentvtxt'].value,
        StartDatedate: this.StartDate,
        EndDatedate: this.EndDate,
        Typevtxt: this.SelectedArea,
        Statusbit: this.Content.controls['Statusbit'].value,
        CreatedByvtxt: localStorage.getItem(constStorage.UserCode)
      }
      this.updateheader(Content);
    }
    else {

      let Content = {
        IDbint: 0,
        Titlevtxt: this.Content.controls['Titlevtxt'].value,
        Contentvtxt: this.Content.controls['Contentvtxt'].value,
        StartDatedate: this.StartDate,
        EndDatedate: this.EndDate,
        Typevtxt: this.SelectedArea,
        Statusbit: this.Content.controls['Statusbit'].value,
        CreatedByvtxt: localStorage.getItem(constStorage.UserCode),
      }
      this.insertheader(Content);

    }
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

          this._ContentService.InsertDetail(tempdata).subscribe(
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
      if (type == 'insert') {
        this.router.navigateByUrl('/SystemAdmin/ContentDetails');
        this.alertService.success('Content added succesfully.');

      } else {
        this.router.navigateByUrl('/SystemAdmin/ContentDetails');
        this.alertService.success('Content Updated succesfully.');

      }
    }
  }

  redirect(type) {
    if (this.i == this.AreaData.length) {
      if (this.j == 1) {
        if (type == 'insert') {
          this.router.navigateByUrl('/SystemAdmin/ContentDetails');
          this.alertService.success('Content added succesfully.');

        } else {
          this.router.navigateByUrl('/SystemAdmin/ContentDetails');
          this.alertService.success('Content Updated succesfully.');

        }
      } else {
        if (type == 'insert') {
          this.router.navigateByUrl('/SystemAdmin/ContentDetails');
          this.alertService.success('Due to some error Content did not added.');

        } else {
          this.router.navigateByUrl('/SystemAdmin/ContentDetails');
          this.alertService.success('Due to some error Content did not Updated.');

        }
      }
    }
  }

  insertheader(Content) {
    this._ContentService.Insert(Content).subscribe(
      (res: any) => {

        this.insertdetaildata(res, 'insert');
      },
      err => {

        this._SystemAdminComponent.setLoading(false);
        if (err.status == 400)
          this.alertService.error('Error Content not added.');
        else
          console.log(err);
      }
    );
  }

  updateheader(Content) {
    this._ContentService.Update(Content).subscribe(
      (res: any) => {
        this.insertdetaildata(Content.IDbint, 'update');
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

}
