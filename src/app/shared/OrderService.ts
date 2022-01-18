import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { DatePipe } from '@angular/common'
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private fb: FormBuilder, private http: HttpClient,public datepipe: DatePipe) {

  }
  readonly BaseURI = environment.ApiUrl;

  InsertOrderHeader(OrderDate): Observable<any> {
    return this.http.post(this.BaseURI + '/Order/InsertOrderHeader', OrderDate);
  }

  UpdateOrderHeader(OrderDate): Observable<any> {
    return this.http.put(this.BaseURI + '/Order/UpdateOrderHeader', OrderDate);
  }

  UpdateOrderHeaderStatus(OrderDate): Observable<any> {
    return this.http.put(this.BaseURI + '/Order/UpdateOrderStatus', OrderDate);
  }

  DeleteOrderDetails(OrderID): Observable<any> {
    return this.http.delete(this.BaseURI + '/Order/DeleteOrderDetails/' + OrderID);
  }

  InsertOrderDetails(OrderDate): Observable<any> {
    return this.http.post(this.BaseURI + '/Order/InsertOrderDetails', OrderDate);
  }


  GetOrderDetails(fromdate, todate, status, customercode, PageNo, PageSize, KeyWord): Observable<any> {
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
    return this.http.get(this.BaseURI + '/Order/GetOrdersByCustomerCode/' + fromdate + ',' + todate + ',' + status + ',' + customercode + ',' + PageNo + ',' + PageSize + ',' + KeyWord);
  }

  GetAllOrdersByCFCode(fromdate, todate, status,UserType, UserCode, PageNo, PageSize, KeyWord): Observable<any> {
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
    return this.http.get(this.BaseURI + '/CFAgent/GetAllOrdersByCFCode/' + fromdate + ',' + todate + ',' + status + ',' + UserType + ',' + UserCode + ',' + PageNo + ',' + PageSize + ',' + KeyWord);
  }


  GetAllOrdersByCFCodeCount(fromdate, todate, status,UserType, Usercode,  KeyWord): Observable<any> {
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
    return this.http.get(this.BaseURI + '/CFAgent/GetAllOrdersByCFCodeCount/' + fromdate + ',' + todate + ',' + status+ ',' + UserType  + ',' + Usercode + ',' + KeyWord);
  }

  GetAllOrderDetails(fromdate, todate, status, PageNo, PageSize, KeyWord): Observable<any> {
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
    return this.http.get(this.BaseURI + '/Order/GetAllOrderLists/' + fromdate + ',' + todate + ',' + status + ',' + PageNo + ',' + PageSize + ',' + KeyWord);
  }

  getOrderCount(fromdate, todate, status, customercode, KeyWord): Observable<any> {
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
    return this.http.get(this.BaseURI + '/Order/GetOrdersByCustomerCodeCount/' + fromdate + ',' + todate + ',' + status + ',' + customercode + ',' + KeyWord);
  }


  getAllOrderCount(fromdate, todate, status, KeyWord): Observable<any> {
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
    return this.http.get(this.BaseURI + '/Order/GetAllOrdersCount/' + fromdate + ',' + todate + ',' + status + ',' + KeyWord);
  }

  getOrderInfo(): Observable<any> {

    return this.http.get(this.BaseURI + '/Order/GetReqOrderNo');
  }


 GetMappedPlantList(Usercode) {
    return this.http.get(this.BaseURI + '/Order/GetMappedPlantList/' + Usercode);
  }



  GetOrderDetailsByOrderID(no) {
    return this.http.get(this.BaseURI + '/Order/GetOrderDetailsByOrderID/' + no);
  }

  GetOrderHeaderByOrderID(no) {
    return this.http.get(this.BaseURI + '/Order/GetOrderHeaderByOrderID/' + no);
  }


  GetSAPOrderCreationResponse(no) {
    return this.http.get(this.BaseURI + '/Order/GetSAPOrderCreationResponse/' + no);
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
    return this.http.get(this.BaseURI + '/Order/Excel/' + fromdate + ',' + todate + ',' + status + ',' + SoldToPartyCodevtxt + ',' + KeyWord, { responseType: 'blob' });
  }

  GetCFAgentPendingOrderDetails(fromdate, todate,UserType,  usercode, PageNo, PageSize, KeyWord): Observable<any> {
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
    return this.http.get(this.BaseURI + '/CFAgent/GetAllPendingOrdersByCFCode/' + fromdate + ',' + todate + ',' + UserType + ',' + usercode + ',' + PageNo + ',' + PageSize + ',' + KeyWord);
  }
  GetCFAgentPendingOrderDetailsCount(fromdate, todate,UserType,  usercode, KeyWord): Observable<any> {
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
    return this.http.get(this.BaseURI + '/CFAgent/GetAllPendingOrdersByCFCodeCount/' + fromdate + ',' + todate + ',' + UserType + ',' + usercode + ',' + KeyWord);
  }


  GetOrderReportList(fromdate, todate, Region, Branch, Territory, status, PageNo, PageSize, KeyWord): Observable<any> {
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
    if (Region == null || Region == "") {
      Region = "NoSearch";
    }
    if (Branch == null || Branch == "") {
      Branch = "NoSearch";
    }
    if (Territory == null || Territory == "") {
      Territory = "NoSearch";
    }
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/Order/GetOrderReportList/'+ fromdate+ ',' +todate+ ',' +Region+ ',' +Branch+ ',' +Territory+ ',' +status+ ',' +PageNo+ ',' +PageSize+ ',' +KeyWord);
  }

  GetAllOrdersCount(fromdate,  todate,  Region,  Branch,  Territory,  status,  KeyWord): Observable<any> {
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
    if (Region == null || Region == "") {
      Region = "NoSearch";
    }
    if (Branch == null || Branch == "") {
      Branch = "NoSearch";
    }
    if (Territory == null || Territory == "") {
      Territory = "NoSearch";
    }
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/Order/GetOrderReportListCount/' +fromdate+ ',' +todate+ ',' +Region+ ',' +Branch+ ',' +Territory+ ',' +status+ ',' +KeyWord);
  }

  GetAllOrdersReportDownload(fromdate,  todate,  Region,  Branch,  Territory,  status,  KeyWord): Observable<any> {
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
    if (Region == null || Region == "") {
      Region = "NoSearch";
    }
    if (Branch == null || Branch == "") {
      Branch = "NoSearch";
    }
    if (Territory == null || Territory == "") {
      Territory = "NoSearch";
    }
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/Order/GetAllOrdersReportDownload/' +fromdate+ ',' +todate+ ',' +Region+ ',' +Branch+ ',' +Territory+ ',' +status+ ',' +KeyWord, { responseType: 'blob' });
  }


}
