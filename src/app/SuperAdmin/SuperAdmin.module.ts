// Angular
import {  NgModule } from '@angular/core';
import {  MatRippleModule, MatInputModule, MatFormFieldModule, DateAdapter, MatButtonToggleModule, MatDatepickerModule, MatExpansionModule, MatMenuModule, MatNativeDateModule, MatProgressSpinnerModule, MatSliderModule, MatSlideToggleModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';

import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { TokenInterceptor } from '../auth/token.interceptor';
import { AlertModule } from '../component/alert.module';
import { PaginationService } from '../component/pagination/pagination.service';
import { UserService } from '../shared/user.service';
import { SuperAdminRoutingModule } from './SuperAdmin-routing.module';
import { SuperAdminChangePasswordComponent } from './change-password/change-password.component';
import { SuperAdminDashboardComponent } from './dashboard/dashboard.component';
import { SuperAdminProfileEditComponent } from './edit-profile/edit-profile.component';
import { SuperAdminProfileComponent } from './profile/profile.component';
import { SuperAdminHomenavComponent } from './homenav/homenav.component';
import { SuperAdminAddUserComponent } from './add-user/add-user.component';
import { SuperAdminHomeComponent } from './home.component';
import { PasswordStrengthBarComponent } from './password-strength-bar/password-strength-bar.component';
@NgModule({
  declarations: [
    SuperAdminHomeComponent,
    SuperAdminAddUserComponent,
    SuperAdminHomenavComponent,
    SuperAdminChangePasswordComponent,
    SuperAdminDashboardComponent,
    SuperAdminProfileComponent,
    SuperAdminProfileEditComponent,
    PasswordStrengthBarComponent,
  ],
  imports: [
    MatSlideToggleModule,
    MatButtonToggleModule,
    SuperAdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
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
export class SuperAdminModule {}
