import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private fb: FormBuilder, private http: HttpClient) {

   }
  readonly BaseURI = environment.ApiUrl;

  GetSalesOffices(): Observable<any> {
    return this.http.get(this.BaseURI + '/UploadEmployee/GetSalesOffices');
  }

  GetSalesOfficeByUserCode(usercode): Observable<any> {
    return this.http.get(this.BaseURI + '/UploadEmployee/GetOrderAnalystMapppingData/' + usercode);
  }
  InsertOrderAnalystData(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/UploadEmployee/InsertOrderAnalystData',  Data);
  }
  Delete(usercode): Observable<any> {
    return this.http.delete(this.BaseURI + '/UploadEmployee/Delete/' + usercode);
  }


  GetOutstandingDataCountforCFSPg30Days(UserCode,UserTytpe): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetOutstandingDataCountforCFSPg30Days/'+UserCode+','+UserTytpe);
  }

  GetOutstandingDataCountforCFSP30Days(UserCode,UserTytpe): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetOutstandingDataCountforCFSP30Days/'+UserCode+','+UserTytpe);
  }

  GetTargetVsActualDataForEmployee(UserCode,UserTytpe,Date): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetTargetVsActualDataForEmployee/'+UserCode+','+UserTytpe+','+Date+',All');
  }

  GetAdminTargetVsActualDataForEmployee(UserCode,UserTytpe,Date,Type): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetTargetVsActualDataForEmployee/'+UserCode+','+UserTytpe+','+Date+','+Type);
  }


  GetEmployeeWiseReport(mode,code,Date): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetEmployeeWiseReport/'+mode+','+code+','+Date+',All');
  }

  GetAdminEmployeeWiseReport(mode,code,Date,Type): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetEmployeeWiseReport/'+mode+','+code+','+Date+','+Type);
  }


  GetAreaNameByAreaCode(mode,code): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetAreaNameByAreaCode/'+mode+','+code);
  }


  GetEmployeeWiseSalesCount(UserCode,UserTytpe,Date): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetEmployeeWiseSalesCount/'+UserCode+','+UserTytpe+','+Date+',All');
  }

  GetAdminEmployeeWiseSalesCount(UserCode,UserTytpe,Date,Type): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetEmployeeWiseSalesCount/'+UserCode+','+UserTytpe+','+Date+','+Type);
  }

  GetOutstandingDataListforCFSP30Days(UserCode,UserTytpe): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetOutstandingDataListforCFSP30Days/'+UserCode+','+UserTytpe);
  }
  GetOutstandingDataListforCFSPg30Days(UserCode,UserTytpe): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetOutstandingDataListforCFSPg30Days/'+UserCode+','+UserTytpe);
  }
  GetTopDealerListInEmployeeDashboard(UserCode,UserTytpe,date,FillterType): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetTopDealerListInEmployeeDashboard/'+UserCode+','+UserTytpe+','+date+',All'+','+FillterType);
  }
  GetAdminTopDealerListInEmployeeDashboard(UserCode,UserTytpe,date,Type,FillterType): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetTopDealerListInEmployeeDashboard/'+UserCode+','+UserTytpe+','+date+','+Type+','+FillterType);
  }
  GetbottomDealerListInEmployeeDashboard(UserCode,UserTytpe,date,FillterType): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetbottomDealerListInEmployeeDashboard/'+UserCode+','+UserTytpe+','+date+',All'+','+FillterType);
  }

  GetAdminbottomDealerListInEmployeeDashboard(UserCode,UserTytpe,date,Type,FillterType): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetbottomDealerListInEmployeeDashboard/'+UserCode+','+UserTytpe+','+date+','+Type+','+FillterType);
  }

  GetEmployeeDashboardCount(UserCode,UserTytpe): Observable<any> {
    debugger;
    return this.http.get(this.BaseURI + '/Employee/GetEmployeeDashboardCount/'+UserCode+','+UserTytpe+',All');
  }

  GetAdminEmployeeDashboardCount(UserCode,UserTytpe,Type): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetEmployeeDashboardCount/'+UserCode+','+UserTytpe+','+Type);
  }

  getEmployeeDashboard(UserCode,UserType): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetEmployeeDashboardCount/'+UserCode+ ',' +UserType+',All');
  }
  getEmployeeTargetSalesData(UserCode,UserType,date): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetTargetVsActualDataForEmployee/'+UserCode+ ',' +UserType+ ',' +date+',All');
  }
  getAdminEmployeeTargetSalesData(UserCode,UserType,date,Type): Observable<any> {
    return this.http.get(this.BaseURI + '/Employee/GetTargetVsActualDataForEmployee/'+UserCode+ ',' +UserType+ ',' +date+','+Type);
  }
}
