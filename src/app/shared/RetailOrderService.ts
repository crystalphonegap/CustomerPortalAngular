import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class RetailOrderService {
 
  constructor(private fb: FormBuilder, private http: HttpClient, public datepipe: DatePipe) {
   
  }
  readonly BaseURI = environment.ApiUrl;

  GetOrderDetailsByOrderID(OrderId){
    return this.http.get(this.BaseURI + '/RetailOrder/GetRetailOrderDetailsByOrderID/' + OrderId);
  }
  
  UpdateRetailOrder(OrderData){
    return this.http.put(this.BaseURI + '/RetailOrder/UpdateRetailOrder',  OrderData);
  }
  
  getAllRetailOrderData(fromdate, todate, status, UserCode,UserType, pageNo, DataPerPage, KeyWord) {
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
    return this.http.get(this.BaseURI + '/RetailOrder/GetRetailOrderSearch/' + fromdate + ',' + todate + ',' + status + ',' + pageNo + ',' + DataPerPage + ',' + UserCode+ ',' + UserType + ',' + KeyWord);

  }
  getAllRetailOrderCount(fromdate, todate, status,  UserCode,UserType, KeyWord): Observable<any> {
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
    return this.http.get(this.BaseURI + '/RetailOrder/GetRetailOrderSearchCount/' + fromdate + ',' + todate + ',' + status + ',' + UserCode + ',' + UserType + ',' + KeyWord);
  }


  downloadFile(fromdate, todate, status,  UserCode,UserType, KeyWord): any {
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
    return this.http.get(this.BaseURI + '/RetailOrder/Excel/' + fromdate + ',' + todate + ',' + status + ',' + UserCode + ',' + UserType + ',' + KeyWord, { responseType: 'blob' });
  }
  

  
  InsertOrderDetails(OrderDate): Observable<any> {
    return this.http.post(this.BaseURI + '/RetailOrder/InsertRetailOrder', OrderDate);
  }

  
  UpdateOrderHeader(OrderDate): Observable<any> {
    return this.http.put(this.BaseURI + '/RetailOrder/UpdateRetailOrder', OrderDate);
  }



  
  getAllRetailData( status, UserCode,UserType, pageNo, DataPerPage, KeyWord) {
  
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/RetailOrder/GetRetailSearch/'  + status + ',' + pageNo + ',' + DataPerPage + ',' + UserCode+ ',' + UserType + ',' + KeyWord);

  }
  getAllRetailCount(status,  UserCode,UserType, KeyWord): Observable<any> {
  
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/RetailOrder/GetRetailCount/'+ status + ',' + UserCode + ',' + UserType + ',' + KeyWord);
  }

  downloadRetailFile(status,  UserCode,UserType, KeyWord): any {
   
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/RetailOrder/GetRetailDownload/'  + status + ',' + UserCode + ',' + UserType + ',' + KeyWord, { responseType: 'blob' });
  }
  

}