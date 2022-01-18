import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { DatePipe } from '@angular/common'
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PriceApprovalService {

  constructor(private fb: FormBuilder, private http: HttpClient,public datepipe: DatePipe) {

  }
  readonly BaseURI = environment.ApiUrl;

  InsertPriceApproval(InsertDate): Observable<any> {
    return this.http.post(this.BaseURI + '/PriceApproval/InsertPriceApproval', InsertDate);
  }
  KAMFirstRequestPriceApproval(InsertData): Observable<any> {
    return this.http.post(this.BaseURI + '/RFCCall/KAMFirstRequestPriceApproval', InsertData);
  }


  InsertFinalPriceApproval(InsertDate): Observable<any> {
    return this.http.post(this.BaseURI + '/PriceApproval/InsertFinalPriceApproval', InsertDate);
  }
  KAMSecondRequestPriceApproval(InsertData): Observable<any> {
    return this.http.post(this.BaseURI + '/RFCCall/KAMSecondRequestPriceApproval', InsertData);
  }


  getPriceApprovalCount(status,createdby, KeyWord): Observable<any> {
    if (KeyWord == null || KeyWord == '') {
      KeyWord = 'NoSearch';
    }
    return this.http.get(this.BaseURI + '/PriceApproval/GetPriceApprovalListCount/' + status + ',' + createdby + ',' + KeyWord);
  }

  GetPriceApprovalDetails(status, createdby, PageNo, PageSize, KeyWord): Observable<any> {

    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/PriceApproval/GetPriceApprovalList/' + status + ',' + createdby + ',' + PageNo + ',' + PageSize + ',' + KeyWord);
  }

  downloadFile(status, SoldToPartyCodevtxt, KeyWord): any {
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/PriceApproval/PriceApprovalDownloadExcel/' + status + ',' + SoldToPartyCodevtxt + ',' + KeyWord, { responseType: 'blob' });
  }
  GetPriceApprovalById(no) {
    return this.http.get(this.BaseURI + '/PriceApproval/GetPriceApprovalById/' + no);
  }


}
