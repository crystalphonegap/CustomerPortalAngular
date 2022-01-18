import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class DeliveryOrderService {
 
  constructor( public datepipe: DatePipe,private fb: FormBuilder, private http: HttpClient,) {
    
  }
  readonly BaseURI = environment.ApiUrl;


  getAllOrderData(fromdate,todate,status,SoldToPartyCodevtxt, pageNo, DataPerPage, KeyWord) {
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
    return this.http.get(this.BaseURI + '/DeliveryOrder/GetDeliveryOrderSearch/'+fromdate + ',' +todate + ',' +status + ',' + SoldToPartyCodevtxt + ',' + pageNo + ',' + DataPerPage + ',' + KeyWord);
  }
  getAllOrderDataByOrderNo(no) {
    return this.http.get(this.BaseURI + '/DeliveryOrder/GetDeliveryOrderByOrderNo/' + no);
  }
  getDeliveryOrderHeaderDataByOrderNo(no) {
    return this.http.get(this.BaseURI + '/DeliveryOrder/GetDeliveryOrderHeaderByOrderNo/' + no);
  }
  SetDeliveryStatus(Data) {
    return this.http.put(this.BaseURI + '/DeliveryOrder/SetDeliveryStatus',Data);
  }
  getAllOrderCount(fromdate,todate,status,SoldToPartyCode, KeyWord): Observable<any> {
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
    return this.http.get(this.BaseURI + '/DeliveryOrder/GetDeliveryOrderCount/' +fromdate + ',' +todate+ ',' +status+ ',' +SoldToPartyCode + ',' + KeyWord);
  }
  getAllOrdersCountforDashboard(UserCode): Observable<any> {

    return this.http.get(this.BaseURI + '/DeliveryOrder/getAllOrdersCountforCustomerDashboard/' + UserCode );
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
    return this.http.get(this.BaseURI + '/DeliveryOrder/Excel/' + fromdate + ',' + todate + ',' + status + ',' + SoldToPartyCodevtxt + ',' + KeyWord, { responseType: 'blob' });
  }

  
  GetShipToDeliveryOrderSearch(fromdate,todate,status,SoldToPartyCodevtxt, pageNo, DataPerPage, KeyWord) {
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
    return this.http.get(this.BaseURI + '/DeliveryOrder/GetShipToDeliveryOrderSearch/'+fromdate + ',' +todate + ',' +status + ',' + SoldToPartyCodevtxt + ',' + pageNo + ',' + DataPerPage + ',' + KeyWord);
  }
  
  GetShipToDeliveryOrderCount(fromdate,todate,status,SoldToPartyCode, KeyWord): Observable<any> {
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
    return this.http.get(this.BaseURI + '/DeliveryOrder/GetShipToDeliveryOrderCount/' +fromdate + ',' +todate+ ',' +status+ ',' +SoldToPartyCode + ',' + KeyWord);
  }
  
  ShipToDeliveryOrdersExportTOExcel(fromdate, todate, status, SoldToPartyCodevtxt, KeyWord): any {

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
    return this.http.get(this.BaseURI + '/DeliveryOrder/ShipToDeliveryOrdersExportTOExcel/' + fromdate + ',' + todate + ',' + status + ',' + SoldToPartyCodevtxt + ',' + KeyWord, { responseType: 'blob' });
  }
}