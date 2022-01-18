// import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SuperAdminAddUserComponent } from './add-user/add-user.component';
import { SuperAdminChangePasswordComponent } from './change-password/change-password.component';
import { SuperAdminDashboardComponent } from './dashboard/dashboard.component';
import { SuperAdminProfileEditComponent } from './edit-profile/edit-profile.component';
import { SuperAdminHomeComponent } from './home.component';
import { SuperAdminProfileComponent } from './profile/profile.component';
const routes: Routes = [
  {
    path: '', component: SuperAdminHomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SuperAdminDashboardComponent, canActivate: [AuthGuard] },
      { path: 'Profile', component: SuperAdminProfileComponent, canActivate: [AuthGuard] },
      { path: 'Editprofile', component: SuperAdminProfileEditComponent, canActivate: [AuthGuard] },
      { path: 'AddAdmin', component: SuperAdminAddUserComponent, canActivate: [AuthGuard] },
      { path: 'EditAdmin', component: SuperAdminAddUserComponent, canActivate: [AuthGuard] },
      { path: 'ChangePassword', component: SuperAdminChangePasswordComponent, canActivate: [AuthGuard] },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
