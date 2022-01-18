import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {
 
  constructor(private fb: FormBuilder, private http: HttpClient, public datepipe: DatePipe) {
  
  }
  readonly BaseURI = environment.ApiUrl;


  getSalesOrderHeaderDataByOrderNo(no): Observable<any> {
    return this.http.get(this.BaseURI + '/SalesOrder/getAllSalesOrderHeaderDataByOrderNo/' + no);
  }
  getAllSalesOrderData(fromdate, todate, status, SoldToPartyCodevtxt, pageNo, DataPerPage, KeyWord) {
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
    return this.http.get(this.BaseURI + '/SalesOrder/GetSalesOrderSearch/' + fromdate + ',' + todate + ',' + status + ',' + pageNo + ',' + DataPerPage + ',' + SoldToPartyCodevtxt + ',' + KeyWord);

  }
  getAllSalesOrderCount(fromdate, todate, status, SoldToPartyCode, KeyWord): Observable<any> {
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
    return this.http.get(this.BaseURI + '/SalesOrder/GetSalesOrderSearchCount/' + fromdate + ',' + todate + ',' + status + ',' + SoldToPartyCode + ',' + KeyWord);
  }


  getAllSalesOrderforDashboard(UserCode): Observable<any> {

    return this.http.get(this.BaseURI + '/SalesOrder/GetSalesOrderCount/' + UserCode + ',NoSearch');
  }

  getAllDeliveryOrderDataBySalesOrderNo(no): Observable<any> {
    return this.http.get(this.BaseURI + '/SalesOrder/getAllSalesOrderDataByOrderNo/' + no);
  }ys

  getAllSalesOrderDataByOrderNo(no): Observable<any> {
    return this.http.get(this.BaseURI + '/SalesOrder/getAllSalesOrderDataByOrderNo/' + no);
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
    return this.http.get(this.BaseURI + '/SalesOrder/Excel/' + fromdate + ',' + todate + ',' + status + ',' + SoldToPartyCodevtxt + ',' + KeyWord, { responseType: 'blob' });
  }




  
GetOrderBlockedSalesOrderSearch(  UserCode,UserType,fromdate, todate,  pageNo, DataPerPage, KeyWord) {
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
return this.http.get(this.BaseURI + '/SalesOrder/GetOrderBlockedSalesOrderSearch/'  + UserCode + ',' +  UserType + ','+ fromdate + ',' + todate + ',' + pageNo + ',' + DataPerPage + ','  + KeyWord);

  }
  GetOrderBlockedSalesOrderCount( UserCode,UserType,fromdate, todate, KeyWord): Observable<any> {
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
    return this.http.get(this.BaseURI + '/SalesOrder/GetOrderBlockedSalesOrderCount/'   + UserCode + ',' +  UserType + ','+ fromdate + ',' + todate + ','  + KeyWord);
  }

}