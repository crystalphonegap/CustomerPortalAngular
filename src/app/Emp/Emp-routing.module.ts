// import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BalanceConfirmationEditComponent } from './balance-confirmation-edit/balance-confirmation-edit.component';
import { BalanceConfirmationListForAllComponent } from './balance-confirmation-list-for-all/balance-confirmation-list-for-all.component';
import { BalanceConfirmationListForCFSPComponent } from './balance-confirmation-list-for-CFSP/balance-confirmation-list-for-all.component';
import { BalanceConfirmationListComponent } from './balance-confirmation-list/balance-confirmation-list.component';
import { BalanceConfirmationUploadComponent } from './balance-confirmation-upload/balance-confirmation-upload.component';
import { BalanceConfirmationViewForAllComponent } from './balance-confirmation-view-for-all/balance-confirmation-view-for-all.component';
import { BalanceConfirmationViewForCFSPComponent } from './balance-confirmation-view-ForCFSP/balance-confirmation-view-ForCFSP.component';
import { BalanceConfirmationViewComponent } from './balance-confirmation-view/balance-confirmation-view.component';
import { BlockOrderListComponent } from './block-order-list/block-order-list.component';
import { EmpChangePasswordComponent } from './change-password/change-password.component';
import { TechnicianClosedTicketsViewComponent } from './closed-tickets-view/closed-tickets-view.component';
import { TechnicianCompletedTicketsViewComponent } from './completed-tickets-view/completed-tickets-view.component';
import { EmpCustomerListComponent } from './customer-list/customer-list.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { EmpDashboardComponent } from './dashboard/dashboard.component';
import { EmpProfileEditComponent } from './edit-profile/edit-profile.component';
import { EmpAdminNewLoginReportComponent } from './emp-admin-new-login-report/emp-admin-new-login-report.component';
import { EmpComponent } from './Emp.component';
import { MisReportViewCloseTicketByCategoryComponent } from './mis-report-view-close-ticket-by-category/mis-report-view-close-ticket-by-category.component';
import { MisReportViewCloseTicketByUserTypeComponent } from './mis-report-view-close-ticket-by-user-type/mis-report-view-close-ticket-by-user-type.component';
import { MisReportViewOpenTicketByCategoryComponent} from './mis-report-view-open-ticket-by-category/mis-report-view-open-ticket-by-category.component';
import { MisReportViewOpenTicketByUserTypeComponent } from './mis-report-view-open-ticket-by-user-type/mis-report-view-open-ticket-by-user-type.component';
import { OpenOrdersViewComponent } from './open-orders-view/open-orders-view.component';
import { OpenOrdersComponent } from './open-orders/open-orders.component';
import { TechnicianOpenTicketsViewComponent } from './open-tickets-view/open-tickets-view.component';
import { TechnicianOpenTicketsComponent } from './open-tickets/open-tickets.component';
import { EmpProfileComponent } from './profile/profile.component';
import { RegionalheadComponent } from './regionalhead/regionalhead.component';
import { BalanceConfirmationViewForRAHComponent } from './balance-confirmation-view-for-rah/balance-confirmation-view-for-rah.component';
import { TicketMisListForCategoryComponent } from './ticket-mis-list-for-category/ticket-mis-list-for-category.component';
import { TicketMisListForUsertypeComponent } from './ticket-mis-list-for-usertype/ticket-mis-list-for-usertype.component';
import { TicketMISCategoryTypeWiseComponent } from './ticket-miscategory-type-wise/ticket-miscategory-type-wise.component';
import { TicketMISUserTypeWiseComponent } from './ticket-misuser-type-wise/ticket-misuser-type-wise.component';
import { RAHEmpDashboardComponent } from './rahemp-dashboard/rahemp-dashboard.component';
import { BalanceActionLogComponent } from './balance-action-log/balance-action-log.component';

const routes: Routes = [
  {
    path: '',component: EmpComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: EmpDashboardComponent, canActivate: [AuthGuard] },
      { path: 'CustomerList', component: EmpCustomerListComponent, canActivate: [AuthGuard] },
      { path: 'Profile', component: EmpProfileComponent, canActivate: [AuthGuard] },
      { path: 'Editprofile', component: EmpProfileEditComponent, canActivate: [AuthGuard] },
      { path: 'ChangePassword', component: EmpChangePasswordComponent, canActivate: [AuthGuard] },
      { path: 'BalanceConfirmationUpload', component: BalanceConfirmationUploadComponent, canActivate: [AuthGuard] },
      { path: 'BalanceConfirmationList', component: BalanceConfirmationListComponent, canActivate: [AuthGuard] },
      { path: 'BalanceConfirmationView', component: BalanceConfirmationViewComponent, canActivate: [AuthGuard] },
      { path: 'BalanceConfirmationEdit', component: BalanceConfirmationEditComponent, canActivate: [AuthGuard] },
      { path: 'BalanceConfirmationListA', component: BalanceConfirmationListForAllComponent, canActivate: [AuthGuard] },
      { path: 'BalanceConfirmationViewA', component: BalanceConfirmationViewForAllComponent, canActivate: [AuthGuard] },
      { path: 'BalanceConfirmationViewForRAH', component: BalanceConfirmationViewForRAHComponent, canActivate: [AuthGuard] },
      { path: 'OpenOrders', component: OpenOrdersComponent, canActivate: [AuthGuard] },
      { path: 'OpenOrdersView', component: OpenOrdersViewComponent, canActivate: [AuthGuard] },
      { path: 'Regionalhead', component: RegionalheadComponent, canActivate: [AuthGuard] },
      { path: 'BlockOrders', component: BlockOrderListComponent, canActivate: [AuthGuard] },
      { path: 'OpenTicketsDetail', component: TechnicianOpenTicketsComponent, canActivate: [AuthGuard] },
      { path: 'OpenTicketsView', component: TechnicianOpenTicketsViewComponent, canActivate: [AuthGuard] },
      { path: 'ClosedTicketsView', component: TechnicianClosedTicketsViewComponent, canActivate: [AuthGuard] },
      { path: 'LoginReport', component: EmpAdminNewLoginReportComponent, canActivate: [AuthGuard] },
      { path: 'TicketMISUserTypeWise', component: TicketMISUserTypeWiseComponent, canActivate: [AuthGuard] },
      { path: 'TicketMISCategoryTypeWise', component: TicketMISCategoryTypeWiseComponent, canActivate: [AuthGuard] },
      { path: 'TicketMISUserTypeWiseList', component: TicketMisListForUsertypeComponent, canActivate: [AuthGuard] },
      { path: 'TicketMISCategoryTypeWiseList', component: TicketMisListForCategoryComponent, canActivate: [AuthGuard] },
      { path: 'CompletedTicketsView', component: TechnicianCompletedTicketsViewComponent, canActivate: [AuthGuard] },
      { path: 'MisReportViewCloseTicketByCategory', component: MisReportViewCloseTicketByCategoryComponent, canActivate: [AuthGuard] },
      { path: 'MisReportViewCloseTicketByUserType', component: MisReportViewCloseTicketByUserTypeComponent, canActivate: [AuthGuard] },
      { path: 'MisReportViewOpenTicketByCategory', component: MisReportViewOpenTicketByCategoryComponent, canActivate: [AuthGuard] },
      { path: 'MisReportViewOpenTicketByUserType', component: MisReportViewOpenTicketByUserTypeComponent, canActivate: [AuthGuard] },
      { path: 'BalanceConfirmationListForCFSP', component: BalanceConfirmationListForCFSPComponent, canActivate: [AuthGuard] },
      { path: 'BalanceConfirmationViewForCFSP', component: BalanceConfirmationViewForCFSPComponent, canActivate: [AuthGuard] },
      { path: 'CustomerProfile', component: CustomerProfileComponent, canActivate: [AuthGuard] },
      { path: 'RAHEmpDashboard',component:RAHEmpDashboardComponent,canActivate:[AuthGuard] },
      { path: 'BalanceConfLog',component:BalanceActionLogComponent,canActivate:[AuthGuard] },
      { path: '**', redirectTo: 'LoginComponent' },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpRoutingModule { }
