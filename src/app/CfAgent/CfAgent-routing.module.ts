// import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CFAllOrderViewComponent } from './all-order-view/all-order-view.component';
import { CfAgentComponent } from './CfAgent.component';
import { CFChangePasswordComponent } from './change-password/change-password.component';
import { CFAgentCreateOrderComponent } from './create-order/create-order.component';
import { CfAgentCustomerListComponent } from './customer-list/customer-list.component';
import { CfAgentDashboardComponent } from './dashboard/dashboard.component';
import { CfAgentProfileEditComponent } from './edit-profile/edit-profile.component';
import { CFOrderEditComponent } from './order-edit/order-edit.component';
import { CFOrderListComponent } from './order-list/order-list.component';
import { CFOrderViewComponent } from './order-view/order-view.component';
import { CfAgentPendingOrdersComponent } from './pending-orders/pending-orders.component';
import { CfAgentProfileComponent } from './profile/profile.component';
import { CFSAPOrderListComponent } from './saporder-list/saporder-list.component';
import { CFSAPOrderViewComponent } from './saporder-view/saporder-view.component';
import { CFUserCreateComponent } from './user-create/user-create.component';
import { CFUserListComponent } from './user-list/user-list.component';
import { CFUserViewComponent } from './user-view/user-view.component';
import { BlockOrderListComponent } from './block-order-list/block-order-list.component';
import { CurrentLedgerComponent } from './current-ledger/current-ledger.component';
import { BalanceConfirmationComponent } from './balance-confirmation/balance-confirmation.component';
import { BalanceConfirmationViewComponent } from './balance-confirmation-view/balance-confirmation-view.component';
const routes: Routes = [
  {
    path: '', component: CfAgentComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: CfAgentDashboardComponent, canActivate: [AuthGuard] },
      { path: 'PendingOrders', component: CfAgentPendingOrdersComponent, canActivate: [AuthGuard] },
      { path: 'CustomerList', component: CfAgentCustomerListComponent, canActivate: [AuthGuard] },
      { path: 'OrderList', component: CFOrderListComponent, canActivate: [AuthGuard] },
      { path: 'OrderView', component: CFOrderViewComponent, canActivate: [AuthGuard] },
      { path: 'AllOrderView', component: CFAllOrderViewComponent, canActivate: [AuthGuard] },
      { path: 'OrderEdit', component: CFOrderEditComponent, canActivate: [AuthGuard] },
      { path: 'SAPOrderList', component: CFSAPOrderListComponent, canActivate: [AuthGuard] },
      { path: 'SAPOrderView', component: CFSAPOrderViewComponent, canActivate: [AuthGuard] },
      { path: 'Profile', component: CfAgentProfileComponent, canActivate: [AuthGuard] },
      { path: 'Editprofile', component: CfAgentProfileEditComponent, canActivate: [AuthGuard] },
      { path: 'BlockOrders', component: BlockOrderListComponent, canActivate: [AuthGuard] },

      { path: 'CreateOrder', component: CFAgentCreateOrderComponent, canActivate: [AuthGuard] },
      { path: 'UserList', component: CFUserListComponent, canActivate: [AuthGuard] },
      { path: 'UserCreate', component: CFUserCreateComponent, canActivate: [AuthGuard] },
      { path: 'UserView', component: CFUserViewComponent, canActivate: [AuthGuard] },
      { path: 'ChangePassword', component: CFChangePasswordComponent, canActivate: [AuthGuard] },
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
export class CfAgentRoutingModule { }
