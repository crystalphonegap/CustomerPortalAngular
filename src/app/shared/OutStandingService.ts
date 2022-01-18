import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class OutStandingService {
 
  constructor( public datepipe: DatePipe,private fb: FormBuilder, private http: HttpClient,) {
  
  }
  readonly BaseURI = environment.ApiUrl;


  getAllDataData(fromdate,todate,status,SoldToPartyCodevtxt, pageNo, DataPerPage, KeyWord) {
    if (fromdate == null || fromdate == "") {
      fromdate = new Date();
      fromdate = new Date(fromdate);
      fromdate.setDate(fromdate.getDate() - 8);
       fromdate =this.datepipe.transform(fromdate,  'yyyy-MM-dd');
    }else{
      fromdate =this.datepipe.transform(fromdate,  'yyyy-MM-dd');
    }
    if (todate == null || todate == "") {
      todate = new Date();
      todate =this.datepipe.transform(todate,  'yyyy-MM-dd');
    }else{
      todate =this.datepipe.transform(todate,  'yyyy-MM-dd');
    }
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/Outstanding/GetOutStandingData/'+ SoldToPartyCodevtxt );
  }
  getAllDataCount(fromdate,todate,status,SoldToPartyCode, KeyWord): Observable<any> {
    if (fromdate == null || fromdate == "") {
      fromdate = new Date();
      fromdate = new Date(fromdate);
      fromdate.setDate(fromdate.getDate() - 8);
       fromdate =this.datepipe.transform(fromdate,  'yyyy-MM-dd');
    }else{
      fromdate =this.datepipe.transform(fromdate,  'yyyy-MM-dd');
    }
    if (todate == null || todate == "") {
      todate = new Date();
      todate =this.datepipe.transform(todate,  'yyyy-MM-dd');
    }else{
      todate =this.datepipe.transform(todate,  'yyyy-MM-dd');
    }
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/Outstanding/GetOutstandingDashBoard/' +SoldToPartyCode);
  }

  
}