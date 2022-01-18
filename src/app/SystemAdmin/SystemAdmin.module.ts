// Angular
import {  NgModule } from '@angular/core';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, DateAdapter} from '@angular/material';
import { MatButtonToggleModule, MatDatepickerModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatProgressSpinnerModule, MatRippleModule, MatSliderModule, MatSlideToggleModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatRadioModule, MatAutocompleteModule} from  '@angular/material';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { TokenInterceptor } from '../auth/token.interceptor';
import { AlertModule } from '../component/alert.module';
import { PaginationService } from '../component/pagination/pagination.service';
import { UserService } from '../shared/user.service';
import { SystemAdminAccountingHeadComponent } from './accounting-head/accounting-head.component';
import { SystemAdminBmUploadComponent } from './bm-upload/bm-upload.component';
import { SystemAdminChangePasswordComponent } from './change-password/change-password.component';
import { SystemAdminContentDetailsComponent } from './content-details/content-details.component';
import { SystemAdminCreateContentComponent } from './create-content/create-content.component';
import { SystemAdminCreatebroadcastComponent } from './createbroadcast/createbroadcast.component';
import { SystemAdminDashboardComponent } from './dashboard/dashboard.component';
import { SystemAdminDealerAppointListComponent } from './dealer-appoint-list/dealer-appoint-list.component';
import { SystemAdminDealerAppointUploadComponent } from './dealer-appoint-upload/dealer-appoint-upload.component';
import { SystemAdminProfileEditComponent } from './edit-profile/edit-profile.component';
import { SystemAdminEmployeeEditComponent } from './employee-edit/employee-edit.component';
import { SystemAdminMarketingHeadComponent } from './marketing-head/marketing-head.component';
import { SystemAdminOrderAnalystEditComponent } from './order-analyst-edit/order-analyst-edit.component';
import { SystemAdminOrderAnalystUploadComponent } from './order-analyst-upload/order-analyst-upload.component';
import { SystemAdminProfileComponent } from './profile/profile.component';
import { SystemAdminRetailerUploadComponent } from './retailer-upload/retailer-upload.component';
import { SystemAdminRmUploadComponent } from './rm-upload/rm-upload.component';
import { SystemAdminRoleManagementEditComponent } from './role-management-edit/role-management-edit.component';
import { SystemAdminRoleManagementListComponent } from './role-management-list/role-management-list.component';
import { SystemAdminRoleManagementViewComponent } from './role-management-view/role-management-view.component';
import { SystemAdminSalesHeirachyUploadComponent } from './sales-heirachy-upload/sales-heirachy-upload.component';
import { SystemAdminSalesHeirachyViewComponent } from './sales-heirachy-view/sales-heirachy-view.component';
import { SystemAdminComponent } from './SystemAdmin.component';
import { SystemAdminTargetSalesListComponent } from './target-sales-list/target-sales-list.component';
import { SystemAdminTargetSalesComponent } from './target-sales/target-sales.component';
import { SystemAdminTsiUploadComponent } from './tsi-upload/tsi-upload.component';
import { SystemAdminZmUploadComponent } from './zm-upload/zm-upload.component';
import { SystemAdminRoutingModule } from './SystemAdmin-routing.module';
import { SystemAdminSalesPromoterComponent } from './sales-promoter/sales-promoter.component';
import { SystemAdminCFAgentUploadComponent } from './cfagent-upload/cfagent-upload.component';
import { SystemAdminBroadcastdetailsComponent } from './broadcastdetails/broadcastdetails.component';
import { SystemAdminCreateDepartmentComponent } from './create-department/create-department.component';
import { SystemAdminRoleManagementComponent } from './role-management/role-management.component';
import { SystemAdminSwitchUserComponent } from './switch-user/switch-user.component';
import { SystemAdminUploadCustomerComponent } from './upload-customer/upload-customer.component';
import { SystemAdminUploadMappingComponent } from './upload-mapping/upload-mapping.component';
import { SystemAdminViewComplaintsComponent } from './view-complaints/view-complaints.component';
import { SystemAsideComponent } from './system-aside/system-aside.component';
import { SystemAdminNavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SystemAdminCustomerDetailComponent } from './customer-detail/customer-detail.component';
import { SystemAdminEmployeeDetailsComponent } from './employee-details/employee-details.component';
import { SystemAdminLoginReportComponent } from './system-admin-login-report/system-admin-login-report.component';
import { AllOrderListComponent } from './all-order-list/all-order-list.component';
import { OpenOrdersViewComponent } from './open-orders-view/open-orders-view.component';
import { SystemAdminDepartmentListComponent } from './system-admin-department-list/system-admin-department-list.component';
import { SystemAdminNewLoginReportComponent } from './system-admin-new-login-report/system-admin-new-login-report.component';
import { PasswordStrengthBarComponent } from './password-strength-bar/password-strength-bar.component';
import { TechnicianClosedTicketsViewComponent } from './closed-tickets-view/closed-tickets-view.component';
import { TechnicianOpenTicketsViewComponent } from './open-tickets-view/open-tickets-view.component';
import { TicketMISCategoryTypeWiseComponent } from './ticket-miscategory-type-wise/ticket-miscategory-type-wise.component';
import { TicketMISUserTypeWiseComponent } from './ticket-misuser-type-wise/ticket-misuser-type-wise.component';
import { OrderReportListComponent } from './order-report-list/order-report-list.component';
import { LoyalityPointsListComponent } from './Loyality-Points-list/Loyality-Points-list.component';
import { LoyalityPointsUploadComponent } from './Loyality-Points-upload/Loyality-Points-upload.component';
import { TicketMisListForCategoryComponent } from './ticket-mis-list-for-category/ticket-mis-list-for-category.component';
import { TicketMisListForUsertypeComponent } from './ticket-mis-list-for-usertype/ticket-mis-list-for-usertype.component';
import { MisReportViewCloseTicketByUserTypeComponent } from './mis-report-view-close-ticket-by-user-type/mis-report-view-close-ticket-by-user-type.component';
import { MisReportViewCloseTicketByCategoryComponent } from './mis-report-view-close-ticket-by-category/mis-report-view-close-ticket-by-category.component';
import { MisReportViewOpenTicketByUserTypeComponent } from './mis-report-view-open-ticket-by-user-type/mis-report-view-open-ticket-by-user-type.component';
import { MisReportViewOpenTicketByCategoryComponent } from './mis-report-view-open-ticket-by-category/mis-report-view-open-ticket-by-category.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { SystemAdminKAMUploadComponent } from './kam-upload/kam-upload.component';
import { CustomerProfileDataListComponent } from './customer-profile-data-list/customer-profile-data-list.component';
import { CustomerProfileDataUploadComponent } from './customer-profile-data-upload/customer-profile-data-upload.component';
import { MaterialTestCertificateListComponent } from './material-test-certificate-list/material-test-certificate-list.component';
import { MaterialTestCertificateUploadComponent } from './material-test-certificate-upload/material-test-certificate-list-upload.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { CustomerSalesListComponent } from './customer-sales-list/customer-sales-list.component';
import { CustomerSalesUploadComponent } from './customer-sales-upload/customer-sales-upload.component';
import { masonUploadComponent } from './mason-upload/mason-upload';
import { masonListComponent } from './mason-list/mason-list.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { YearPicker } from '../component/DatePickerForSystemAdmin/YearPicker';
import { MonthPicker } from '../component/DatePickerForSystemAdmin/monthpicker';
import { MaterailTestCertificateDetailComponent } from './materail-test-certificate-detail/materail-test-certificate-detail.component';
@NgModule({
  declarations: [
    OpenOrdersViewComponent,
    SystemAdminNavigationBarComponent,
    SystemAsideComponent,
    SystemAdminUploadCustomerComponent,
    LoyalityPointsListComponent,
    SystemAdminUploadMappingComponent,
    SystemAdminRoleManagementComponent,
    SystemAdminBroadcastdetailsComponent,
    SystemAdminSwitchUserComponent,
    SystemAdminViewComplaintsComponent,
    SystemAdminCreateDepartmentComponent,
    SystemAdminCFAgentUploadComponent,
    SystemAdminSalesPromoterComponent,
    SystemAdminProfileComponent,
    SystemAdminDashboardComponent ,
    SystemAdminProfileEditComponent,
    SystemAdminComponent,
    SystemAdminContentDetailsComponent,
    SystemAdminTargetSalesComponent,
    SystemAdminTargetSalesListComponent,
    SystemAdminSalesHeirachyUploadComponent,
    SystemAdminSalesHeirachyViewComponent,
    SystemAdminTsiUploadComponent,
    SystemAdminBmUploadComponent,
    SystemAdminRmUploadComponent,
    SystemAdminOrderAnalystUploadComponent,
    SystemAdminAccountingHeadComponent,
    SystemAdminMarketingHeadComponent,
    SystemAdminZmUploadComponent,
    SystemAdminRoleManagementViewComponent,
    SystemAdminRoleManagementListComponent,
    SystemAdminRoleManagementEditComponent,
    SystemAdminEmployeeEditComponent,
    SystemAdminOrderAnalystEditComponent,
    YearPicker,
    MonthPicker,
    SystemAdminCreatebroadcastComponent,
    SystemAdminCreateContentComponent,
    SystemAdminChangePasswordComponent,
    SystemAdminDealerAppointUploadComponent,
    SystemAdminRetailerUploadComponent,
    SystemAdminDealerAppointListComponent,
    SystemAdminCustomerDetailComponent ,
    SystemAdminEmployeeDetailsComponent,
    SystemAdminLoginReportComponent,
    AllOrderListComponent,
    SystemAdminDepartmentListComponent,
    SystemAdminNewLoginReportComponent,
    PasswordStrengthBarComponent ,
    TechnicianOpenTicketsViewComponent,
    TechnicianClosedTicketsViewComponent,
    TicketMISCategoryTypeWiseComponent,
    TicketMISUserTypeWiseComponent,
    OrderReportListComponent,
    LoyalityPointsUploadComponent,
    TicketMisListForCategoryComponent,
    TicketMisListForUsertypeComponent,
    MisReportViewCloseTicketByCategoryComponent,
    MisReportViewCloseTicketByUserTypeComponent,
    MisReportViewOpenTicketByUserTypeComponent,
    MisReportViewOpenTicketByCategoryComponent,
    EmployeeViewComponent,
    SystemAdminKAMUploadComponent,
    CustomerProfileDataListComponent,
    CustomerProfileDataUploadComponent,
    MaterialTestCertificateListComponent,
    MaterialTestCertificateUploadComponent,
    ImageViewerComponent,
    CustomerSalesListComponent,
    CustomerSalesUploadComponent,
    masonListComponent,
    masonUploadComponent,
    CustomerProfileComponent,
    MaterailTestCertificateDetailComponent,
  ],
  imports: [
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    SystemAdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatRadioModule,
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
export class SystemAdminModule {}
