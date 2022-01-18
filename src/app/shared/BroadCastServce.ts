import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BroadCastServce {
  constructor(private fb: FormBuilder, private http: HttpClient) {
   
   }
  readonly BaseURI =  environment.ApiUrl;

  Insert(Data): Observable<any> {  
    return this.http.post(this.BaseURI + '/BroadCast/Insert',Data);
  }
  
  GetBroadCastDetailsByID(ID): Observable<any> {
    return this.http.get(this.BaseURI + '/BroadCast/GetBroadCastDetailsByID/' + ID);
}
  InsertDetail(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/BroadCast/InsertDetail', Data);
}
  GetBroadCastByID(ID): Observable<any> {  
    return this.http.get(this.BaseURI + '/BroadCast/GetBroadCastByID/'+ID);
  }
   GetBroadCastByDate(Date): Observable<any> {  
    return this.http.get(this.BaseURI + '/BroadCast/GetBroadCastByDate/'+Date);
  }
  Update(Data): Observable<any> {  
    return this.http.put(this.BaseURI + '/BroadCast/Update',Data);
  }
  GetBroadCastListCount(KeyWord): Observable<any> {  
      if(KeyWord==null || KeyWord==''){
          KeyWord='NoSearch';
      }
    return this.http.get(this.BaseURI + '/BroadCast/GetBroadCastListCount/'+KeyWord);
  }
  
  GetBroadCastList(PageNo,PageSize,KeyWord): Observable<any> {    
    if(KeyWord==null || KeyWord==''){
        KeyWord='NoSearch';
    }
    return this.http.get(this.BaseURI + '/BroadCast/GetBroadCastList/'+PageNo+','+PageSize+','+KeyWord);
  } 
}