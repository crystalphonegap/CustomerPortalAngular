import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private fb: FormBuilder, private http: HttpClient) {

   }
  readonly BaseURI =  environment.ApiUrl;

getAllOutStandingforDashboard(UserCode): Observable<any> {
  return this.http.get(this.BaseURI + '/Outstanding/GetOutstandingDashBoard/'+UserCode);
}
getAllCreditLimitforDashboard(UserCode): Observable<any> {
  return this.http.get(this.BaseURI + '/Creditlimit/GetCreditlimit/'+UserCode);
}

getAllAvailableCreditLimitforDashboard(UserCode): Observable<any> {
  return this.http.get(this.BaseURI + '/Creditlimit/GetAvailableCreditlimit/'+UserCode);
}

getCustomerData(Id) {
  return this.http.get(this.BaseURI + '/CustomerMaster/GetCustomerDataByUserId/'+Id);
}

getCustomerDataByhisUserCode(UserCode) {
  return this.http.get(this.BaseURI + '/CustomerMaster/GetCustomerByUser/'+UserCode);
}

GetShipToAddress(Id) {
  return this.http.get(this.BaseURI + '/CustomerMaster/GetShipToAddress/'+Id);
}

getGetShipToData(Id) {
  return this.http.get(this.BaseURI + '/CustomerMaster/GetShipTo/'+Id);
}

getUomnNotId(id) {
  return this.http.get(this.BaseURI + '/Order/GetUOMNotId/'+id);
}
getUOM() {
  return this.http.get(this.BaseURI + '/Order/GetUOM/');
}
getUOMById(id) {
  return this.http.get(this.BaseURI + '/Order/GetUOMByID/'+id);
}

Update(CustomerData) {
  return this.http.put(this.BaseURI + '/CustomerMaster/UpdateCustomer',CustomerData);
}
getAllCustomerDataByUserTypeWiseSearch(usercode,usertype, pageNo, DataPerPage, KeyWord,status,isActive) {
  if (KeyWord == null || KeyWord == "") {
    KeyWord = "NoSearch";
  }
  return this.http.get(this.BaseURI + '/CustomerMaster/GetCustomerByUserTypeWise/'+usercode + ',' +usertype + ',' + pageNo + ',' + DataPerPage + ',' + KeyWord+ ',' + status+ ',' + isActive);
}
getAllCustomerDataByUserTypeWiseSearchCount(usercode,usertype, KeyWord, status, isActive) {
  if (KeyWord == null || KeyWord == "") {
    KeyWord = "NoSearch";
  }
  return this.http.get(this.BaseURI + '/CustomerMaster/GetCustomerByUserTypeWiseCount/'+usercode + ',' +usertype + ',' + KeyWord + ',' + status+ ',' + isActive);
}
GetLedgerExportToExcel(CustomerCOde): any {
  return this.http.get(this.BaseURI + '/CustomerMaster/GetLedgerExportToExcel/' + CustomerCOde, { responseType: 'blob' });
}
downloadFileCustomerDataByUserTypeWise(usercode,usertype, KeyWord,status,isActive): any {
  if (KeyWord == null || KeyWord == "") {
    KeyWord = "NoSearch";
  }
  return this.http.get(this.BaseURI + '/CustomerMaster/ExportToExcel/' + usercode + ',' + usertype + ',' + KeyWord+ ',' + status+ ',' + isActive, { responseType: 'blob' });
}
getLedgerSearch(usercode, pageNo, DataPerPage) {

  return this.http.get(this.BaseURI + '/CustomerMaster/GetLedger/' +usercode + ',' + pageNo + ',' + DataPerPage );
}
getLedgerSearchCount(usercode) {
  return this.http.get(this.BaseURI + '/CustomerMaster/GetLedgerCount/' +usercode );
}

GetAllCustomersforSystemAdminSearch(pageno,pagesize,status,division,keyword) {
  if(keyword==''|| keyword==null){
    keyword='NoSearch';
  }
  return this.http.get(this.BaseURI + '/CustomerMaster/GetAllCustomersforSystemAdminSearch/'+pageno+','+pagesize+','+status+','+division+','+keyword);
}
GetAllCustomersforSystemAdminSearchCount(status,division,keyword): Observable<any> {
  if(keyword==''|| keyword==null){
    keyword='NoSearch';
  }
  return this.http.get(this.BaseURI + '/CustomerMaster/GetAllCustomersforSystemAdminSearchCount/'+status+','+division+','+keyword);
}

ExportToExcelForSystemAdmin(status,division,keyword): any {
  if(keyword==''|| keyword==null){
    keyword='NoSearch';
  }
  return this.http.get(this.BaseURI + '/CustomerMaster/ExportToExcelForSystemAdmin/'+status+','+division+','+keyword , { responseType: 'blob' });
}

GetCustomerForCFAgent(UserCode): Observable<any> {
  return this.http.get(this.BaseURI + '/CustomerMaster/GetCustomerDataByUserId/'+UserCode);
}

GetCustomerForKAM(UserCode): Observable<any> {
  return this.http.get(this.BaseURI + '/CustomerMaster/GetCustomerDataForKAM/'+UserCode);
}

GetPlantMaster(UserCode): Observable<any> {
  return this.http.get(this.BaseURI + '/CustomerMaster/GetPlantMaster/'+UserCode);
}

ChangeUserStatus(UserMaster): Observable<any> {
  return this.http.put(this.BaseURI + '/CustomerMaster/UpdateCustomerStatus/' , UserMaster);
}



DownloadSampleMasonExcel() {
  return this.http.get(this.BaseURI + '/CustomerMaster/DownloadSampleMasonExcel', { responseType: 'blob' });
}


MasonExcelUpload(formdata) {
  return this.http.post(this.BaseURI + '/CustomerMaster/MasonExcelUpload',formdata);
}

uploadEventImageData(formdata) {
  console.log('api called');
  return this.http.post(this.BaseURI + '/UploadCustomerEvent/uploadDealerEventFile',formdata);
}

getMasonSearch( pageNo, DataPerPage, KeyWord) {
  if (KeyWord == null || KeyWord == "") {
    KeyWord = "NoSearch";
  }
  return this.http.get(this.BaseURI + '/CustomerMaster/getMasonSearch/' + pageNo + ',' + DataPerPage + ',' + KeyWord);
}

ExcelMason(   KeyWord) {
  if (KeyWord == null || KeyWord == "") {
    KeyWord = "NoSearch";
  }
  return this.http.get(this.BaseURI + '/CustomerMaster/ExcelMason/' + KeyWord, { responseType: 'blob' });
}


}
