import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceWithoutToken {
  user$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }
  Verify(Customercode,accesskey): Observable<any> {
    return this.http.get<any>(
      `${environment.ApiUrl}/CustomerMaster/CheckValidCustomer/`+Customercode+','+accesskey).pipe(
        tap(response => {
            return response;
        })
    );
  }

Update(CustomerData) {
  return this.http.put<any>(
    `${environment.ApiUrl}/CustomerMaster/UpdateCustomer`,CustomerData).pipe(
      tap(response => {
          return response;
      })
  );
}

  getCustomerData(Id) {
    return this.http.get<any>(
      `${environment.ApiUrl}/CustomerMaster/GetCustomerDataByUserId/`+Id).pipe(
        tap(response => {
            return response;
        })
    );
  }

  SendMailForForgetPassword(UserCode) {
  return this.http.get<any>(
    `${environment.ApiUrl}/Mail/SendMailForForgetPassword/`+UserCode).pipe(
      tap(response => {
          return response;
      })
  );
}

GetOTPFORLOGIN(UserCode) {
  return this.http.get<any>(
    `${environment.ApiUrl}/Mail/GetOTPFORLOGIN/`+UserCode).pipe(
      tap(response => {
          return response;
      })
  );
}
SubmitOTP(MobileNumber,OTPNUMBER,UserCode) {
  return this.http.get<any>(
    `${environment.ApiUrl}/Mail/SubmitOTP/`+MobileNumber+','+OTPNUMBER+','+UserCode).pipe(
      tap(response => {
          return response;
      })
  );
}


ResetPassword(CustomerData) {
  return this.http.post<any>(
    `${environment.ApiUrl}/UserMaster/ResetPassword`,CustomerData,).pipe(
      tap(response => {
          return response;
      })
  );
}

}
