import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UploadEmployee {
  constructor(private fb: FormBuilder, private http: HttpClient) {
   
   }
  readonly BaseURI = environment.ApiUrl;

  GetSalesOffices(): Observable<any> {
    return this.http.get(this.BaseURI + '/UploadEmployee/GetSalesOffices');
  }
  
  GetSalesOfficeByUserCode(usercode): Observable<any> {
    return this.http.get(this.BaseURI + '/UploadEmployee/GetOrderAnalystMapppingData/' + usercode);
  }
  InsertOrderAnalystData(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/UploadEmployee/InsertOrderAnalystData',  Data);
  }
  Delete(usercode): Observable<any> {
    return this.http.delete(this.BaseURI + '/UploadEmployee/Delete/' + usercode);
  }

  
  RetailerUpload(formdata) {  
  return this.http.post(this.BaseURI + '/UploadEmployee/RetailerUpload',formdata);
}
DownloadSampleEmployeeUploadExcelForNoParentCode(UserType) {  
  return this.http.get(this.BaseURI + '/UploadEmployee/DownloadSampleEmployeeUploadExcelForNoParentCode/'+UserType, { responseType: 'blob' });
}
DownloadErrorEmployeeUploadforNoParentCode(UserType) {  
  return this.http.get(this.BaseURI + '/UploadEmployee/DownloadErrorEmployeeUploadforNoParentCode/'+UserType, { responseType: 'blob' });
}
}
