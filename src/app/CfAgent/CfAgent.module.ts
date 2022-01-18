// Angular
import { BrowserModule} from '@angular/platform-browser';
import {MatRippleModule, MatInputModule, MatFormFieldModule, DateAdapter, MatButtonToggleModule, MatDatepickerModule, MatExpansionModule, MatMenuModule, MatNativeDateModule, MatProgressSpinnerModule, MatSliderModule, MatSlideToggleModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from '../auth/token.interceptor';
import { AlertModule } from '../component/alert.module' ;
import { PaginationService } from '../component/pagination/pagination.service';
import { UserService } from '../shared/user.service';
import { CfAgentRoutingModule } from './CfAgent-routing.module';
import { CFAllOrderViewComponent } from './all-order-view/all-order-view.component';
import { CfAgentAsideComponent } from './CfAgent-aside/CfAgent-aside.component';
import { CfAgentComponent } from './CfAgent.component';
import { CFChangePasswordComponent } from './change-password/change-password.component';
import { CFAgentCreateOrderComponent } from './create-order/create-order.component';
import { CfAgentCustomerListComponent } from './customer-list/customer-list.component';
import { CfAgentDashboardComponent } from './dashboard/dashboard.component';
import { CfAgentProfileEditComponent } from './edit-profile/edit-profile.component';
import { CfNavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { CFOrderEditComponent } from './order-edit/order-edit.component';
import { CFOrderListComponent } from './order-list/order-list.component';
import { CFOrderViewComponent } from './order-view/order-view.component';
import { CfAgentPendingOrdersComponent } from './pending-orders/pending-orders.component';
import { CfAgentProfileComponent } from './profile/profile.component';
import { CFUserCreateComponent } from './user-create/user-create.component';
import { CFUserListComponent } from './user-list/user-list.component';
import { CFUserViewComponent } from './user-view/user-view.component';
import { NgModule } from '@angular/core';
import { CFSAPOrderViewComponent } from './saporder-view/saporder-view.component';
import { CFSAPOrderListComponent } from './saporder-list/saporder-list.component';
import { CurrentLedgerComponent } from './current-ledger/current-ledger.component';
import { BlockOrderListComponent } from './block-order-list/block-order-list.component';
import { CommonModule } from '@angular/common';
import { PasswordStrengthBarComponent } from './password-strength-bar/password-strength-bar.component';
import { BalanceConfirmationComponent } from './balance-confirmation/balance-confirmation.component';
import { BalanceConfirmationViewComponent } from './balance-confirmation-view/balance-confirmation-view.component';
import { ModalComponent } from '../component/CF_Modal/modal.component';
@NgModule({
  declarations: [
    CFSAPOrderListComponent,
    CFSAPOrderViewComponent,
    CFAllOrderViewComponent,
    BlockOrderListComponent,
    CFUserViewComponent,
    CFUserCreateComponent,
    CFUserListComponent,
    CfAgentComponent,
    CFAgentCreateOrderComponent,
    CfAgentDashboardComponent,
    CfAgentCustomerListComponent,
    CfAgentPendingOrdersComponent,
    CFOrderViewComponent,
    CFOrderListComponent,
    CFOrderEditComponent,
    CfAgentProfileComponent,
    CfAgentAsideComponent,
    CfNavigationBarComponent,
    CFChangePasswordComponent,
    CfAgentProfileEditComponent,
    CurrentLedgerComponent,
    PasswordStrengthBarComponent,
    BalanceConfirmationComponent,
    BalanceConfirmationViewComponent,
    ModalComponent,

    
  ],
  imports: [
    MatSlideToggleModule,
    MatButtonToggleModule,
    CfAgentRoutingModule,
    ReactiveFormsModule,
    CommonModule ,
    FormsModule,
    AlertModule,
    MatExpansionModule,
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
    MatRippleModule,
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
export class CfAgentModule {}
