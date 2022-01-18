// Angular
import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule, MatFormFieldModule, MatProgressSpinnerModule } from '@angular/material';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from '@angular/material';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// Modules
import { AppRoutingModule } from './app-routing.module';

import { AlertModule } from './component/alert.module'
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationService } from './component/pagination/pagination.service';
import { MatMenuModule } from '@angular/material/menu';
import { TokenInterceptor } from './auth/token.interceptor';
import { DatePipe } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomerVerificationComponent } from './user/verification/verification.component';
import { CustomerRegistrationComponent } from './user/registration/registration.component';
import { HomepageComponent } from './user/homepage/homepage.component';
import { ErrorPageComponent } from './user/error-page/error-page.component';
import { ModalComponent } from './component/ErrorHandler-Dialog-box/modal.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { IosInstallComponent } from './ios-install/ios-install.component';
import { Encrypt } from './component/Encrypt';
import { PasswordStrengthBarComponent } from './user/password-strength-bar/password-strength-bar.component';
import { ForgetPasswordEmailSendComponent } from './user/forget-password-email-send/forget-password-email-send.component';
import { ForgetPasswordResetComponent } from './user/forget-password-reset/forget-password-reset.component';
import { LoyalityPointsListComponent } from './SystemAdmin/Loyality-Points-list/Loyality-Points-list.component';
import { LoginWithOTPComponent } from './user/login-with-otp/login-with-otp.component';
@NgModule({
  declarations: [
    ModalComponent,
    AppComponent,
    UserComponent,
    LoginComponent,
    CustomerVerificationComponent ,
    CustomerRegistrationComponent,
    HomepageComponent,
    ErrorPageComponent,
    IosInstallComponent,
    PasswordStrengthBarComponent,
    ForgetPasswordEmailSendComponent,
    ForgetPasswordResetComponent,
    LoginWithOTPComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AlertModule,
    AppRoutingModule,
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [UserService,
    Encrypt,
     DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,

  },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    PaginationService,
    PasswordStrengthBarComponent,

  ],
  bootstrap: [AppComponent],
  entryComponents: [IosInstallComponent]
})
export class AppModule { }
