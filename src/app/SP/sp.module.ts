import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SPCreateOrderComponent } from './create-order/create-order.component';
import { SPRoutingModule } from './SP-routing.module';
import { SPAllOrderViewComponent } from './all-order-view/all-order-view.component';
import { SPChangePasswordComponent } from './change-password/change-password.component';
import { SPCustomerListComponent } from './customer-list/customer-list.component';
import { SPDashboardComponent } from './dashboard/dashboard.component';
import { SPProfileEditComponent } from './edit-profile/edit-profile.component';
import { SPNavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SPOrderEditComponent } from './order-edit/order-edit.component';
import { SPOrderListComponent } from './order-list/order-list.component';
import { SPOrderViewComponent } from './order-view/order-view.component';
import { SPPendingOrdersComponent } from './pending-orders/pending-orders.component';
import { SPProfileComponent } from './profile/profile.component';
import { SPSAPOrderListComponent } from './saporder-list/saporder-list.component';
import { SPSAPOrderViewComponent } from './saporder-view/saporder-view.component';
import { SPAsideComponent } from './SP-aside/SP-aside.component';
import { SPComponent } from './SP.component';
import { SPUserCreateComponent } from './user-create/user-create.component';
import { SPUserListComponent } from './user-list/user-list.component';
import { SPUserViewComponent } from './user-view/user-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '../component/alert.module';
import { CurrentLedgerComponent } from './current-ledger/current-ledger.component';
import { DateAdapter, MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatDatepickerModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatProgressSpinnerModule, MatRippleModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatToolbarModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { OrderResponseComponent } from './order-response/order-response.component';
import { BlockOrderListComponent } from './block-order-list/block-order-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { TokenInterceptor } from '../auth/token.interceptor';
import { PaginationService } from '../component/pagination/pagination.service';
import { UserService } from '../shared/user.service';
import { PasswordStrengthBarComponent } from './password-strength-bar/password-strength-bar.component';
import { ModalComponent } from '../component/SP_Model/modal.component';
import { BalanceConfirmationComponent } from './balance-confirmation/balance-confirmation.component';
import { BalanceConfirmationViewComponent } from './balance-confirmation-view/balance-confirmation-view.component';


@NgModule({
  declarations: [
    SPUserListComponent,
    SPUserViewComponent,
    BlockOrderListComponent ,
    SPUserCreateComponent,
    SPProfileComponent,
    SPNavigationBarComponent,
    SPAsideComponent,
    SPProfileEditComponent,
    SPDashboardComponent,
    SPComponent,
    SPCustomerListComponent,
    SPChangePasswordComponent,
    SPCreateOrderComponent,
    SPOrderEditComponent,
    SPOrderListComponent,
    SPOrderViewComponent,
    SPAllOrderViewComponent,
    SPSAPOrderListComponent,
    SPSAPOrderViewComponent,
    SPPendingOrdersComponent,
    CurrentLedgerComponent,
    OrderResponseComponent,
    PasswordStrengthBarComponent,
    BalanceConfirmationComponent,
    BalanceConfirmationViewComponent,
    ModalComponent,
  ],
  imports: [
    SPRoutingModule,
    MatSlideToggleModule,
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
export class SPModule { }
