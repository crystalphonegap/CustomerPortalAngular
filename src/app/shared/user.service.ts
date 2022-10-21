import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) {

   }
  readonly BaseURI = environment.ApiUrl;

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI + '/User/Register', body);
  }

  login(formData) {
    return this.http.post(this.BaseURI + '/UserMaster/Login', formData);
  }

  LoginLogs(formData) {
    return this.http.post(this.BaseURI + '/UserMaster/LoginLogs', formData);
  }


  EnterLog(formData) {
    return this.http.post(this.BaseURI + '/UserMaster/EnterLog', formData);
  }

  addUser(formData) {
    return this.http.post(this.BaseURI + '/UserMaster/Create', formData);
  }

  DeleteLogs(Date) {
    return this.http.get(this.BaseURI + '/UserMaster/DeleteErrorLog/'+Date);
  }


  getError(fromdate,todate, pageNo, DataPerPage, KeyWord) {
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/UserMaster/GetError/'+fromdate + ',' +todate + ',' + pageNo + ',' + DataPerPage + ',' + KeyWord);
  }


  getErrorCount(fromdate,todate,  KeyWord) {
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/UserMaster/GetErrorCount/'+fromdate + ',' +todate   + ',' + KeyWord);
  }


  updateUser(formData) {
    return this.http.put(this.BaseURI + '/UserMaster/Update', formData);
  }
  updateUserStatus(formData) {
    return this.http.put(this.BaseURI + '/UserMaster/UpdateStatus', formData);
  }
  EmployeeUpdate(formData) {
    return this.http.put(this.BaseURI + '/UserMaster/EmployeeUpdate', formData);
  }


  EditProfile(formData) {
    return this.http.put(this.BaseURI + '/UserMaster/EditProfile', formData);
  }

  ChangePassword(formData) {
    return this.http.put(this.BaseURI + '/UserMaster/ChangePassword', formData);
  }

  getUserData(Id) {
    return this.http.get(this.BaseURI + '/UserMaster/GetUserDetails/'+Id);
  }

  UserDetailById(Id) {
    return this.http.get(this.BaseURI + '/UserMaster/UserDetailById/'+Id);
  }

  GetYear() {
    return this.http.get(this.BaseURI + '/UserMaster/GetYear');
  }

  getUsersData() {
    return this.http.get(this.BaseURI + '/UserMaster/GetUsersDetails');
  }
  getUsersByUserId(id) {
    return this.http.get(this.BaseURI + '/UserMaster/GetUserDetails/'+id);
  }
getAllUsers(pageNo,pageSize) {
    return this.http.get(this.BaseURI + '/UserMaster/GetUserPagination/' + pageNo+','+pageSize);
  }
  getUsersByCustCode(status,custcode,pageNo,pageSize,keyword) {
    if (keyword == null || keyword == "") {
      keyword = "NoSearch";
    }
      return this.http.get(this.BaseURI + '/UserMaster/GetAllUserMasterByParentCode/' + status+','+custcode+','+ pageNo+','+pageSize+','+keyword);
    }
    getUsersByCustCodeCount(status,custcode,keyword) {
      if (keyword == null || keyword == "") {
        keyword = "NoSearch";
      }
        return this.http.get(this.BaseURI + '/UserMaster/GetAllUserMasterCountByParentCode/' + status+','+custcode+','+keyword);
      }


  getAllUsersCount(): Observable<any> {
    return this.http.get(this.BaseURI + '/UserMaster/GetAllUserCount');
  }

  getUserProfile(Id) {
    return this.http.get(this.BaseURI + '/UserMaster/GetProfile/'+Id);
  }

  getAllUsersForDivisionalAdmin(pageNo,pageSize,keyword)
  {
    if (keyword == null || keyword == "") {
      keyword = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/UserMaster/GetAllUserMasterforDivisionalAdminSearch/' + pageNo+','+pageSize+','+keyword);
  }

  getAllRegionalHeadEMployees(usercode,usertype,pageNo,pageSize,keyword)
  {
    if (keyword == null || keyword == "") {
      keyword = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/UserMaster/GetRegionalHeadList/'+usertype+','+usercode+',' + pageNo+','+pageSize+','+keyword);
  }

  GetRegionalHeadListCount(usercode,usertype,KeyWord) {
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/UserMaster/GetRegionalHeadListCount/'+usertype+','+usercode+','+KeyWord);
  }

  ExportToExceRegionalHeadList(KeyWord) {
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/UserMaster/RegionalHeadListExcelToExcel/'+KeyWord, { responseType: 'blob' });
  }


  getAllUsersForDivisionalAdminCount(KeyWord) {
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/UserMaster/GetAllUserMasterforDivisionalAdminCount/'+KeyWord);
  }

  ExportToExcelUserMasterforDivisionalAdmin(KeyWord) {
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/UserMaster/ExcelToExcel/'+KeyWord, { responseType: 'blob' });
  }
  GetUserRolesHeaderDataByUserCode(usercode): Observable<any> {
    return this.http.get(this.BaseURI + '/UserMaster/GetUserRolesHeader/' + usercode);
  }

  ExportToExcelForParent(ParentCode,status,KeyWord) {
    if (KeyWord == null || KeyWord == "") {
      KeyWord = "NoSearch";
    }
    return this.http.get(this.BaseURI + '/UserMaster/ExportToExcelForParent/'+ParentCode+','+status+','+KeyWord, { responseType: 'blob' });
  }

}
