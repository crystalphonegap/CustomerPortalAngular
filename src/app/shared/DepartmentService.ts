import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Heirachy } from '../models/Heirachy';
@Injectable({
    providedIn: 'root'
})
export class DepartmentService {
    constructor(private fb: FormBuilder, private http: HttpClient) {
    }
    readonly BaseURI = environment.ApiUrl;

  
    Insert(Data): Observable<any> {
        return this.http.post(this.BaseURI + '/Escalation/Insert', Data);
    }
   
    GetDepartmentByID(ID): Observable<any> {
        return this.http.get(this.BaseURI + '/Escalation/GetEscalationByID/' + ID);
    }
    Update(Data): Observable<any> {
        return this.http.put(this.BaseURI + '/Escalation/Update', Data);
    }
    GetDepartmentList(PageNo, PageSize, KeyWord): Observable<any> {
        if (KeyWord == null || KeyWord == '') {
            KeyWord = 'NoSearch';
        }
        return this.http.get(this.BaseURI + '/Escalation/GetEscalationList');
    }
    GetDepartmentListCount(KeyWord): Observable<any> {
        if (KeyWord == null || KeyWord == '') {
            KeyWord = 'NoSearch';
        }
        return this.http.get(this.BaseURI + '/Escalation/GetDepartmentMasterCount/' + KeyWord);
    }
    GetDepartmentMasterForDropdownlist(KeyWord,PageNo): Observable<any> {
        if (KeyWord == null || KeyWord == '') {
            KeyWord = 'NoSearch';
        }
        return this.http.get(this.BaseURI + '/Escalation/GetEscalationList');
    }
}