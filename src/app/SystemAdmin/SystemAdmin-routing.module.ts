// import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SystemAdminAccountingHeadComponent } from './accounting-head/accounting-head.component';
import { SystemAdminBmUploadComponent } from './bm-upload/bm-upload.component';
import { SystemAdminBroadcastdetailsComponent } from './broadcastdetails/broadcastdetails.component';
import { SystemAdminCFAgentUploadComponent } from './cfagent-upload/cfagent-upload.component';
import { SystemAdminChangePasswordComponent } from './change-password/change-password.component';
import { SystemAdminContentDetailsComponent } from './content-details/content-details.component';
import { SystemAdminCreateContentComponent } from './create-content/create-content.component';
import { SystemAdminCreateDepartmentComponent } from './create-department/create-department.component';
import { SystemAdminCreatebroadcastComponent } from './createbroadcast/createbroadcast.component';
import { SystemAdminCustomerDetailComponent } from './customer-detail/customer-detail.component';
import { SystemAdminDashboardComponent } from './dashboard/dashboard.component';
import { SystemAdminDealerAppointListComponent } from './dealer-appoint-list/dealer-appoint-list.component';
import { SystemAdminDealerAppointUploadComponent } from './dealer-appoint-upload/dealer-appoint-upload.component';
import { SystemAdminProfileEditComponent } from './edit-profile/edit-profile.component';
import {  SystemAdminEmployeeDetailsComponent } from './employee-details/employee-details.component';
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
import { SystemAdminRoleManagementComponent } from './role-management/role-management.component';
import { SystemAdminSalesHeirachyUploadComponent } from './sales-heirachy-upload/sales-heirachy-upload.component';
import { SystemAdminSalesHeirachyViewComponent } from './sales-heirachy-view/sales-heirachy-view.component';
import { SystemAdminSalesPromoterComponent } from './sales-promoter/sales-promoter.component';
import { SystemAdminSwitchUserComponent } from './switch-user/switch-user.component';
import { SystemAdminComponent } from './SystemAdmin.component';
import { SystemAdminTargetSalesListComponent } from './target-sales-list/target-sales-list.component';
import { SystemAdminTargetSalesComponent } from './target-sales/target-sales.component';
import { SystemAdminTsiUploadComponent } from './tsi-upload/tsi-upload.component';
import { SystemAdminUploadCustomerComponent } from './upload-customer/upload-customer.component';
import { SystemAdminUploadMappingComponent } from './upload-mapping/upload-mapping.component';
import { SystemAdminViewComplaintsComponent } from './view-complaints/view-complaints.component';
import { SystemAdminZmUploadComponent } from './zm-upload/zm-upload.component';
import { SystemAdminLoginReportComponent } from './system-admin-login-report/system-admin-login-report.component';
import { AllOrderListComponent } from './all-order-list/all-order-list.component';
import { OpenOrdersViewComponent } from './open-orders-view/open-orders-view.component';
import { SystemAdminDepartmentListComponent } from './system-admin-department-list/system-admin-department-list.component';
import { SystemAdminNewLoginReportComponent } from './system-admin-new-login-report/system-admin-new-login-report.component';
import { TechnicianOpenTicketsViewComponent } from './open-tickets-view/open-tickets-view.component';
import { TechnicianClosedTicketsViewComponent } from './closed-tickets-view/closed-tickets-view.component';
import { TicketMISUserTypeWiseComponent } from './ticket-misuser-type-wise/ticket-misuser-type-wise.component';
import { TicketMISCategoryTypeWiseComponent } from './ticket-miscategory-type-wise/ticket-miscategory-type-wise.component';
import { OrderReportListComponent } from './order-report-list/order-report-list.component';
import { LoyalityPointsListComponent } from './Loyality-Points-list/Loyality-Points-list.component';
import { LoyalityPointsUploadComponent } from './Loyality-Points-upload/Loyality-Points-upload.component';
import { TicketMisListForUsertypeComponent } from './ticket-mis-list-for-usertype/ticket-mis-list-for-usertype.component';
import { TicketMisListForCategoryComponent } from './ticket-mis-list-for-category/ticket-mis-list-for-category.component';
import { MisReportViewCloseTicketByCategoryComponent } from './mis-report-view-close-ticket-by-category/mis-report-view-close-ticket-by-category.component';
import { MisReportViewCloseTicketByUserTypeComponent } from './mis-report-view-close-ticket-by-user-type/mis-report-view-close-ticket-by-user-type.component';
import { MisReportViewOpenTicketByCategoryComponent } from './mis-report-view-open-ticket-by-category/mis-report-view-open-ticket-by-category.component';
import { MisReportViewOpenTicketByUserTypeComponent } from './mis-report-view-open-ticket-by-user-type/mis-report-view-open-ticket-by-user-type.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { SystemAdminKAMUploadComponent } from './kam-upload/kam-upload.component';
import { CustomerProfileDataListComponent } from './customer-profile-data-list/customer-profile-data-list.component';
import { CustomerProfileDataUploadComponent } from './customer-profile-data-upload/customer-profile-data-upload.component';
import { MaterialTestCertificateListComponent } from './material-test-certificate-list/material-test-certificate-list.component';
import { MaterialTestCertificateUploadComponent } from './material-test-certificate-upload/material-test-certificate-list-upload.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { CustomerSalesUploadComponent } from './customer-sales-upload/customer-sales-upload.component';
import { CustomerSalesListComponent } from './customer-sales-list/customer-sales-list.component';
import { masonUploadComponent } from './mason-upload/mason-upload';
import { masonListComponent } from './mason-list/mason-list.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { MaterailTestCertificateDetailComponent } from './materail-test-certificate-detail/materail-test-certificate-detail.component';
const routes: Routes = [
  {
    path: '', component: SystemAdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SystemAdminDashboardComponent, canActivate: [AuthGuard] },
      { path: 'Profile', component: SystemAdminProfileComponent, canActivate: [AuthGuard] },
      { path: 'Editprofile', component: SystemAdminProfileEditComponent, canActivate: [AuthGuard] },
      { path: 'CustomerDetail', component: SystemAdminCustomerDetailComponent, canActivate: [AuthGuard] },
      { path: 'EmployeeDetails', component: SystemAdminEmployeeDetailsComponent, canActivate: [AuthGuard] },
      { path: 'UploadCustomer', component: SystemAdminUploadCustomerComponent, canActivate: [AuthGuard] },
      { path: 'UploadMapping', component: SystemAdminUploadMappingComponent, canActivate: [AuthGuard] },
      { path: 'ContentDetails', component: SystemAdminContentDetailsComponent, canActivate: [AuthGuard] },
      { path: 'CreateContent', component: SystemAdminCreateContentComponent, canActivate: [AuthGuard] },
      { path: 'RoleManagement', component: SystemAdminRoleManagementComponent, canActivate: [AuthGuard] },
      { path: 'RoleManagementList', component: SystemAdminRoleManagementListComponent, canActivate: [AuthGuard] },
      { path: 'RoleManagementView', component: SystemAdminRoleManagementViewComponent, canActivate: [AuthGuard] },
      { path: 'RoleManagementEdit', component: SystemAdminRoleManagementEditComponent, canActivate: [AuthGuard] },
      { path: 'CreateBroadCast', component: SystemAdminCreatebroadcastComponent, canActivate: [AuthGuard] },
      { path: 'BroadCastDetails', component: SystemAdminBroadcastdetailsComponent, canActivate: [AuthGuard] },
      { path: 'SwicthUser', component: SystemAdminSwitchUserComponent, canActivate: [AuthGuard] },
      { path: 'TicketList', component: SystemAdminViewComplaintsComponent, canActivate: [AuthGuard] },
      { path: 'TargetSales', component: SystemAdminTargetSalesComponent, canActivate: [AuthGuard] },
      { path: 'SalesHeirachy', component: SystemAdminSalesHeirachyUploadComponent, canActivate: [AuthGuard] },
      { path: 'SalesHeirachyList', component: SystemAdminSalesHeirachyViewComponent, canActivate: [AuthGuard] },
      { path: 'TargetSalesList', component: SystemAdminTargetSalesListComponent, canActivate: [AuthGuard] },
      { path: 'CreateDepartment', component: SystemAdminCreateDepartmentComponent, canActivate: [AuthGuard] },
      { path: 'MarketingHeadUpload', component: SystemAdminMarketingHeadComponent, canActivate: [AuthGuard] },
      { path: 'AccountingHeadUpload', component: SystemAdminAccountingHeadComponent, canActivate: [AuthGuard] },
      { path: 'OrderAnalystUpload', component: SystemAdminOrderAnalystUploadComponent, canActivate: [AuthGuard] },
      { path: 'RMUpload', component: SystemAdminRmUploadComponent, canActivate: [AuthGuard] },
      { path: 'BMUpload', component: SystemAdminBmUploadComponent, canActivate: [AuthGuard] },
      { path: 'TSIUpload', component: SystemAdminTsiUploadComponent, canActivate: [AuthGuard] },
      { path: 'LoginReportNew', component: SystemAdminNewLoginReportComponent, canActivate: [AuthGuard] },
      { path: 'ZMUpload', component: SystemAdminZmUploadComponent, canActivate: [AuthGuard] },
      { path: 'KAMUpload', component: SystemAdminKAMUploadComponent, canActivate: [AuthGuard] },
      { path: 'OrderAnalystEdit', component: SystemAdminOrderAnalystEditComponent, canActivate: [AuthGuard] },
      { path: 'EmployeeEdit', component: SystemAdminEmployeeEditComponent, canActivate: [AuthGuard] },
      { path: 'CFAgentUpload', component: SystemAdminCFAgentUploadComponent, canActivate: [AuthGuard] },
      { path: 'DealerAppointList', component: SystemAdminDealerAppointListComponent, canActivate: [AuthGuard] },
      { path: 'DealerAppointUpload', component: SystemAdminDealerAppointUploadComponent, canActivate: [AuthGuard] },
      { path: 'RetailerUpload', component: SystemAdminRetailerUploadComponent, canActivate: [AuthGuard] },
      { path: 'SalesPromoterUpload', component: SystemAdminSalesPromoterComponent, canActivate: [AuthGuard] },
      { path: 'ChangePassword', component: SystemAdminChangePasswordComponent, canActivate: [AuthGuard] },
      { path: 'AllOrderList', component: AllOrderListComponent, canActivate: [AuthGuard] },
      { path: 'OpenOrdersView', component: OpenOrdersViewComponent, canActivate: [AuthGuard] },
      { path: 'DepartmentList', component: SystemAdminDepartmentListComponent, canActivate: [AuthGuard] },
      { path: 'LoginReport', component: SystemAdminLoginReportComponent, canActivate: [AuthGuard] },
      { path: 'TicketMISUserTypeWise', component: TicketMISUserTypeWiseComponent, canActivate: [AuthGuard] },
      { path: 'TicketMISCategoryTypeWise', component: TicketMISCategoryTypeWiseComponent, canActivate: [AuthGuard] },
      { path: 'OpenTicketsView', component: TechnicianOpenTicketsViewComponent, canActivate: [AuthGuard] },
      { path: 'ClosedTicketsView', component: TechnicianClosedTicketsViewComponent, canActivate: [AuthGuard] },
      { path: 'OrderReportList', component: OrderReportListComponent, canActivate: [AuthGuard] },
      { path: 'LoyalityPointsUpload', component: LoyalityPointsUploadComponent, canActivate: [AuthGuard] },
      { path: 'LoyalityPointsList', component: LoyalityPointsListComponent, canActivate: [AuthGuard] },
      { path: 'TicketMISUserTypeWiseList', component: TicketMisListForUsertypeComponent, canActivate: [AuthGuard] },
      { path: 'TicketMISCategoryTypeWiseList', component: TicketMisListForCategoryComponent, canActivate: [AuthGuard] },
      { path: 'MisReportViewCloseTicketByCategory', component: MisReportViewCloseTicketByCategoryComponent, canActivate: [AuthGuard] },
      { path: 'MisReportViewCloseTicketByUserType', component: MisReportViewCloseTicketByUserTypeComponent, canActivate: [AuthGuard] },
      { path: 'MisReportViewOpenTicketByCategory', component: MisReportViewOpenTicketByCategoryComponent, canActivate: [AuthGuard] },
      { path: 'MisReportViewOpenTicketByUserType', component: MisReportViewOpenTicketByUserTypeComponent, canActivate: [AuthGuard] },
      { path: 'EmployeeView', component: EmployeeViewComponent, canActivate: [AuthGuard] },
      { path: 'CustomerProfileDataUpload', component: CustomerProfileDataUploadComponent, canActivate: [AuthGuard] },
      { path: 'CustomerProfileDataList', component: CustomerProfileDataListComponent, canActivate: [AuthGuard] },
      { path: 'MaterialTestCertificateUpload', component: MaterialTestCertificateUploadComponent, canActivate: [AuthGuard] },
      { path: 'MaterialTestCertificateList', component: MaterialTestCertificateListComponent, canActivate: [AuthGuard] },
      { path: 'ImageViewer', component: ImageViewerComponent, canActivate: [AuthGuard] },
      { path: 'CustomerSalesList', component: CustomerSalesListComponent, canActivate: [AuthGuard] },
      { path: 'CustomerSalesUpload', component: CustomerSalesUploadComponent, canActivate: [AuthGuard] },
      { path: 'masonListComponent', component: masonListComponent, canActivate: [AuthGuard] },
      { path: 'masonUploadComponent', component: masonUploadComponent, canActivate: [AuthGuard] },
      { path: 'CustomerProfile', component: CustomerProfileComponent, canActivate: [AuthGuard] },
      { path: 'MaterailTestCertificateDetail', component: MaterailTestCertificateDetailComponent, canActivate: [AuthGuard] },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemAdminRoutingModule { }
