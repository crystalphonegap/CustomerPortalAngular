import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/component/alert.service';
import { MaterialTestCertificateService } from 'src/app/shared/MaterialTestCertificateService';
import { SystemAdminComponent } from '../SystemAdmin.component';
import * as fileSaver from 'file-saver';
@Component({
  selector: 'app-customer-profile-data-upload',
  templateUrl: './customer-profile-data-upload.component.html',
  styleUrls: ['./customer-profile-data-upload.component.css']
})
export class CustomerProfileDataUploadComponent implements OnInit {

  constructor( private alertService : AlertService, private router: Router,private _SystemAdminComponent : SystemAdminComponent,private _MaterialTestCertificateService:MaterialTestCertificateService) { }
  fileToUpload;
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    this.fileToUpload = <File>files[0];
    }

  ngOnInit(): void {

  }

  Back(){
    this.router.navigateByUrl('/SystemAdmin/CustomerProfileDataList');
}


Submit(){
  this.alertService.clear();

  this._SystemAdminComponent.setLoading(true);
  const formData = new FormData();
  formData.append('file',  this.fileToUpload,  this.fileToUpload.name);
   this._MaterialTestCertificateService.DealerProfileUpload( formData)
    .subscribe(
      (res: any) => {
        this._SystemAdminComponent.setLoading(false);
        this.router.navigateByUrl('/SystemAdmin/MaterialTestCertificateList');
      },
      err => {
        let error =err.error.text;
        this._SystemAdminComponent.setLoading(false);
        this.alertService.error(error);
        if(error=='file is  uploaded Successfully.' ){
          this.alertService.error(error);
        } else if(err.status == 200 &&  error=='Error in Uploaded File' ){
          this.alertService.error(error);
          this._MaterialTestCertificateService.DownloadErrorDealerProfileUpload().subscribe(response => {
            let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            fileSaver.saveAs(blob, 'ErrorLogfileforCustomerAppointmentUpload.xlsx');
          },
          err => {
            this._SystemAdminComponent.setLoading(false);
              console.log(err);
          })
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


download() {
  this._SystemAdminComponent.setLoading(true);
  this._MaterialTestCertificateService.DownloadSampleDealerProfileExcel().subscribe(response => {
    let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    this._SystemAdminComponent.setLoading(false);
    fileSaver.saveAs(blob, 'SampleCustomerProfileDataUpload.xlsx');
  },
  err => {
    this._SystemAdminComponent.setLoading(false);
    console.log('Error downloading the file');
  }
    )
}

}
