import { Component, Inject, OnInit } from '@angular/core';
import { AlertService } from 'src/app/component/alert.service';
import { PaginationService } from 'src/app/component/pagination/pagination.service';
import { ItemMasterService } from 'src/app/shared/ItemMasterService';
import { MaterialTestCertificateService } from 'src/app/shared/MaterialTestCertificateService';
import { OrderService } from 'src/app/shared/OrderService';
import { SystemAdminService } from 'src/app/shared/SystemAdminService';
import { SystemAdminComponent } from 'src/app/SystemAdmin/SystemAdmin.component';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import * as fileSaver from 'file-saver';
import { PriceApprovalService } from 'src/app/shared/PriceApprovalService';
import { CustomerService } from 'src/app/shared/CustomerService';
import { UserService } from 'src/app/shared/user.service';
import { KAMComponent } from '../KAM.component';
import { constStorage } from 'src/app/models/Storege';

@Component({
  selector: 'app-kammaterial-test-certificate-upload',
  templateUrl: './kammaterial-test-certificate-upload.component.html',
  styleUrls: ['./kammaterial-test-certificate-upload.component.css']
})
export class KAMMaterialTestCertificateUploadComponent implements OnInit {

  constructor(public datepipe: DatePipe,
    private _KAMComponent:KAMComponent,private service: UserService, private router: Router,
    public paginationService: PaginationService, @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private _MaterialTestCertificateService:MaterialTestCertificateService,private alertService: AlertService,
    private _ItemMasterService : ItemMasterService) { }
    fileToUpload;
    base64textString;
    MTCDetail = [];
  
    AllItemMasterData;
    DocNovtxt;
    DocDatedatetime;
    Gradetxt = '0';
    Years = [];
    weeks = [];
    Days = 'All';
    week = 0;
    year;
  ngOnInit() {
    // this.GetMappedPlantList();
    // tslint:disable-next-line: radix
    const startYear = parseInt( this.datepipe.transform(new Date(), 'yyyy')) - 21;
    for (let count: number = 0 ; count < 21 ; count++){
      this.weeks.push(count + 1);
      this.Years.push(startYear + count)  ;
    }
    const CurrentYear = parseInt( this.datepipe.transform(new Date(), 'yyyy'))  ;
    this.year= CurrentYear;
    for (let count: number = 0 ; count < 30 ; count++){
      this.weeks.push(22 + count);
      this.Years.push(CurrentYear + count)  ;
    }
    this.weeks.push(52);
    this._KAMComponent.setLoading(false);

    this.getAllItemMasterData();
    this.GetDocNovtxt();
  }
  getAllItemMasterData() {
    this._KAMComponent.setLoading(true);
    this._ItemMasterService.getAllItemMasterData().subscribe(
      data => {
        this.AllItemMasterData = data;
        this._KAMComponent.setLoading(false);
      }
    );
  }
  Back() {
    this.router.navigateByUrl('/KAM/MaterialTestCertificateList');
  }

  GetDocNovtxt() {
    this._MaterialTestCertificateService.GetDocNo().subscribe((data: any) => {
      this.DocNovtxt = data[0].DocNovtxt;

    },
      err => {
        this._KAMComponent.setLoading(false);
        console.log(err);
        return ;
      });
  }





  BooleancheckForValueNotExist(value) {
    return value == null || value === ''  ||  value === '0' || value ===  'All'  || value ===  0;
  }



  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    this.fileToUpload = files[0] as File;


    if (files && this.fileToUpload) {
      const reader = new FileReader();

      reader.onload = this.handleFile.bind(this);
      reader.readAsBinaryString(this.fileToUpload);
  }


  }
  handleFile(event) {
    const binaryString = event.target.result;
    this.base64textString = btoa(binaryString);
    this.MTCDetail.push({HeaderIdint: 0 , AttachmentFileNamevtxt : this.fileToUpload.name, AttachmentBytesvtxt :  this.base64textString});
  }
  DeleteFile(index){
    this.MTCDetail.splice(index, 1);
  }


  Submit() {
    this.alertService.clear();
    if (this.BooleancheckForValueNotExist(this.DocDatedatetime)) {
      this.alertService.error('Please select Date');
      return;
    }
    if (this.BooleancheckForValueNotExist(this.year)) {
      this.alertService.error('Please select the year');
      return;
    }
    if (this.BooleancheckForValueNotExist(this.Gradetxt )) {
      this.alertService.error('Please select Grade ');
      return;
    }

    if (this.BooleancheckForValueNotExist(this.Days)) {
      this.alertService.error('Please select Days');
      return;
    }

    if (this.BooleancheckForValueNotExist(this.week)) {
      this.alertService.error('Please select week');
      return;
    }

    if(this.MTCDetail.length === 0){
      this.alertService.error('Please attach file');
      return;
    }
    if (this.BooleancheckForValueNotExist(this.MTCDetail[0].AttachmentBytesvtxt)) {
      this.alertService.error('Please attach file');
      return;
    }

    this._KAMComponent.setLoading(true);

    // Depotvtxt : this.selectedplant,
    // ValidTillDate: this.datepipe.transform(this.ValidTillDate._d, 'dd-MM-yyyy'),

    const model = {
      DocNovtxt: this.DocNovtxt,
      DocDatedatetime:  this.datepipe.transform(this.DocDatedatetime._d, 'dd-MM-yyyy'),
      Yeartxt: this.year,
      Gradetxt:  this.Gradetxt ,
      Daystxt:  this.Days ,
      Depotvtxt : 'non',
      Weektxt:  this.week ,
      CreatedBytxt:  localStorage.getItem(constStorage.UserCode),
    };

    this._MaterialTestCertificateService.InsertMaterialCertificate(model)
      .subscribe(
        (res: any) => {
          this.UploadFile(res);
        },
        err => {
          this._KAMComponent.setLoading(false);
          const error = err.error.text;
          if (error === 'file is  uploaded Successfully.') {
            this.alertService.error(error);
            this.router.navigateByUrl('/KAM/MaterialTestCertificateList');
            this.alertService.error(error);
          } else if (err.status === 200 && error === 'Error in Uploaded File') {
            this.alertService.error(error);
            return;
          } else if (err.status === 400) {
            this.alertService.error('Failed to upload.');
           } else {
            console.log(err);
          }
          return;
        }
      );
  }

  UploadFile(index){
    this.MTCDetail[0].HeaderIdint = index;
    this._MaterialTestCertificateService.InsertMaterialCertificateDetail(this.MTCDetail)
    .subscribe(
      (res: any) => {
        this.alertService.success('file is  uploaded Successfully.');
        this._KAMComponent.setLoading(false);
        this.router.navigateByUrl('/KAM/MaterialTestCertificateList');
      },
      err => {
        this._KAMComponent.setLoading(false);
        const error = err.error.text;
        if (error === 'file is  uploaded Successfully.') {
          this.alertService.error(error);
          this.router.navigateByUrl('/KAM/MaterialTestCertificateList');
          this.alertService.error(error);
        } else if (err.status === 200 && error === 'Error in Uploaded File') {
          this.alertService.error(error);
          return;
        } else if (err.status === 400) {
          this.alertService.error('Failed to upload.');
         } else {
          console.log(err);
        }
        return;
      }
    );
  }

}
