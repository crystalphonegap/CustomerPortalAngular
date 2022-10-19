import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders,HttpParams,HttpResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Options } from 'selenium-webdriver';
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

  GetBalConfHeaderDataForRHCount(fromdate, todate,usertype,usercode,Region,Branch,Territory) {
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalConfHeaderDataForRHCount/'+ fromdate + ',' + todate + ',' + usercode + ','+usertype+','+Region+',' + Branch+ ',' + Territory);
  }
  GetBalConfActionReportCount(fromdate, todate,usertype,usercode,Region,Branch,Territory) {
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalConfHeaderDataForActionReportCount/'+ fromdate + ',' + todate + ',' + usertype + ','+usercode+','+Region+',' + Branch+ ',' + Territory);
  }

  GetBalConfActionReport(fromdate, todate,usertype,usercode,Region,Branch,Territory,pageNo, DataPerPage) {
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalConfHeaderDataForActionReport/'+ fromdate + ',' + todate + ',' +usertype    + ','+usercode+','+Region+',' + Branch+ ',' + Territory+ ',' + pageNo + ',' + DataPerPage);
  }

  GetBalConfHeaderDataForRH(fromdate, todate,usertype,usercode,Region,Branch,Territory, pageNo, DataPerPage) {
    debugger
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalConfHeaderDataForRH/'+ fromdate + ',' + todate + ','+usertype+',' + usercode + ','+Region+',' + Branch+ ',' + Territory+','+ pageNo + ',' +DataPerPage);
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

  GetBalanceConfAttachments(ID) {
    debugger
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalanceConfAttachment/'+ID);
  }

  GetBalConfDetailDataByID(usercode, no) {
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalConfDetailDataByID/' + usercode + ',' + no);
  }

  UpdateBalanceConfirmationByDealer( Id,RequestNo, Action,  User,  Remarks,formData) {
    return this.http.post(this.BaseURI + '/BalanceConfirmation/UpdateBalanceConfirmationByDealer/'+ Id + ',' + RequestNo + ',' + Action + ',' + User+ ',' + Remarks,formData);
  }

  UpdateBalanceConfirmationByEmp( Id,RequestNo, Action,  usertype,usercode,  Remarks,formData) {
    return this.http.post(this.BaseURI + '/BalanceConfirmation/UpdateBalanceConfirmationByEmp/'+ Id + ',' + RequestNo + ',' + Action + ',' + usertype+ ',' + usercode+ ',' + Remarks,formData);
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

  downloadBalanceConfAttachmentfile(ID): Observable<any> {
    return this.http.get(this.BaseURI + '/BalanceConfirmation/GetBalanceConfLogAttachmentDownload/'+ID , { responseType: 'blob' });
  }

  getmeetproToken() {
//     let body = new URLSearchParams();
//     body.set("grant_type","password");
//     body.set("username","Prod_meetpro");
//     body.set("password","m#+wlxi-wu3EsTecrIgahacr");
//   //   var reqbody = {
//   //     'Content-Type': "application/x-www-form-urlencoded",
//   //     'grant_type': "password",
//   //     'username':"Prod_meetpro",
//   //     'password':"m#+wlxi-wu3EsTecrIgahacr",  
//   // }
//   let headers = new HttpHeaders(
//     {
//       'Content-Type': "application/x-www-form-urlencoded"
//     }
//   );
//   let options={headers:headers};
// debugger
// //return this.http.post('https://meetpro.pilportal.com:11692/token', body, {headers:{'Content-Type': 'application/x-www-form-urlencoded'}});
//     return this.http.post('https://meetpro.pilportal.com:11692/token', body,options).subscribe((response:any)=>{
//       console.log(response);
//     });
debugger
//const formData = new FormData();
let body = new URLSearchParams();
body.set("grant_type","password");
body.set("username","Prod_meetpro");
body.set("password","m#+wlxi-wu3EsTecrIgahacr");
  const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
    })
};
return this.http.post('https://meetpro.pilportal.com:11692/token', body.toString(), httpOptions)
             .subscribe((res: any) => {
                 console.log(res);
                 // sessionStorage.setItem('access_token', res.access_token);
                 // sessionStorage.setItem('refresh_token', res.refresh_token);
             },
                 err => console.log(err)
             );

        // formData.append('username', 'Uat_meetpro');
        // formData.append('password', 'TO511^xLM@qjEN$5xT1*8%Hx');
        // formData.append('grant_type', 'password');
        

        // return this.http.post("https://meetpro.pilportal.com:11692/token",formdata,
        //               {
        //                   headers: new HttpHeaders({
        //                     'Content-Type':'application/x-www-form-urlencoded'
        //                   })
        //               }
        //             )
        //             .subscribe(
        //                 (res:any) => {
        //                     console.log(res);
        //                 },
        //                 err => console.log(err)
        //             );

  }



  
  // ObtendoNovoToken(): Observable<string> {
  //   const header = new Headers();
  //   header.append('Content-Type', 'application/x-www-form-urlencoded');
  
  //   let grant_type = 'password';
  //   let username = 'varejo_user';
  //   let password = 'w6h5xgtl';
  //   let body = 'grant_type=${grant_type}&username=${username}&password=${password}';
  
  //   return this.http.post('${ApiDeSegurança}', body, new Options({headers: header})).map(response=> response.json())
  // }

  GetOTPFORcONFIRM(UserCode) {
    return this.http.get<any>(
      `${environment.ApiUrl}/Mail/GetOTPFORConfirmation/`+UserCode).pipe(
        tap(response => {
            return response;
        })
    );
  }
  SubmitOTPcONFIRM(MobileNumber,OTPNUMBER,UserCode) {
    return this.http.get<any>(
      `${environment.ApiUrl}/Mail/ConfirmationWithOTP/`+MobileNumber+','+OTPNUMBER+','+UserCode).pipe(
        tap(response => {
            return response;
        })
    );
  }

  

}
