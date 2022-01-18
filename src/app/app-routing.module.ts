import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { CustomerRegistrationComponent } from './user/registration/registration.component';
import { CustomerVerificationComponent } from './user/verification/verification.component';
import { PreloadAllModules } from '@angular/router';
import { HomepageComponent } from './user/homepage/homepage.component';
import { ErrorPageComponent } from './user/error-page/error-page.component';
import { ForgetPasswordEmailSendComponent } from './user/forget-password-email-send/forget-password-email-send.component';
import { ForgetPasswordResetComponent } from './user/forget-password-reset/forget-password-reset.component';
import { LoginWithOTPComponent } from './user/login-with-otp/login-with-otp.component';
const routes: Routes = [
  { path: '', redirectTo: '/user/homepage', pathMatch: 'full' },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'homepage', component: HomepageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'Verification', component: CustomerVerificationComponent },
      { path: 'Registration', component: CustomerRegistrationComponent},
      { path: 'PasswordEmailSend', component: ForgetPasswordEmailSendComponent},
      { path: 'LoginWithOTP', component: LoginWithOTPComponent},
      { path: 'PasswordReset', component: ForgetPasswordResetComponent},
      { path: 'ErrorPage', component: ErrorPageComponent},
     
    ]
  },
  {
    path: 'SuperAdmin',
    loadChildren: () => import('./SuperAdmin/SuperAdmin.module').then(m => m.SuperAdminModule)

  },

  {
    path: 'SystemAdmin',
    loadChildren: () => import('./SystemAdmin/SystemAdmin.module').then(m => m.SystemAdminModule)
  },
  {
    path: 'Customer',
    loadChildren: () => import('./Customer/Customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'CfAgent',
    loadChildren: () => import('./CfAgent/CfAgent.module').then(m => m.CfAgentModule)
  },
  {
    path: 'SP',
    loadChildren: () => import('./SP/sp.module').then(m => m.SPModule)
  },
  {
    path: 'Emp',
    loadChildren: () => import('./Emp/Emp.module').then(m => m.EmpModule)
  },
  {
    path: 'Retailer',
    loadChildren: () => import('./retailer/retailer.module').then(m => m.RetailerModule)
  },
  {
    path: 'KAM',
    loadChildren: () => import('./KAM/KAM.module').then(m => m.KAMModule)
  },


  // otherwise redirect to home
  { path: '**', redirectTo: 'LoginComponent' },

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy: PreloadAllModules
    }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
