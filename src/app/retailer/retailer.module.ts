import { NgModule } from '@angular/core';
import { MatRippleModule, MatInputModule, MatFormFieldModule, DateAdapter, MatButtonToggleModule, MatDatepickerModule, MatExpansionModule, MatMenuModule, MatNativeDateModule, MatProgressSpinnerModule, MatSliderModule, MatSlideToggleModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';

import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { TokenInterceptor } from '../auth/token.interceptor';
import { AlertModule } from '../component/alert.module';
import { PaginationService } from '../component/pagination/pagination.service';
import { UserService } from '../shared/user.service';
import {  RetailerRoutingModule } from './retailer-routing.module';
import { RetailerChangePasswordComponent } from './change-password/change-password.component';
import { RetailerCreateOrderComponent } from './create-order/create-order.component';
import { RetailerDashboardComponent } from './dashboard/dashboard.component';
import { RetailerDispatchOrderDetailComponent } from './DispatchOrder-detail/DispatchOrder-detail.component';
import { RetailerProfileEditComponent } from './edit-profile/edit-profile.component';
import { RetailerNavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { RetailerOrderEditComponent } from './order-edit/order-edit.component';
import { RetailerOrderListComponent } from './order-list/order-list.component';
import { RetailerOrderViewComponent } from './order-view/order-view.component';
import { RetailerProfileComponent } from './profile/profile.component';
import { RetailerAsideComponent } from './Retailer-aside/Retailer-aside.component';
import { RetailerComponent } from './retailer.component';
import { PasswordStrengthBarComponent } from './password-strength-bar/password-strength-bar.component';
@NgModule({
  declarations: [
    RetailerCreateOrderComponent,
    RetailerComponent,
    RetailerDashboardComponent,
    RetailerProfileComponent,
    RetailerProfileEditComponent,
    RetailerChangePasswordComponent,
    RetailerNavigationBarComponent,
    RetailerAsideComponent,
    RetailerOrderListComponent,
    RetailerOrderViewComponent,
    RetailerOrderEditComponent,
    RetailerDispatchOrderDetailComponent,
    PasswordStrengthBarComponent,
  ],
  imports: [
    MatSlideToggleModule,
    MatButtonToggleModule,
    RetailerRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AlertModule,
    MatExpansionModule,
    CommonModule ,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatExpansionModule,
    MatSlideToggleModule,
  ],
  providers: [UserService, DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
    
  },
  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  PaginationService,
  PasswordStrengthBarComponent,
]
})
export class RetailerModule {}
