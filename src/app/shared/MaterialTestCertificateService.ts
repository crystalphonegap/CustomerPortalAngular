import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class MaterialTestCertificateService {
  constructor(public datepipe: DatePipe,private fb: FormBuilder, private http: HttpClient) {

   }
  readonly BaseURI =  environment.ApiUrl;

  GetMaterialCertificateList(model): Observable<any> {
    return this.http.post(this.BaseURI + '/MaterialTestCertificate/GetMaterialCertificateList', model);
  }

  GetMaterialCertificateCount(model): Observable<any> {

    return this.http.post(this.BaseURI + '/MaterialTestCertificate/GetMaterialCertificateCount', model);
  }

  GetMaterialCertificateByID( ID ): Observable<any> {
    return this.http.get(this.BaseURI + '/MaterialTestCertificate/GetMaterialCertificateByID/'+ID);
  }
  GetImageByID( ID,For ): Observable<any> {

    return this.http.get(this.BaseURI + '/MaterialTestCertificate/GetImageByID/'+ID+","+For,  { responseType: 'json' });
  }

  InsertMaterialCertificate(model) {
    return this.http.post(this.BaseURI + '/MaterialTestCertificate/InsertMaterialCertificate', model);
  }

  InsertMaterialCertificateDetail(model) {
    return this.http.post(this.BaseURI + '/MaterialTestCertificate/InsertMaterialCertificateDetail', model);
  }


  GetDocNo(  ): Observable<any> {
    return this.http.get(this.BaseURI + '/MaterialTestCertificate/GetDocNo');
  }

  DownloadSampleDealerProfileExcel() {
    return this.http.get(this.BaseURI + '/MaterialTestCertificate/DownloadSampleDealerProfileExcel', { responseType: 'blob' });
  }
  DownloadErrorDealerProfileUpload() {
    return this.http.get(this.BaseURI + '/MaterialTestCertificate/DownloadErrorDealerProfileUpload', { responseType: 'blob' });
  }



  DealerProfileUpload(formdata) {
    return this.http.post(this.BaseURI + '/MaterialTestCertificate/DealerProfileUpload',formdata);
  }




  Excel( KeyWord): Observable<any> {

    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/MaterialTestCertificate/Excel/Cement,' +KeyWord, { responseType: 'blob' });
  }

  DownloadSampleExcel() {
    return this.http.get(this.BaseURI + '/MaterialTestCertificate/DownloadSampleExcel', { responseType: 'blob' });
  }
  DownloadErrorMaterialTestCertificateTargetData() {
    return this.http.get(this.BaseURI + '/MaterialTestCertificate/DownloadErrorSalesPromoterTargetData', { responseType: 'blob' });
  }
  GetMaterialTestCertificateDashboard(CustomerCode) {
    return this.http.get(this.BaseURI + '/MaterialTestCertificate/GetMaterialTestCertificateDashboard/'+CustomerCode);
  }

  DeleteMaterialTestCertificate(ID) {
    return this.http.get(this.BaseURI + '/MaterialTestCertificate/DeleteMaterialTestCertificate/'+ID);
  }


  UpdateUserProfileImage(model) {
    return this.http.post(this.BaseURI + '/MaterialTestCertificate/UpdateUserProfileImage',model);


  }

  GetStaticDealerProfileData(CustomerCode) {
    return this.http.get(this.BaseURI + '/MaterialTestCertificate/GetStaticDealerProfileData/'+CustomerCode);
  }


  GetCustomerProfileList( PageNo, PageSize,KeyWord): Observable<any> {

    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }

    return this.http.get(this.BaseURI + '/MaterialTestCertificate/GetCustomerProfileList/'+PageNo+ ',' +PageSize+ ',' +KeyWord);
  }


  GetCustomerProfileListCount( KeyWord): Observable<any> {

    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/MaterialTestCertificate/GetCustomerProfileListCount/' +KeyWord );
  }


  DownloadCustomerProfileList( KeyWord): Observable<any> {

    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/MaterialTestCertificate/DownloadCustomerProfileList,' +KeyWord, { responseType: 'blob' });
  }
}
