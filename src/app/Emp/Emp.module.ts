import {NgModule } from '@angular/core';
import {  MatRippleModule, MatInputModule, MatFormFieldModule, DateAdapter, MatButtonToggleModule, MatDatepickerModule, MatExpansionModule, MatMenuModule, MatNativeDateModule, MatProgressSpinnerModule, MatSliderModule, MatSlideToggleModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatRadioModule} from '@angular/material';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { TokenInterceptor } from '../auth/token.interceptor';
import { AlertModule } from '../component/alert.module';
import { PaginationService } from '../component/pagination/pagination.service';
import { UserService } from '../shared/user.service';
import { EmpChangePasswordComponent } from './change-password/change-password.component';
import { EmpCustomerListComponent } from './customer-list/customer-list.component';
import { EmpDashboardComponent } from './dashboard/dashboard.component';
import { EmpProfileEditComponent } from './edit-profile/edit-profile.component';
import { EmpAsideComponent } from './Emp-aside/Emp-aside.component';
import { EmpRoutingModule } from './Emp-routing.module';
import { EmpComponent } from './Emp.component';
import { EmpNavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { EmpProfileComponent } from './profile/profile.component';
import { MonthPicker } from '../component/DatePicker/monthpicker';
import { YearPicker } from '../component/DatePicker/YearPicker';
import { OpenOrdersComponent } from './open-orders/open-orders.component';
import { OpenOrdersViewComponent } from './open-orders-view/open-orders-view.component';
import { BalanceConfirmationUploadComponent } from './balance-confirmation-upload/balance-confirmation-upload.component';
import { BalanceConfirmationListComponent } from './balance-confirmation-list/balance-confirmation-list.component';
import { BalanceConfirmationViewComponent } from './balance-confirmation-view/balance-confirmation-view.component';
import { BalanceConfirmationEditComponent } from './balance-confirmation-edit/balance-confirmation-edit.component';
import { BalanceConfirmationListForAllComponent } from './balance-confirmation-list-for-all/balance-confirmation-list-for-all.component';
import { BalanceConfirmationViewForAllComponent } from './balance-confirmation-view-for-all/balance-confirmation-view-for-all.component';
import { BlockOrderListComponent } from './block-order-list/block-order-list.component';
import { PasswordStrengthBarComponent } from './password-strength-bar/password-strength-bar.component';
import { TechnicianClosedTicketsViewComponent } from './closed-tickets-view/closed-tickets-view.component';
import { TechnicianCompletedTicketsViewComponent } from './completed-tickets-view/completed-tickets-view.component';
import { TechnicianOpenTicketsViewComponent } from './open-tickets-view/open-tickets-view.component';
import { TechnicianOpenTicketsComponent } from './open-tickets/open-tickets.component';
import { EmpAdminNewLoginReportComponent } from './emp-admin-new-login-report/emp-admin-new-login-report.component';
import { TicketMISUserTypeWiseComponent } from './ticket-misuser-type-wise/ticket-misuser-type-wise.component';
import { TicketMISCategoryTypeWiseComponent } from './ticket-miscategory-type-wise/ticket-miscategory-type-wise.component';
import { TicketMisListForCategoryComponent } from './ticket-mis-list-for-category/ticket-mis-list-for-category.component';
import { TicketMisListForUsertypeComponent } from './ticket-mis-list-for-usertype/ticket-mis-list-for-usertype.component';
import { MisReportViewOpenTicketByCategoryComponent } from './mis-report-view-open-ticket-by-category/mis-report-view-open-ticket-by-category.component';
import { MisReportViewCloseTicketByCategoryComponent } from './mis-report-view-close-ticket-by-category/mis-report-view-close-ticket-by-category.component';
import { MisReportViewCloseTicketByUserTypeComponent } from './mis-report-view-close-ticket-by-user-type/mis-report-view-close-ticket-by-user-type.component';
import { MisReportViewOpenTicketByUserTypeComponent } from './mis-report-view-open-ticket-by-user-type/mis-report-view-open-ticket-by-user-type.component';
import { BalanceConfirmationListForCFSPComponent } from './balance-confirmation-list-for-CFSP/balance-confirmation-list-for-all.component';
import { BalanceConfirmationViewForCFSPComponent } from './balance-confirmation-view-ForCFSP/balance-confirmation-view-ForCFSP.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { RegionalheadComponent } from './regionalhead/regionalhead.component';
import { BalanceConfirmationViewForRAHComponent } from './balance-confirmation-view-for-rah/balance-confirmation-view-for-rah.component';
import { RAHEmpDashboardComponent } from './rahemp-dashboard/rahemp-dashboard.component';
import { BalanceActionLogComponent } from './balance-action-log/balance-action-log.component';
import { AHEmpDashboardComponent } from './ahemp-dashboard/ahemp-dashboard.component';
import { ExcelService } from '../services/excel.service';
@NgModule({
  declarations: [
    EmpProfileEditComponent ,
    EmpProfileComponent,
    BalanceConfirmationViewForCFSPComponent,
    EmpComponent,
    BlockOrderListComponent ,
    EmpNavigationBarComponent,
    EmpAsideComponent,
    EmpDashboardComponent,
    EmpCustomerListComponent,
    EmpChangePasswordComponent,
    YearPicker,
    MonthPicker,
    OpenOrdersComponent,
    RegionalheadComponent,
    OpenOrdersViewComponent,
    BalanceConfirmationUploadComponent,
    BalanceConfirmationListComponent,
    BalanceConfirmationViewComponent,
    BalanceConfirmationEditComponent,
    BalanceConfirmationListForAllComponent,
    BalanceConfirmationViewForAllComponent,
    PasswordStrengthBarComponent,
    TechnicianOpenTicketsComponent,
    TechnicianOpenTicketsViewComponent,
    TechnicianClosedTicketsViewComponent,
    TechnicianCompletedTicketsViewComponent,
    EmpAdminNewLoginReportComponent,
    TicketMISUserTypeWiseComponent,
    TicketMISCategoryTypeWiseComponent,
    TicketMisListForCategoryComponent,
    TicketMisListForUsertypeComponent,
    MisReportViewOpenTicketByCategoryComponent,
    MisReportViewCloseTicketByCategoryComponent,
    MisReportViewCloseTicketByUserTypeComponent,
    MisReportViewOpenTicketByUserTypeComponent,
    BalanceConfirmationListForCFSPComponent,
    CustomerProfileComponent,
    RegionalheadComponent,
    BalanceConfirmationViewForRAHComponent,
    RAHEmpDashboardComponent,
    BalanceActionLogComponent,
    AHEmpDashboardComponent,
  ],
  imports: [
    MatSlideToggleModule,
    MatButtonToggleModule,
    EmpRoutingModule,
    MatRadioModule,
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
  providers: [ExcelService,UserService, DatePipe, {
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
export class EmpModule {}
