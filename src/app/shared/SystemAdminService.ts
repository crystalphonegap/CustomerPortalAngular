import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SystemAdminService {
  constructor(private fb: FormBuilder, private http: HttpClient) {

   }
  readonly BaseURI =  environment.ApiUrl;


  login(formData) {
    return this.http.post(this.BaseURI + '/UserMasters/Login', formData);
  }

  GetCustomerData() {
    return this.http.get(this.BaseURI + '/CustomerMaster/GetCustomer');
  }


getAllCustomer(Division,pageNo,pageSize,KeyWord) {
  return this.http.get(this.BaseURI + '/CustomerMaster/GetCustomerMaster/'+Division+','+pageNo+','+pageSize+','+KeyWord);
}


getAllCustomerCount(Division): Observable<any> {
  return this.http.get(this.BaseURI + '/CustomerMaster/GetCustomerCount/'+Division);
}

uploadExcelData(formdata) {
  return this.http.post(this.BaseURI + '/Mail/ExcelUpload',formdata);
}
uploadTargetSalesExcelData(formdata) {
  return this.http.post(this.BaseURI + '/TargetSales/TargetSalesExcelUpload',formdata);
}
// for  Sales Heirachy
uploadSalesHeirachyExcelData(formdata) {
  return this.http.post(this.BaseURI + '/UploadEmployee/SalesHierachyUpload',formdata);
}
DownloadSampleCustomerUpload()
{
  return this.http.get(this.BaseURI + '/Mail/DownloadSampleCustomerUploadExcel', { responseType: 'blob' });
}
DownloadSampleSalesHeirachyExcel() {
  return this.http.get(this.BaseURI + '/UploadEmployee/DownloadSampleSalesHierachyExcel', { responseType: 'blob' });
}

DownloadErrorSalesHeirachyExcel() {
  return this.http.get(this.BaseURI + '/UploadEmployee/DownloadErrorSalesHierachy', { responseType: 'blob' });
}

GetAllSalesHeirachyData(pageNo,pageSize,KeyWord) {
  if (KeyWord == null || KeyWord == "") {
    KeyWord = "NoSearch";
  }
  return this.http.get(this.BaseURI + '/UploadEmployee/GetAllSalesHeirachy/'+pageNo+','+pageSize+','+KeyWord);
}

GetAllSalesHeirachyDataCount(KeyWord) {
  if (KeyWord == null || KeyWord == "") {
    KeyWord = "NoSearch";
  }
  return this.http.get(this.BaseURI + '/UploadEmployee/GetAllSalesHierachyListsCount/'+KeyWord);
}

ExportToExcelSalesHeirachyData(KeyWord) {
  if (KeyWord == null || KeyWord == "") {
    KeyWord = "NoSearch";
  }
  return this.http.get(this.BaseURI + '/UploadEmployee/SalesHierachyExportToExcel/'+KeyWord, { responseType: 'blob' });
}
// for  Sales Heirachy

// for TSI,BM,RM,ZM
uploadTSIExcelData(formdata) {
  return this.http.post(this.BaseURI + '/UploadEmployee/TSIUpload',formdata);
}
uploadBMExcelData(formdata) {
  return this.http.post(this.BaseURI + '/UploadEmployee/BMUpload',formdata);
}
uploadRMExcelData(formdata) {
  return this.http.post(this.BaseURI + '/UploadEmployee/RMUpload',formdata);
}
uploadZMExcelData(formdata) {
  return this.http.post(this.BaseURI + '/UploadEmployee/ZMUpload',formdata);
}
DownloadSampleForEmployeeUpload(UserType) {
  return this.http.get(this.BaseURI + '/UploadEmployee/DownloadSampleEmployeeUploadExcel/'+UserType, { responseType: 'blob' });
}
DownloadErrorFileforEmployeeUpload(UserType) {
  return this.http.get(this.BaseURI + '/UploadEmployee/DownloadErrorEmployeeUpload/'+UserType, { responseType: 'blob' });
}
// for TSI,BM,RM,ZM

//for Order Analyst,Accounting Head,Marketing Head
uploadOrderAnalystxcelData(formdata) {
  return this.http.post(this.BaseURI + '/UploadEmployee/OrderAnalystUpload',formdata);
}
uploadAccountingHeadExcelData(formdata) {
  return this.http.post(this.BaseURI + '/UploadEmployee/AccountingHeadUpload',formdata);
}
uploadMarketingHeadExcelData(formdata) {
  return this.http.post(this.BaseURI + '/UploadEmployee/MarketingHeadUpload',formdata);
}
UploadCFAgent(formdata) {
  return this.http.post(this.BaseURI + '/UploadEmployee/CFAgentUpload',formdata);
}
UploadSalesPromoter(formdata) {
  return this.http.post(this.BaseURI + '/UploadEmployee/SalesPromoterUpload',formdata);
}
DownloadSampleForEmployeeUploadWithNoParentCode(UserType) {
  return this.http.get(this.BaseURI + '/UploadEmployee/DownloadSampleEmployeeUploadExcelForNoParentCode/'+UserType, { responseType: 'blob' });
}
DownloadErrorFileforEmployeeUploadNoParentCode(UserType) {
  return this.http.get(this.BaseURI + '/UploadEmployee/DownloadErrorEmployeeUploadforNoParentCode/'+UserType, { responseType: 'blob' });
}
//for Order Analyst,Accounting Head,Marketing Head
DownloadTargetSalesExcelData(Division,KeyWord) {
  if (KeyWord == null || KeyWord == "") {
    KeyWord = "NoSearch";
  }
  return this.http.get(this.BaseURI + '/TargetSales/Excel/'+Division+','+KeyWord, { responseType: 'blob' });
}
GetAllTargetSalesExcelData(Division,pageNo,pageSize,KeyWord) {
  if (KeyWord == null || KeyWord == "") {
    KeyWord = "NoSearch";
  }
  return this.http.get(this.BaseURI + '/TargetSales/GetAllTargetSalesLists/'+Division+','+pageNo+','+pageSize+','+KeyWord);
}

DownloadSampleExcel() {
  return this.http.get(this.BaseURI + '/TargetSales/DownloadSampleExcel', { responseType: 'blob' });
}
getTargetSalesExcelDataCount(Division,KeyWord) {
  if (KeyWord == null || KeyWord == "") {
    KeyWord = "NoSearch";
  }
  return this.http.get(this.BaseURI + '/TargetSales/GetAllTargetSalesListsCount/'+Division+','+KeyWord);
}



LoginReport(fromdate, todate , pageNo,pageSize,KeyWord) {
  if (KeyWord == null || KeyWord == "") {
    KeyWord = "NoSearch";
  }
  return this.http.get(this.BaseURI + '/LoginReport/LoginReport/'+fromdate+','+todate+','+pageNo+','+pageSize+','+KeyWord);
}


NewLoginReport(SearchFilter) {
  return this.http.post(this.BaseURI + '/LoginReport/NewLoginReport',SearchFilter);
}


LoginReportCount(fromdate, todate ,Type,KeyWord): Observable<any> {
  if (KeyWord == null || KeyWord == "") {
    KeyWord = "NoSearch";
  }
  return this.http.get(this.BaseURI + '/LoginReport/LoginReportCount/'+fromdate+','+todate+','+Type+','+KeyWord);
}

LoginReportDownloadExcel(fromdate, todate ,KeyWord) {
  if (KeyWord == null || KeyWord == "") {
    KeyWord = "NoSearch";
  }
  return this.http.get(this.BaseURI + '/LoginReport/LoginReportDownload/'+fromdate+','+todate+','+KeyWord, { responseType: 'blob' });
}
NewLoginReportDownloadExcel(FromDate,Todate,Zone,Region,Branch,Territory,UserType,Type,SearchType) {
  return this.http.get(this.BaseURI + '/LoginReport/NewLoginReportDownload/'+FromDate+','+Todate+','+Zone+','+Region+','+Branch+','+Territory+','+UserType+','+Type+','+SearchType, { responseType: 'blob' });
}
GetArea(Type,KeyWord) {
  if (KeyWord == null || KeyWord == "") {
    KeyWord = "NoSearch";
  }
  return this.http.get(this.BaseURI + '/LoginReport/GetArea/'+Type+','+KeyWord);
}



KAMUpload(formdata) {
  return this.http.post(this.BaseURI + '/UploadEmployee/KAMUpload',formdata);
}

}
