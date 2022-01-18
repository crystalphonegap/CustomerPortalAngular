import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TargetSales {
  constructor(private fb: FormBuilder, private http: HttpClient) {
   }
  readonly BaseURI =  environment.ApiUrl;

  getTargetSalesforDashboard(UserCode,date): Observable<any> {
    return this.http.get(this.BaseURI + '/TargetSales/GetTargetSalesForDashboardbyMonth/'+UserCode+','+date);
  }

  getKAMTargetSalesforDashboard(UserCode,date): Observable<any> {
    return this.http.get(this.BaseURI + '/TargetSales/GetKAMTargetSalesForDashboard/'+UserCode+','+date);
  }

  getTargetSalesforDashboardBarChart(UserCode,date): Observable<any> {
    return this.http.get(this.BaseURI + '/TargetSales/GetTargetSalesForDashboardbyYear/'+UserCode+','+date);
  }






  DownloadCustomerSalesSampleExcel(): Observable<any> {
    return this.http.get(this.BaseURI + '/TargetSales/DownloadCustomerSalesSampleExcel', { responseType: 'blob' });
  }

  CustomerSalesExcel(type,keyword): Observable<any> {
    if(this.BooleancheckForValueNotExist(keyword)){
      keyword='NoSearch';
    }
    return this.http.get(this.BaseURI + '/TargetSales/CustomerSalesExcel/'+type+','+keyword, { responseType: 'blob' });
  }

  GetAllCustomerSalesListsCount(type,keyword): Observable<any> {
    if(this.BooleancheckForValueNotExist(keyword)){
      keyword='NoSearch';
    }
    return this.http.get(this.BaseURI + '/TargetSales/GetAllCustomerSalesListsCount/'+type+','+keyword);
  }

  GetCustomerSalesData( Type,KeyWord,  PageNo,  PageSize): Observable<any> {
    if(this.BooleancheckForValueNotExist(KeyWord)){
      KeyWord='NoSearch';
    }

    return this.http.get(this.BaseURI + '/TargetSales/GetCustomerSalesData/'+Type+','+PageNo+','+PageSize+','+KeyWord);
  }


  BooleancheckForValueNotExist (value){
    return value == null || value =="";
  }

  CustomerSalesExcelUpload(type,model): Observable<any> {
    return this.http.post(this.BaseURI + '/TargetSales/CustomerSalesExcelUpload/'+type,model);
  }


  GetNCRorPaymnetSalesForDealerProfile(UserCode,date,mode ): Observable<any> {
    return this.http.get(this.BaseURI + '/TargetSales/GetNCRorPaymnetSalesForDealerProfile/'+UserCode+','+date+','+mode);
  }



  GetSalesBreakUpForDealerProfile(UserCode,date ): Observable<any> {
    return this.http.get(this.BaseURI + '/TargetSales/GetSalesBreakUpForDealerProfile/'+UserCode+','+date);
  }
  GetTargetSalesForDealerProfile(UserCode,date ): Observable<any> {
    return this.http.get(this.BaseURI + '/TargetSales/GetTargetSalesForDealerProfile/'+UserCode+','+date);
  }


  GetCustomerProfileTranscationSalesHistory(UserCode,date ): Observable<any> {
    return this.http.get(this.BaseURI + '/TargetSales/GetCustomerProfileTranscationSalesHistory/'+UserCode+','+date);
  }

  GetCustomerProfileConsistency(UserCode,date ): Observable<any> {
    return this.http.get(this.BaseURI + '/TargetSales/GetCustomerProfileConsistency/'+UserCode+','+date);
  }

  GetCustomerProfileEffective(UserCode,date ): Observable<any> {
    return this.http.get(this.BaseURI + '/TargetSales/GetCustomerProfileEffective/'+UserCode+','+date);
  }

}
