import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class CFAgentService {
  constructor(public datepipe: DatePipe,private fb: FormBuilder, private http: HttpClient) {
   
   }
  readonly BaseURI =  environment.ApiUrl;

  getCFAgentDashboard(UserCode): Observable<any> {  
    return this.http.get(this.BaseURI + '/CFAgent/GetDashBoardCount/'+UserCode);
  }

  ExportToExcel( fromdate,  todate,  status, UserType, usercode,  KeyWord){
    
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
    return this.http.get(this.BaseURI + '/CFAgent/ExportToExcel/'+fromdate+','+todate+','+status+','+UserType+','+usercode+','+KeyWord, { responseType: 'blob' });
  } 
  
getLedgerSearch(usercode, pageNo, DataPerPage) {
  
  return this.http.get(this.BaseURI + '/CFAgent/GetSPCFALedger/' +usercode + ',' + pageNo + ',' + DataPerPage );
}

getLedgerSearchCount(usercode) {
  return this.http.get(this.BaseURI + '/CFAgent/GetSPCFALedgerCount/' +usercode );
}

GetLedgerExportToExcel(CustomerCOde): any {
  return this.http.get(this.BaseURI + '/CFAgent/GetSPCFALedgerExportToExcel/' + CustomerCOde, { responseType: 'blob' });
}
}