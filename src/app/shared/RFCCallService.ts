import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RFCCallService {
  constructor(private fb: FormBuilder, private http: HttpClient) {
  
   }
  readonly BaseURI =  environment.ApiUrl;

getAllOutStandingforDashboardFromRFC(UserCode): Observable<any> {  
  return this.http.get(this.BaseURI + '/RFCCall/GetCreditLimitFromRFC/'+UserCode);
} 
GetLedger(usercode,fromdate,todate) {
  
  return this.http.get(this.BaseURI + '/RFCCall/GetLedger/'+usercode + ','+fromdate + ',' +todate  );
}

GetSAPPlantWiseStock(data) {
  
  return this.http.post(this.BaseURI + '/RFCCall/GetSAPPlantWiseStock',data);
}


PostWebOrdersToRFC(OrderDate): Observable<any> {
  return this.http.post(this.BaseURI + '/RFCCall/PostWebOrdersToRFC', OrderDate);
}
GetLedgerforSPCFA(UserName,UserType, usercode,fromdate,todate) {
  
  return this.http.get(this.BaseURI + '/RFCCall/GetLedgerforSPCFA/'+usercode+ ','+UserName + ','+UserType+ ','+fromdate + ',' +todate  );
}

}
