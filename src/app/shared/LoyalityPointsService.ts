import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class LoyalityPointsService {
  constructor(public datepipe: DatePipe,private fb: FormBuilder, private http: HttpClient) {
   
   }
  readonly BaseURI =  environment.ApiUrl;

  GetLoyalityPointsLists( PageNo, PageSize, KeyWord): Observable<any> {
   
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/LoyalityPoints/GetLoyalityPointsLists/Cement,'+PageNo+ ',' +PageSize+ ',' +KeyWord);
  }

  GetLoyalityPointsCount(  KeyWord): Observable<any> {
  
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/LoyalityPoints/GetLoyalityPointsCount/Cement,' +KeyWord);
  }

  Excel( KeyWord): Observable<any> {
 
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/LoyalityPoints/Excel/Cement,' +KeyWord, { responseType: 'blob' });
  }

  LoyalityPointsExcelUpload(date,formdata) {  
    return this.http.post(this.BaseURI + '/LoyalityPoints/LoyalityPointsExcelUpload/'+date,formdata);
  }
  DownloadSampleExcel() {  
    return this.http.get(this.BaseURI + '/LoyalityPoints/DownloadSampleExcel', { responseType: 'blob' });
  }
  DownloadErrorLoyalityPointsTargetData() {  
    return this.http.get(this.BaseURI + '/LoyalityPoints/DownloadErrorSalesPromoterTargetData', { responseType: 'blob' });
  }
  GetLoyalityPointsDashboard(CustomerCode) {  
    return this.http.get(this.BaseURI + '/LoyalityPoints/GetLoyalityPointsDashboard/'+CustomerCode);
  }
}