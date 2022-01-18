import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from './local-storage.service';
import { AuthService } from './auth.service';
import { CfAgentComponent } from '../CfAgent/CfAgent.component';
import { CustomerComponent } from '../Customer/Customer.component';
import { EmpComponent } from '../Emp/Emp.component';
import { RetailerComponent } from '../retailer/retailer.component';
import { SPComponent } from '../SP/SP.component';
import { SuperAdminHomeComponent } from '../SuperAdmin/home.component';
import { SystemAdminComponent } from '../SystemAdmin/SystemAdmin.component';
import { environment } from 'src/environments/environment';
import { constStorage } from '../models/Storege';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService } from '../component/alert.service';
import { HttpClient } from '@angular/common/http';
import { UserConstant } from '../models/Userconstant';
import { KAMComponent } from '../KAM/KAM.component';

export class Refreashtoken  {

  constructor(private http: HttpClient,private localStorageService: LocalStorageService,
              private authService: AuthService,private _KAMComponent:KAMComponent,
              private router: Router, private _CfAgentComponent:CfAgentComponent,private _CustomerComponent:CustomerComponent,
              private _EmpComponent:EmpComponent,private _RetailerComponent:RetailerComponent,
              private _SPComponent:SPComponent,private _SuperAdminComponent:SuperAdminHomeComponent,
              private _SystemAdminComponent:SystemAdminComponent,
              private _AlertService :AlertService) {}


              refreshToken(): Observable<any> {
                  if(constStorage.UserType==UserConstant.AccountingHead||constStorage.UserType==UserConstant.BranchManager||
                    constStorage.UserType==UserConstant.MarketingHead||constStorage.UserType==UserConstant.RegionalManager||
                    constStorage.UserType==UserConstant.TerritorySalesExecutive||constStorage.UserType==UserConstant.ZonalManager){
                        this._EmpComponent.setLoading(true);
                        this._CustomerComponent.setLoading(true);
                    }else if(constStorage.UserType==UserConstant.CFAgent ||constStorage.UserType==UserConstant.CFAgentUser){
                        this._CfAgentComponent.setLoading(true);
                        this._CustomerComponent.setLoading(true);
                    }else if(constStorage.UserType==UserConstant.Customer ||constStorage.UserType==UserConstant.CustomerUser){
                        this._CustomerComponent.setLoading(true);
                    }else if(constStorage.UserType==UserConstant.OrderAnalyst ||constStorage.UserType==UserConstant.SalesPromoter
                        ||constStorage.UserType==UserConstant.SalesPromoterUser){
                        this._SPComponent.setLoading(true);
                        this._CustomerComponent.setLoading(true);
                    }else if(constStorage.UserType==UserConstant.Retailer){
                        this._RetailerComponent.setLoading(true);
                    }else if(constStorage.UserType==UserConstant.SuperAdmin ){
                        this._SuperAdminComponent.setLoading(true);
                    }else if(constStorage.UserType==UserConstant.SystemAdmin ){
                        this._SystemAdminComponent.setLoading(true);
                        this._CustomerComponent.setLoading(true);
                    }else if(constStorage.UserType==UserConstant.KAM ){
                      this._KAMComponent.setLoading(true);
                      this._CustomerComponent.setLoading(true);
                  }
                const RefreshToken = this.localStorageService.getItem(constStorage.refreshToken);
                const Token = this.localStorageService.getItem(constStorage.token);
                return this.http.post<any>(
                  `${environment.ApiUrl}/UserMaster/Refresh`,
                  {
                    TokenTxt:Token,
                    RefreshTokenTxt: RefreshToken
                  }).pipe(
                    tap(response => {
                        if(constStorage.UserType==UserConstant.AccountingHead||constStorage.UserType==UserConstant.BranchManager||
                            constStorage.UserType==UserConstant.MarketingHead||constStorage.UserType==UserConstant.RegionalManager||
                            constStorage.UserType==UserConstant.TerritorySalesExecutive||constStorage.UserType==UserConstant.ZonalManager){
                                this._EmpComponent.setLoading(false);
                                this._CustomerComponent.setLoading(false);
                            }else if(constStorage.UserType==UserConstant.CFAgent ||constStorage.UserType==UserConstant.CFAgentUser){
                                this._CfAgentComponent.setLoading(false);
                                this._CustomerComponent.setLoading(false);
                            }else if(constStorage.UserType==UserConstant.Customer ||constStorage.UserType==UserConstant.CustomerUser){
                                this._CustomerComponent.setLoading(false);
                            }else if(constStorage.UserType==UserConstant.OrderAnalyst ||constStorage.UserType==UserConstant.SalesPromoter
                                ||constStorage.UserType==UserConstant.SalesPromoterUser){
                                this._SPComponent.setLoading(false);
                                this._CustomerComponent.setLoading(false);
                            }else if(constStorage.UserType==UserConstant.Retailer){
                                this._RetailerComponent.setLoading(false);
                            }else if(constStorage.UserType==UserConstant.SuperAdmin ){
                                this._SuperAdminComponent.setLoading(false);
                            }else if(constStorage.UserType==UserConstant.SystemAdmin ){
                                this._SystemAdminComponent.setLoading(false);
                                this._CustomerComponent.setLoading(false);
                            }else if(constStorage.UserType==UserConstant.KAM ){
                              this._KAMComponent.setLoading(false);
                              this._CustomerComponent.setLoading(false);
                          }
                      if(response.Issue=="Invalid refresh token"){
                        this.router.navigate(['/user/login']);
                        this._AlertService.error('User Token Expired Please Login Again');
                      }
                      this.setToken(constStorage.token, response.token);
                      this.setToken(constStorage.refreshToken, response.refreshToken);
                    },
                    err => {
                        console.log(err);
                    })
                );
              }

  private setToken(key: string, token: string): void {
    this.localStorageService.setItem(key, token);
  }

}
