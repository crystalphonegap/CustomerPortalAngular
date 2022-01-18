import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { KAMRoutingModule } from './KAM-routing.module';
import { KAMChangePasswordComponent } from './change-password/change-password.component';
import { KAMCustomerListComponent } from './customer-list/customer-list.component';
import { KAMDashboardComponent } from './dashboard/dashboard.component';
import { KAMProfileEditComponent } from './edit-profile/edit-profile.component';
import { KAMNavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { KAMProfileComponent } from './profile/profile.component';
import { KAMAsideComponent } from './KAM-aside/KAM-aside.component';
import { KAMComponent } from './KAM.component';
import { KAMUserCreateComponent } from './user-create/user-create.component';
import { KAMUserListComponent } from './user-list/user-list.component';
import { KAMUserViewComponent } from './user-view/user-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '../component/alert.module';
import { DateAdapter, MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatDatepickerModule
  , MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
   MatNativeDateModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule,
    MatSlideToggleModule, MatToolbarModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { TokenInterceptor } from '../auth/token.interceptor';
import { PaginationService } from '../component/pagination/pagination.service';
import { UserService } from '../shared/user.service';
import { PasswordStrengthBarComponent } from './password-strength-bar/password-strength-bar.component';
import { KAMModalComponent } from '../component/KAM_Model/modal.component';
import { PriceApprovalCreateComponent } from './price-approval-create/price-approval-create.component';
import { PriceApprovalListComponent } from './price-approval-list/price-approval-list.component';
import { PriceApprovalViewComponent } from './price-approval-view/price-approval-view.component';
import { YearPicker } from '../component/DatePickerFORKAM/YearPicker';
import { MonthPicker } from '../component/DatePickerFORKAM/monthpicker';
import { MaterialTestCertificateListComponent } from './material-test-certificate-list/material-test-certificate-list.component';
import { KAMMaterialTestCertificateUploadComponent } from './kammaterial-test-certificate-upload/kammaterial-test-certificate-upload.component';



@NgModule({
  declarations: [
    KAMUserListComponent,
    KAMUserViewComponent,
    KAMUserCreateComponent,
    KAMProfileComponent,
    KAMNavigationBarComponent,
    KAMAsideComponent,
    KAMProfileEditComponent,
    KAMDashboardComponent,
    KAMComponent,
    YearPicker,
    MonthPicker,
    KAMCustomerListComponent,
    KAMChangePasswordComponent,
    PasswordStrengthBarComponent,
    KAMModalComponent,
    PriceApprovalCreateComponent,
    PriceApprovalListComponent,
    PriceApprovalViewComponent,
    MaterialTestCertificateListComponent,
    KAMMaterialTestCertificateUploadComponent,
  ],
  imports: [
    KAMRoutingModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
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
    MatInputModule,MatSelectModule,
    MatRippleModule,

  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatFormFieldModule, MatInputModule,MatSelectModule,
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
export class KAMModule { }
