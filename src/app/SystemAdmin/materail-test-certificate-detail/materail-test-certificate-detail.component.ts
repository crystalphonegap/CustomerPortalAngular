import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { PaginationService } from '../../component/pagination/pagination.service';
import * as fileSaver from 'file-saver';
import { AlertService } from 'src/app/component/alert.service';
import { OrderService } from 'src/app/shared/OrderService';
import { DatePipe } from '@angular/common';
import { SystemAdminComponent } from '../SystemAdmin.component';
import { SystemAdminService } from 'src/app/shared/SystemAdminService';
import { MaterialTestCertificateService } from 'src/app/shared/MaterialTestCertificateService';
import { ItemMasterService } from 'src/app/shared/ItemMasterService';

@Component({
  selector: 'app-materail-test-certificate-detail',
  templateUrl: './materail-test-certificate-detail.component.html',
  styleUrls: ['./materail-test-certificate-detail.component.css']
})
export class MaterailTestCertificateDetailComponent implements OnInit {

  constructor(private _MaterialTestCertificateService:MaterialTestCertificateService,public datepipe: DatePipe, private router: Router, private _Orderservice: OrderService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService, private _SystemAdminComponent: SystemAdminComponent,
    private _SystemAdminService: SystemAdminService, private _ItemMasterService : ItemMasterService
,         public paginationService: PaginationService, private alertService: AlertService) {
}

MTCDetail: any = [];

  ngOnInit() {
      this.GetDate();
  }

  GetDate() {
    this._SystemAdminComponent.setLoading(true);
    this._MaterialTestCertificateService.GetMaterialCertificateByID(localStorage.getItem('ID')).subscribe((data: any) => {
      this.MTCDetail = data;
      this._SystemAdminComponent.setLoading(false);
    },
    err => {
      this._SystemAdminComponent.setLoading(false);
      console.log(err);
    });

  }


 ImageView(ID,title) {
  const extension  = title.substring(title.length - 3, title.length);
  if( extension.toLowerCase( ) === 'pdf') {
    this.ViewPDF(ID);
  } else {
   localStorage.setItem('title', title );
   localStorage.setItem('base64Image', ID );
   this.router.navigateByUrl('/SystemAdmin/ImageViewer');
  }
}

ViewPDF(ID){
 this._SystemAdminComponent.setLoading(true);
 this._MaterialTestCertificateService.GetImageByID(ID, 'MTC' ).subscribe((res: any) => {
   this._SystemAdminComponent.setLoading(false);
   console.log(res);
   const byteArray = new Uint8Array(atob(res).split('').map(char => char.charCodeAt(0)));
   const file = new Blob([byteArray], { type: 'application/pdf' });
   const fileURL = URL.createObjectURL(file);
   window.open(fileURL);
 },
 err => {
   this._SystemAdminComponent.setLoading(false);
   console.log(err);
 });

}



  // MaterialTestCertificateList
}
