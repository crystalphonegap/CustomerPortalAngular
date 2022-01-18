import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BalanceConfirmation {
  constructor(private fb: FormBuilder, private http: HttpClient) {

  }
  readonly BaseURI = environment.ApiUrl;
  DownloadBalanceConfirmation(usercode) {
    return this.http.get(this.BaseURI + '/BalanceConfirmation/DownloadBalanceConfirmation/'+usercode, { responseType: 'blob' });
  }
  DownloadSampleBalanceConf() {
    return this.http.get(this.BaseURI + '/BalanceConfirmation/DownloadSampleBalanceConf', { responseType: 'blob' });
  }
  UploadBalanceConfirmation(fromdate, todate, expirydate, CreatedBy,Type, Data): Observable<any> {
    return this.http.post(this.BaseURI + '/BalanceConfirmation/UploadBalanceConfirmation/' + fromdate + ',' + todate + ',' + expirydate + ',' + CreatedBy+ ',' + Type, Data);
  }
  UpdateExpiryDate(Data): Observable<any> {
    return this.http.put(this.BaseURI + '/BalanceConfirmation/UpdateExpiryDate',Data );
  }
  GetBalConfHeaderDataForAH(usercode, pageNo, DataPerPage) {
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalConfHeaderDataForAH/' + usercode + ',' + pageNo + ',' + DataPerPage);
  }
  GetBalConfHeaderDataForAHCount(usercode) {
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalConfHeaderDataForAHCount/' + usercode);
  }


  GetBalConfDetailsDataForAHcc(no) {
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalConfDetailsDataForAH/' + no);
  }
  getDeliveryOrderHeaderDataByOrderNo(no) {
    return this.http.get(this.BaseURI + '/DeliveryOrder/GetDeliveryOrderHeaderByOrderNo/' + no);
  }

  GetBalConfHeaderDataForCustomer(usercode, pageNo, DataPerPage) {

    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalConfHeaderDataForCustomer/' + usercode + ',' + pageNo + ',' + DataPerPage);
  }
  GetBalConfHeaderDataForCustomerCount(usercode) {
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalConfHeaderDataForCustomerCount/' + usercode);
  }

  GetBalConfHeaderDataByID(usercode, no) {
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalConfHeaderDataByID/' + usercode + ',' + no);
  }

  GetBalanceConfLog( no) {
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalanceConfLog/' + no);
  }

  GetBalConfDetailDataByID(usercode, no) {
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalConfDetailDataByID/' + usercode + ',' + no);
  }

  UpdateBalanceConfirmationByDealer( Id,RequestNo, Action,  User,  Remarks,formData) {
    return this.http.post(this.BaseURI + '/BalanceConfirmation/UpdateBalanceConfirmationByDealer/'+ Id + ',' + RequestNo + ',' + Action + ',' + User+ ',' + Remarks,formData);
  }

  UpdateBalanceConfirmationByDealerDetails(formData) {
    return this.http.put(this.BaseURI + '/BalanceConfirmation/UpdateBalanceConfirmationByDealerDetails',formData);
  }

  GetBalConfHeaderDataForEmployees(fromdate,todate,status,usertype,usercode, pageNo, DataPerPage, KeyWord) {
    if(KeyWord==null || KeyWord==''){
      KeyWord='NoSearch';
  }
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalConfHeaderDataForEmployees/' + fromdate + ',' + todate+ ',' + status+ ',' + usertype+ ',' + usercode+ ',' + pageNo+ ',' + DataPerPage+ ',' + KeyWord);
  }
  GetBalConfHeaderDataForEmployeesCount(fromdate,todate,status,usertype,usercode, KeyWord) {
    if(KeyWord==null || KeyWord==''){
      KeyWord='NoSearch';
  }
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalConfHeaderDataForEmployeesCount/'  + fromdate + ',' + todate+ ',' + status+ ',' + usertype+ ',' + usercode+ ',' + KeyWord);
  }

  GetSPCFABalanceConfHeaderListForEmployee(fromdate,todate,status,usertype,usercode, pageNo, DataPerPage, KeyWord) {
    if(KeyWord==null || KeyWord==''){
      KeyWord='NoSearch';
  }
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetSPCFABalanceConfHeaderListForEmployee/' + fromdate + ',' + todate+ ',' + status+ ',' + usertype+ ',' + usercode+ ',' + pageNo+ ',' + DataPerPage+ ',' + KeyWord);
  }
  GetSPCFABalanceConfHeaderListForEmployeeCount(fromdate,todate,status,usertype,usercode, KeyWord) {
    if(KeyWord==null || KeyWord==''){
      KeyWord='NoSearch';
  }
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetSPCFABalanceConfHeaderListForEmployeeCount/'  + fromdate + ',' + todate+ ',' + status+ ',' + usertype+ ',' + usercode+ ',' + KeyWord);
  }


  GetBalConfHeaderDataForSPCFA(usercode, pageNo, DataPerPage) {

    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalConfHeaderDataForSPCFA/' + usercode + ',' + pageNo + ',' + DataPerPage);
  }
  GetBalConfHeaderDataForSPCFACount(usercode) {
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalConfHeaderDataForSPCFACount/' + usercode);
  }


  GetBalConfHeaderDataByIDSPCFA(usercode, no) {
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalConfHeaderDataByIDSPCFA/' + usercode + ',' + no);
  }
  GetBalConfDetailDataByIDSPCFA(usercode, no,EmpCode) {
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalConfDetailDataByIDSPCFA/' + usercode + ',' + no+',' +EmpCode);
  }

  UpdateBalanceConfirmationBySPCFA( Id,RequestNo, Action,  User,  Remarks,formData) {
    return this.http.post(this.BaseURI + '/BalanceConfirmation/UpdateBalanceConfirmationBySPCFA/'+ Id + ',' + RequestNo + ',' + Action + ',' + User+ ',' + Remarks,formData);
  }

  UpdateBalanceConfirmationBySPCFADetails(formData) {
    return this.http.put(this.BaseURI + '/BalanceConfirmation/UpdateBalanceConfirmationBySPCFADetails',formData);
  }


  downloadFile(CustomerCode,ID): Observable<any> {
    return this.http.get(this.BaseURI + '/BalanceConfirmation/DownloadFile/'+CustomerCode+','+ID , { responseType: 'blob' });
  }


  InsertBalanceConfLog(Model): Observable<any> {
    return this.http.post(this.BaseURI + '/BalanceConfirmation/InsertBalanceConfLog' , Model);
  }

  downloadFileForEMP(Mode,ID): Observable<any> {
    return this.http.get(this.BaseURI + '/BalanceConfirmation/DownloadFileForEmp/'+Mode+','+ID , { responseType: 'blob' });
  }


}
