import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SalesPromoterTargetData {
  constructor(private fb: FormBuilder, private http: HttpClient) {
   
   }
  readonly BaseURI = environment.ApiUrl;

  SalesPromoterTargetDataExcelUpload(formdata) {  
  return this.http.post(this.BaseURI + '/SalesPromoterTargetData/SalesPromoterTargetDataExcelUpload',formdata);
}
DownloadSampleExcel() {  
  return this.http.get(this.BaseURI + '/SalesPromoterTargetData/DownloadSampleExcel', { responseType: 'blob' });
}
DownloadErrorSalesPromoterTargetData() {  
  return this.http.get(this.BaseURI + '/SalesPromoterTargetData/DownloadErrorSalesPromoterTargetData', { responseType: 'blob' });
}

SalesPromoterTargetDataForDashboard(UserCode , Usertype): Observable<any> {  
  return this.http.get(this.BaseURI + '/SalesPromoterTargetData/SalesPromoterTargetDataForDashboard/'+UserCode+','+Usertype);
}


SalesPromoterTargetData(pageno,pagesize,keyword) {  
  if(keyword==''|| keyword==null){
    keyword='NoSearch';
  }
  return this.http.get(this.BaseURI + '/SalesPromoterTargetData/SalesPromoterTargetData/'+pageno+','+pagesize+','+keyword); 
}  
SalesPromoterTargetDataCount(keyword): Observable<any> {  
  if(keyword==''|| keyword==null){
    keyword='NoSearch';
  }
  return this.http.get(this.BaseURI + '/SalesPromoterTargetData/SalesPromoterTargetDataCount/'+keyword);
}  

}
