import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SPService {
 
  constructor(private fb: FormBuilder, private http: HttpClient) {
  
   }
  readonly BaseURI =  environment.ApiUrl;

  getCFAgentDashboard(UserCode): Observable<any> {  
    return this.http.get(this.BaseURI + '/CFAgent/GetDashBoardCount/'+UserCode);
  }

}