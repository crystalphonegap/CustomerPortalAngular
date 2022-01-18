import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Heirachy } from '../models/Heirachy';
@Injectable({
    providedIn: 'root'
})
export class ContentService {
    constructor(private fb: FormBuilder, private http: HttpClient) {
    }
    readonly BaseURI = environment.ApiUrl;

    GetHeirachywiseByType(type): Observable<any> {
        return this.http.get<Heirachy>(this.BaseURI + '/Content/GetHeirachywiseByType/' + type);
    }
    Insert(Data): Observable<any> {
        return this.http.post(this.BaseURI + '/Content/Insert', Data);
    }
    InsertDetail(Data): Observable<any> {
        return this.http.post(this.BaseURI + '/Content/InsertDetail', Data);
    }
    GetContentByID(ID): Observable<any> {
        return this.http.get(this.BaseURI + '/Content/GetContentByID/' + ID);
    }
    GetContentDetailByID(ID): Observable<any> {
        return this.http.get(this.BaseURI + '/Content/GetContentDetailByID/' + ID);
    }
    Update(Data): Observable<any> {
        return this.http.put(this.BaseURI + '/Content/Update', Data);
    }
    GetContentListCount(KeyWord): Observable<any> {
        if (KeyWord == null || KeyWord == '') {
            KeyWord = 'NoSearch';
        }
        return this.http.get(this.BaseURI + '/Content/GetContentListCount/' + KeyWord);
    }

    GetContentByDate(Date): Observable<any> {  
        return this.http.get(this.BaseURI + '/Content/GetContentByDate/'+Date);
      }
    GetContentList(PageNo, PageSize, KeyWord): Observable<any> {
        if (KeyWord == null || KeyWord == '') {
            KeyWord = 'NoSearch';
        }
        return this.http.get(this.BaseURI + '/Content/GetContentList/' + PageNo + ',' + PageSize + ',' + KeyWord);
    }
}