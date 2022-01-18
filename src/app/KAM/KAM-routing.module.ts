import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { KAMChangePasswordComponent } from './change-password/change-password.component';
import { KAMCustomerListComponent } from './customer-list/customer-list.component';
import { KAMDashboardComponent } from './dashboard/dashboard.component';
import { KAMProfileEditComponent } from './edit-profile/edit-profile.component';
import { KAMProfileComponent } from './profile/profile.component';
import { KAMComponent } from './KAM.component';
import { KAMUserCreateComponent } from './user-create/user-create.component';
import { KAMUserListComponent } from './user-list/user-list.component';
import { KAMUserViewComponent } from './user-view/user-view.component';
import { PriceApprovalViewComponent } from './price-approval-view/price-approval-view.component';
import { PriceApprovalCreateComponent } from './price-approval-create/price-approval-create.component';
import { PriceApprovalListComponent } from './price-approval-list/price-approval-list.component';
import { MaterialTestCertificateListComponent } from './material-test-certificate-list/material-test-certificate-list.component';
import { KAMMaterialTestCertificateUploadComponent } from './kammaterial-test-certificate-upload/kammaterial-test-certificate-upload.component';

const routes: Routes = [
  {
    path: '', component: KAMComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component:  KAMDashboardComponent, canActivate: [AuthGuard] },
      { path: 'CustomerList', component: KAMCustomerListComponent, canActivate: [AuthGuard] },
      { path: 'Profile', component: KAMProfileComponent, canActivate: [AuthGuard] },
      { path: 'Editprofile', component: KAMProfileEditComponent, canActivate: [AuthGuard] },
      { path: 'UserList', component: KAMUserListComponent, canActivate: [AuthGuard] },
      { path: 'UserCreate', component: KAMUserCreateComponent, canActivate: [AuthGuard] },
      { path: 'UserView', component: KAMUserViewComponent, canActivate: [AuthGuard] },
      { path: 'ChangePassword', component: KAMChangePasswordComponent, canActivate: [AuthGuard] },
      { path: 'PriceApprovalCreate', component: PriceApprovalCreateComponent, canActivate: [AuthGuard] },
      { path: 'PriceApprovalList', component: PriceApprovalListComponent, canActivate: [AuthGuard] },
      { path: 'PriceApprovalView', component: PriceApprovalViewComponent, canActivate: [AuthGuard] },
      { path: 'MaterialTestCertificateList', component: MaterialTestCertificateListComponent, canActivate: [AuthGuard] },
      { path: 'KAMMaterialTestCertificateUpload', component: KAMMaterialTestCertificateUploadComponent, canActivate: [AuthGuard] },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KAMRoutingModule { }
