import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ItemMasterService {
 
  constructor(private fb: FormBuilder, private http: HttpClient) {
   
   }
  readonly BaseURI =  environment.ApiUrl;

  getAllItemMasterData() {
    return this.http.get(this.BaseURI + '/ItemMaster/GetAllItemMaster/All');
  }

  
  getItemMasterDataByKeyword(Keyword) {
    return this.http.get(this.BaseURI + '/ItemMaster/GetAllItemMaster/'+Keyword);
  }

GetTopItemMaster() {
  return this.http.get(this.BaseURI + '/ItemMaster/GetTopItemMaster');
}
}
