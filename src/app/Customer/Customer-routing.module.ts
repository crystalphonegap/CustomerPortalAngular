// import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CustomerAccountStatementComponent } from './account-statement/account-statement.component';
import { CustomerChangePasswordComponent } from './change-password/change-password.component';
import { CustomerCreateOrderComponent } from './create-order/create-order.component';
import { CustomerCurrentLedgerComponent } from './current-ledger/current-ledger.component';
import { CustomerBalanceConfirmationComponent } from './customer-balance-confirmation/customer-balance-confirmation.component';
import { CustomerComponent } from './Customer.component';
import { CustomerDashboardComponent } from './dashboard/dashboard.component';
import { CustomerDispatchOrderViewComponent } from './dispatch-order-view/dispatch-order-view.component';
import { CustomerDispatchOrderDetailComponent } from './DispatchOrder-detail/DispatchOrder-detail.component';
import { CustomerProfileEditComponent } from './edit-profile/edit-profile.component';
import { HistoryComponent } from './history/history.component';
import { CustomerInvoiceDetailComponent } from './Invoice-detail/Invoice-detail.component';
import { CustomerInvoiceViewComponent } from './Invoice-view/Invoice-view.component';
import { CustomerOrderEditComponent } from './order-edit/order-edit.component';
import { CustomerOrderListComponent } from './order-list/order-list.component';
import { CustomerOrderViewComponent } from './order-view/order-view.component';
import { CustomerOutStandingComponent } from './out-standing/out-standing.component';
import { CustomerProfileComponent } from './profile/profile.component';
import { CustomerRetailOrderDetailComponent } from './retail-order-detail/retail-order-detail.component';
import { CustomerRetailOrderEditComponent } from './retail-order-edit/retail-order-edit.component';
import { CustomerSalesOrderViewComponent } from './Sales-order-view/Sales-order-view.component';
import { CustomerSalesOrderDetailComponent } from './SalesOrder-detail/SalesOrder-detail.component';
import { CustomerUserCreateComponent } from './user-create/user-create.component';
import { CustomerUserListComponent } from './user-list/user-list.component';
import { CustomerUserViewComponent } from './user-view/user-view.component';
import { CustomerBalanceConfirmationViewComponent } from './customer-balance-confirmation-view/customer-balance-confirmation-view.component';
import { RetailerListComponent } from './retailer-list/retailer-list.component';
import { CustomerCreateTicketComponent } from './customer-create-ticket/customer-create-ticket.component';
import { CustomerTicketListComponent } from './customer-ticket-list/customer-ticket-list.component';
import { CustomerTicketViewComponent } from './customer-ticket-view/customer-ticket-view.component';
import { MaterialTestCertificateListComponent } from './material-test-certificate-list/material-test-certificate-list.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { MaterailTestCertificateDetailComponent } from './materail-test-certificate-detail/materail-test-certificate-detail.component';
import { EventImageUploadComponent } from './event-image-upload/event-image-upload.component';
const routes: Routes = [
  {
    path: '',component: CustomerComponent,
    children: [
      // { path: 'registration', component: RegistrationComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard] },
      { path: 'ChangePassword', component: CustomerChangePasswordComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: CustomerProfileComponent, canActivate: [AuthGuard] },
      { path: 'Editprofile', component: CustomerProfileEditComponent, canActivate: [AuthGuard] },
      { path: 'DispatchOrderDetail', component: CustomerDispatchOrderDetailComponent, canActivate: [AuthGuard] },
      { path: 'DispatchOrderDetailView', component: CustomerDispatchOrderViewComponent, canActivate: [AuthGuard] },
      { path: 'CreateOrderRequest', component: CustomerCreateOrderComponent, canActivate: [AuthGuard] },
      { path: 'OrderList', component: CustomerOrderListComponent, canActivate: [AuthGuard] },
      { path: 'OrderView', component: CustomerOrderViewComponent, canActivate: [AuthGuard] },
      { path: 'OrderEdit', component: CustomerOrderEditComponent, canActivate: [AuthGuard] },
      { path: 'InvoiceDetail', component: CustomerInvoiceDetailComponent, canActivate: [AuthGuard] },
      { path: 'InvoiceDetailView', component: CustomerInvoiceViewComponent, canActivate: [AuthGuard] },
      { path: 'SalesOrderDetail', component: CustomerSalesOrderDetailComponent, canActivate: [AuthGuard] },
      { path: 'SalesOrderDetailView', component: CustomerSalesOrderViewComponent, canActivate: [AuthGuard] },
      { path: 'UserList', component: CustomerUserListComponent, canActivate: [AuthGuard] },
      { path: 'UserCreate', component: CustomerUserCreateComponent, canActivate: [AuthGuard] },
      { path: 'UserView', component: CustomerUserViewComponent, canActivate: [AuthGuard] },
      { path: 'CurrentLedger', component: CustomerCurrentLedgerComponent, canActivate: [AuthGuard] },
      { path: 'History', component: HistoryComponent, canActivate: [AuthGuard] },
      { path: 'RetailOrderDetail', component: CustomerRetailOrderDetailComponent, canActivate: [AuthGuard] },
      { path: 'RetailOrderEdit', component: CustomerRetailOrderEditComponent, canActivate: [AuthGuard] },
      { path: 'OutStanding', component: CustomerOutStandingComponent, canActivate: [AuthGuard] },
      { path: 'BalanceConfirmation', component: CustomerBalanceConfirmationComponent, canActivate: [AuthGuard] },
      { path: 'BalanceConfirmationView', component: CustomerBalanceConfirmationViewComponent, canActivate: [AuthGuard] },
      { path: 'CreateTicket', component: CustomerCreateTicketComponent, canActivate: [AuthGuard] },
      { path: 'RetailerList', component: RetailerListComponent, canActivate: [AuthGuard] },
      { path: 'TicketStatus', component: CustomerTicketListComponent, canActivate: [AuthGuard] },
      { path: 'TicketView', component: CustomerTicketViewComponent, canActivate: [AuthGuard] },
      { path: 'AccountStatement', component: CustomerAccountStatementComponent, canActivate: [AuthGuard] },
      { path: 'MaterialTestCertificateList', component: MaterialTestCertificateListComponent, canActivate: [AuthGuard] },
      { path: 'MaterailTestCertificateDetail', component: MaterailTestCertificateDetailComponent, canActivate: [AuthGuard] },
      { path: 'ImageViewer', component: ImageViewerComponent, canActivate: [AuthGuard] },
      { path:  'ImageUpload', component: EventImageUploadComponent, canActivate:[AuthGuard] },
      { path: '**', redirectTo: 'LoginComponent' },
    ]

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
