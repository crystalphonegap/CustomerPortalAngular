// import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SPAllOrderViewComponent } from './all-order-view/all-order-view.component';
import { SPChangePasswordComponent } from './change-password/change-password.component';
import { SPCreateOrderComponent } from './create-order/create-order.component';
import { SPCustomerListComponent } from './customer-list/customer-list.component';
import { SPDashboardComponent } from './dashboard/dashboard.component';
import { SPProfileEditComponent } from './edit-profile/edit-profile.component';
import { SPOrderEditComponent } from './order-edit/order-edit.component';
import { SPOrderListComponent } from './order-list/order-list.component';
import { SPOrderViewComponent } from './order-view/order-view.component';
import { SPPendingOrdersComponent } from './pending-orders/pending-orders.component';
import { SPProfileComponent } from './profile/profile.component';
import { SPSAPOrderListComponent } from './saporder-list/saporder-list.component';
import { SPSAPOrderViewComponent } from './saporder-view/saporder-view.component';
import { SPComponent } from './SP.component';
import { SPUserCreateComponent } from './user-create/user-create.component';
import { SPUserListComponent } from './user-list/user-list.component';
import { SPUserViewComponent } from './user-view/user-view.component';
import { CurrentLedgerComponent } from './current-ledger/current-ledger.component';
import { OrderResponseComponent } from './order-response/order-response.component';
import { BlockOrderListComponent } from './block-order-list/block-order-list.component';
import { BalanceConfirmationComponent } from './balance-confirmation/balance-confirmation.component';
import { BalanceConfirmationViewComponent } from './balance-confirmation-view/balance-confirmation-view.component';
const routes: Routes = [
  {
    path: '', component: SPComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component:  SPDashboardComponent, canActivate: [AuthGuard] },
      { path: 'CustomerList', component: SPCustomerListComponent, canActivate: [AuthGuard] },
      { path: 'Profile', component: SPProfileComponent, canActivate: [AuthGuard] },
      { path: 'Editprofile', component: SPProfileEditComponent, canActivate: [AuthGuard] },
      { path: 'UserList', component: SPUserListComponent, canActivate: [AuthGuard] },
      { path: 'UserCreate', component: SPUserCreateComponent, canActivate: [AuthGuard] },
      { path: 'UserView', component: SPUserViewComponent, canActivate: [AuthGuard] },
      { path: 'ChangePassword', component: SPChangePasswordComponent, canActivate: [AuthGuard] },
      { path: 'BlockOrders', component: BlockOrderListComponent, canActivate: [AuthGuard] },
      { path: 'PendingOrders', component: SPPendingOrdersComponent, canActivate: [AuthGuard] },
      { path: 'OrderList', component: SPOrderListComponent, canActivate: [AuthGuard] },
      { path: 'OrderView', component: SPOrderViewComponent, canActivate: [AuthGuard] },
      { path: 'AllOrderView', component: SPAllOrderViewComponent, canActivate: [AuthGuard] },
      { path: 'OrderEdit', component: SPOrderEditComponent, canActivate: [AuthGuard] },
      { path: 'SAPOrderList', component: SPSAPOrderListComponent, canActivate: [AuthGuard] },
      { path: 'SAPOrderView', component: SPSAPOrderViewComponent, canActivate: [AuthGuard] },
      { path: 'CreateOrder', component: SPCreateOrderComponent, canActivate: [AuthGuard] },
      { path: 'OrderResponse', component: OrderResponseComponent, canActivate: [AuthGuard] },
      { path: 'CurrentLedger', component: CurrentLedgerComponent, canActivate: [AuthGuard] },
      { path: 'BalanceConfirmation', component: BalanceConfirmationComponent, canActivate: [AuthGuard] },
      { path: 'BalanceConfirmationView', component: BalanceConfirmationViewComponent, canActivate: [AuthGuard] },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SPRoutingModule { }
