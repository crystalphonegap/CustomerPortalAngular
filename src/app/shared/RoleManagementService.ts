import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { DatePipe } from '@angular/common'
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RoleManagementService {
 
  constructor(private fb: FormBuilder, private http: HttpClient,public datepipe: DatePipe) {
   
  }
  readonly BaseURI = environment.ApiUrl;

  GetRoles(): Observable<any> {
    return this.http.get(this.BaseURI + '/RoleMaster/GetRoles' );
  }
  GetRoleByKeyword(Keyword): Observable<any> {
    if(Keyword==''|| Keyword==null){
      Keyword='NoSearch';
    }
    return this.http.get(this.BaseURI + '/RoleMaster/GetRolesForcheckBoxlist/'+Keyword );
  }

  getRolesHeaderByUserCode(Code) {
    return this.http.get(this.BaseURI + '/UserMaster/GetUserRolesHeader/'+Code);
  }
  DeleteRoleByUserCode(Code) {
    return this.http.delete(this.BaseURI + '/UserMaster/DeleteUserRoles/'+Code);
  }

  InsertRoleHeader(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/RoleMaster/InsertRoleHeader',Data );
  }
  
  DeleteRoleDetails(RoleId): Observable<any> {
    return this.http.delete(this.BaseURI + '/RoleMaster/DeleteRoleDetails/'+RoleId );
  }
  UpdateRoleHeader(Data): Observable<any> {
    return this.http.put(this.BaseURI + '/RoleMaster/UpdateRoleHeader',Data );
  }
  GetRoleDetailsByRoleID(Data): Observable<any> {
    return this.http.get(this.BaseURI + '/RoleMaster/GetRoleDetailsByRoleID/'+Data );
  }
  GetRoleHeaderByRoleID(Data): Observable<any> {
    return this.http.get(this.BaseURI + '/RoleMaster/GetRoleHeaderByRoleID/'+Data );
  }

  GetUserRolesDetailsByCustomercode(Customercode): Observable<any> {
    return this.http.get(this.BaseURI + '/RoleMaster/GetUserRolesDetailsByCustomercode/'+Customercode );
  }
  GetUserRolesDetailsByUsercode(usercode): Observable<any> {
    return this.http.get(this.BaseURI + '/UserMaster/GetUserRolesDetails/'+usercode );
  }
  InsertRoleDetails(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/RoleMaster/InsertRoleDetails',Data );
  }
  InsertRoleDetailsforUser(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/UserMaster/InsertUserRoles',Data );
  }
  GetRoleHeaderSearch(fromdate,todate,status,customercode, pageNo, DataPerPage, KeyWord) {
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
    return this.http.get(this.BaseURI + '/RoleMaster/GetRoleHeaderSearch/' + pageNo + ',' + DataPerPage + ',' + KeyWord);
  }
  GetRoleHeaderSearchCount(fromdate,todate,status,customercode, KeyWord): Observable<any> {
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
    return this.http.get(this.BaseURI + '/RoleMaster/GetRoleHeaderSearchCount/' + KeyWord);
  }
  GetRoleForCheckBoxlist(KeyWord): Observable<any> {
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/RoleMaster/GetRolesForcheckBoxlist/' + KeyWord);
  }
}