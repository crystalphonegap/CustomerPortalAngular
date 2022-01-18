import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class Technician {
  constructor(private fb: FormBuilder, private http: HttpClient) {
   }
  readonly BaseURI =  environment.ApiUrl;

  getTargetSalesforDashboard(UserCode,date): Observable<any> {  
    return this.http.get(this.BaseURI + '/TargetSales/GetTargetSalesForDashboardbyMonth/'+UserCode+','+date);
  } 
  getTargetSalesforDashboardBarChart(UserCode,date): Observable<any> {  
    return this.http.get(this.BaseURI + '/TargetSales/GetTargetSalesForDashboardbyYear/'+UserCode+','+date);
  } 
}
