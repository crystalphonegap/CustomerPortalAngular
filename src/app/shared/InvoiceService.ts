import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';

import * as fileSaver from 'file-saver';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(private fb: FormBuilder, private http: HttpClient,public datepipe: DatePipe) {
  
   }
  readonly BaseURI =  environment.ApiUrl;


getAllInvoiceData(fromdate,todate,status,SoldToPartyCodevtxt,pageNo,DataPerPage,KeyWord) {
  if (fromdate == null || fromdate == "") {
    fromdate = new Date();
    fromdate = new Date(fromdate);
    fromdate.setDate(fromdate.getDate() - 10);
    fromdate = this.datepipe.transform(fromdate, 'yyyy-MM-dd');
  } 
  // else {
  //   fromdate = this.datepipe.transform(fromdate, 'yyyy-MM-dd');
  // }
  if (todate == null || todate == "") {
    todate = new Date();
    todate = this.datepipe.transform(todate, 'yyyy-MM-dd');
  }
  //  else {
  //   todate = this.datepipe.transform(todate, 'yyyy-MM-dd');
  // }
  if (KeyWord == null || KeyWord == "") {
    KeyWord = "NoSearch";
  }
    return this.http.get(this.BaseURI + '/InvoiceMaster/GetInvoiceSearch/'+fromdate + ',' +todate + ',' +status + ','+SoldToPartyCodevtxt+','+pageNo+','+DataPerPage+','+KeyWord);
  }
  getAllInvoiceCount(fromdate,todate,status,SoldToPartyCode,KeyWord): Observable<any> {
    if (fromdate == null || fromdate == "") {
      fromdate = new Date();
      fromdate = new Date(fromdate);
      fromdate.setDate(fromdate.getDate() - 10);
      fromdate = this.datepipe.transform(fromdate, 'yyyy-MM-dd');
    }
    //  else {
    //   fromdate = this.datepipe.transform(fromdate, 'yyyy-MM-dd');
    // }
    if (todate == null || todate == "") {
      todate = new Date();
      todate = this.datepipe.transform(todate, 'yyyy-MM-dd');
    } 
    // else {
    //   todate = this.datepipe.transform(todate, 'yyyy-MM-dd');
    // }
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/InvoiceMaster/GetInvoiceSearchCount/'+fromdate + ',' +todate + ',' +status + ','+SoldToPartyCode+','+KeyWord);
  }
  getAllInvoiceDataByInvoiceNo(no) {
    return this.http.get(this.BaseURI + '/InvoiceMaster/getAllInvoiceDataByInvoiceNo/'+no);
  }
  getInvoiceHeaderDataByInvoiceNo(no) {
    return this.http.get(this.BaseURI + '/InvoiceMaster/getInvoiceHeaderDataByInvoiceNo/'+no);
  }

  invoicePDFDownload(invoiceNo,customerCode) {
    return this.http.get(this.BaseURI + '/RFCCall/invoicePDFDownloadAsync/'+invoiceNo+','+customerCode, { responseType: 'text' });
  }
  downloadFile(fromdate, todate, status, SoldToPartyCodevtxt, KeyWord): any {
    if (fromdate == null || fromdate == "") {
      fromdate = new Date();
      fromdate = new Date(fromdate);
      fromdate.setDate(fromdate.getDate() - 10);
      fromdate = this.datepipe.transform(fromdate, 'yyyy-MM-dd');
    } 
    if (todate == null || todate == "") {
      todate = new Date();
      todate = this.datepipe.transform(todate, 'yyyy-MM-dd');
    }
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/InvoiceMaster/GetInvoiceDownload/' + fromdate + ',' + todate + ',' + status + ',' + SoldToPartyCodevtxt + ',' + KeyWord, { responseType: 'blob' });
  }
}