import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common'
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private fb: FormBuilder, private http: HttpClient, public datepipe: DatePipe) {

  }
  readonly BaseURI = environment.ApiUrl;

  InsertTicketHeader(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/Ticket/InsertTicketHeader', Data);
  }


  InsertTicketDetail(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/Ticket/InsertTicketDetail', Data);
  }

  GetTicketList(fromdate, todate, UserCode, UserType, PageNo, PageSize, status, KeyWord): Observable<any> {
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
    return this.http.get(this.BaseURI + '/Ticket/GetTicketHeaderList/' + fromdate + ',' + todate + ',' + UserCode + ',' + UserType + ',' + PageNo + ',' + PageSize + ',' + status + ',' + KeyWord);
  }


  GetTicketCount(fromdate, todate, UserCode, UserType, status, KeyWord): Observable<any> {
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
    return this.http.get(this.BaseURI + '/Ticket/GetTicketHeaderListCount/' + fromdate + ',' + todate + ',' + UserCode + ',' + UserType + ',' + status + ',' + KeyWord);
  }



  UpdateOrderHeaderStatus(OrderDate): Observable<any> {
    return this.http.put(this.BaseURI + '/Ticket/UpdateOrderStatus', OrderDate);
  }
  getTicketInfo(): Observable<any> {

    return this.http.get(this.BaseURI + '/Ticket/GetReqOrderNo');
  }

  getTicketHeaderDetail(TicketID): Observable<any> {
    return this.http.get(this.BaseURI + '/Ticket/GetTicketHeaderDetail/' + TicketID);
  }

  getTicketDetail(TicketID): Observable<any> {
    return this.http.get(this.BaseURI + '/Ticket/GetTicketDetailId/' + TicketID);
  }


  UploadFileForCustomer(formData, ID, TokenNo, UserCode) {

    return this.http.post(this.BaseURI + '/Ticket/UploadFileForCustomer/' + ID + ',' + TokenNo + ',' + UserCode, formData);
  }


  UploadFileForEmp(formData, ID, TokenNo, UserCode) {

    return this.http.post(this.BaseURI + '/Ticket/UploadFileForEmp/' + ID + ',' + TokenNo + ',' + UserCode, formData);
  }

  downloadFile(ID, Type): Observable<any> {
    return this.http.get(this.BaseURI + '/Ticket/DownloadFile/' + ID + ',' + Type, { responseType: 'blob' });
  }

  DownloadTicketHeaderListForEmp(fromdate, todate, usercode, usertype, status, KeyWord): Observable<any> {
    return this.http.get(this.BaseURI + '/Ticket/DownloadTicketHeaderListForEmp/' + fromdate + ',' + todate + ',' + usercode + ',' + usertype + ',' + status + ',' + KeyWord, { responseType: 'blob' });
  }

  DownloadTicketHeaderList(fromdate, todate, usercode, status, KeyWord): Observable<any> {
    return this.http.get(this.BaseURI + '/Ticket/DownloadTicketHeaderList/' + fromdate + ',' + todate + ',' + usercode + ',' + status + ',' + KeyWord, { responseType: 'blob' });
  }


  ticketMISReportCategoryWise(userCode, userType): Observable<any> {
    return this.http.get(this.BaseURI + '/Ticket/MISReportCategoryWise/' + userCode + ',' + userType);
  }

  ticketMISReportAssignToWise(userCode, userType): Observable<any> {
    return this.http.get(this.BaseURI + '/Ticket/MISReportAssignToWise/' + userCode + ',' + userType);
  }



  DownloadMISReportCategoryWise(usercode, usertype): Observable<any> {
    return this.http.get(this.BaseURI + '/Ticket/DownloadMISReportCategoryWise/' + usercode + ',' + usertype, { responseType: 'blob' });
  }

  DownloadMISReportAssignToWise(usercode, usertype): Observable<any> {
    return this.http.get(this.BaseURI + '/Ticket/DownloadMISReportAssignToWise/' + usercode + ',' + usertype, { responseType: 'blob' });
  }


  getTicketMISListByCategory(UserCode, UserType,Priority, Type, Category, From, To, PageNo, PageSize, KeyWord): Observable<any> {

    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/Ticket/MISReportCategoryWiseList/' + UserCode + ',' + UserType + ','
    + Priority + ','+ Type + ','+ Category + ','+ From + ','+ To + ','
    + PageNo + ',' + PageSize  + ',' + KeyWord);
  }

  getTicketMISListCountByCategory(UserCode, UserType,Priority, Type, Category, From, To, KeyWord): Observable<any> {

    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/Ticket/MISReportCategoryWiseListCount/' + UserCode + ',' + UserType + ','
    + Priority + ','+ Type + ','+ Category + ','+ From + ','+ To 
    + ',' + KeyWord);
  }


  getTicketMISListByUsertype(UserCode, UserType,Priority, Type, AssignTO, From, To, PageNo, PageSize, KeyWord): Observable<any> {

    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/Ticket/MISReportAssignToWiseList/' + UserCode + ',' + UserType + ','
    + Priority + ','+ Type + ','+ AssignTO + ','+ From + ','+ To + ','
    + PageNo + ',' + PageSize  + ',' + KeyWord);
  }

  getTicketMISListCountByUsertype(UserCode, UserType,Priority, Type, AssignTO, From, To, KeyWord): Observable<any> {

    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/Ticket/MISReportAssignToWiseListCount/'
     + UserCode + ',' + UserType + ','
    + Priority + ','+ Type + ','+ AssignTO + ','+ From + ','+ To 
    + ',' + KeyWord);
  }

  DownloadMISReportCategoryWiseMIS(UserCode, UserType,Priority, Type, Category, From, To, KeyWord): Observable<any> {
    
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/Ticket/MISReportCategoryWiseListDownload/'
    + UserCode + ',' + UserType + ','
    + Priority + ','+ Type + ','+ Category + ','+ From + ','+ To 
    + ',' + KeyWord, { responseType: 'blob' });
  }

  DownloadMISReportAssignToWiseMIS(UserCode, UserType,Priority, Type, AssignTO, From, To, KeyWord): Observable<any> {
    
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/Ticket/MISReportAssignToWiseListDownload/' 
    + UserCode + ',' + UserType + ','
    + Priority + ','+ Type + ','+ AssignTO + ','+ From + ','+ To 
    + ',' + KeyWord, { responseType: 'blob' });
  }


}