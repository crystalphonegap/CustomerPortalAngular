// import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RetailerChangePasswordComponent } from './change-password/change-password.component';
import { RetailerCreateOrderComponent } from './create-order/create-order.component';
import { RetailerDashboardComponent } from './dashboard/dashboard.component';
import { RetailerDispatchOrderDetailComponent } from './DispatchOrder-detail/DispatchOrder-detail.component';
import { RetailerProfileEditComponent } from './edit-profile/edit-profile.component';
import { RetailerOrderEditComponent } from './order-edit/order-edit.component';
import { RetailerOrderListComponent } from './order-list/order-list.component';
import { RetailerOrderViewComponent } from './order-view/order-view.component';
import { RetailerProfileComponent } from './profile/profile.component';
import { RetailerComponent } from './retailer.component';
const routes: Routes = [
  {
    path: '', component: RetailerComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: RetailerDashboardComponent, canActivate: [AuthGuard] },
      { path: 'Profile', component: RetailerProfileComponent, canActivate: [AuthGuard] },
      { path: 'Editprofile', component: RetailerProfileEditComponent, canActivate: [AuthGuard] },
      { path: 'ChangePassword', component: RetailerChangePasswordComponent, canActivate: [AuthGuard] },
      { path: 'CreateOrder', component: RetailerCreateOrderComponent, canActivate: [AuthGuard] },
      { path: 'OrderList', component: RetailerOrderListComponent, canActivate: [AuthGuard] },
      { path: 'OrderView', component: RetailerOrderViewComponent, canActivate: [AuthGuard] },
      { path: 'OrderEdit', component: RetailerOrderEditComponent, canActivate: [AuthGuard] },
      { path: 'DispatchOrder', component: RetailerDispatchOrderDetailComponent, canActivate: [AuthGuard] },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailerRoutingModule { }
