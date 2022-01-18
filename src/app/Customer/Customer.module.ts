// Angular
import {  NgModule } from '@angular/core';
import {  MatRippleModule, MatInputModule, MatFormFieldModule, DateAdapter, MatButtonToggleModule, MatDatepickerModule, MatExpansionModule, MatMenuModule, MatNativeDateModule, MatProgressSpinnerModule, MatSliderModule, MatSlideToggleModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatRadioModule} from '@angular/material';

import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { TokenInterceptor } from '../auth/token.interceptor';
import { AlertModule } from '../component/alert.module';
import { PaginationService } from '../component/pagination/pagination.service';
import { UserService } from '../shared/user.service';
import { CustomerAccountStatementComponent } from './account-statement/account-statement.component';
import { CustomerChangePasswordComponent } from './change-password/change-password.component';
import { CustomerCreateOrderComponent } from './create-order/create-order.component';
import { CustomerAsideComponent } from './customer-aside/customer-aside.component';
import { CustomerBalanceConfirmationComponent } from './customer-balance-confirmation/customer-balance-confirmation.component';
import { CustomerFloatDataComponent } from './customer-float-data/customer-float-data.component';
import { CustomerMenuComponent } from './customer-menu/customer-menu.component';
import { CustomerComponent } from './Customer.component';
import { CustomerDashboardComponent } from './dashboard/dashboard.component';
import { CustomerDispatchOrderDetailComponent } from './DispatchOrder-detail/DispatchOrder-detail.component';
import { CustomerProfileEditComponent } from './edit-profile/edit-profile.component';
import { CustomerInvoiceDetailComponent } from './Invoice-detail/Invoice-detail.component';
import { CustomerInvoiceViewComponent } from './Invoice-view/Invoice-view.component';
import { CustomerOrderEditComponent } from './order-edit/order-edit.component';
import { CustomerOrderListComponent } from './order-list/order-list.component';
import { CustomerOutStandingComponent } from './out-standing/out-standing.component';
import { CustomerProfileComponent } from './profile/profile.component';
import { CustomerRetailOrderDetailComponent } from './retail-order-detail/retail-order-detail.component';
import { CustomerRetailOrderEditComponent } from './retail-order-edit/retail-order-edit.component';
import { CustomerRetailOrderViewComponent } from './retail-order-view/retail-order-view.component';
import { CustomerSalesOrderViewComponent } from './Sales-order-view/Sales-order-view.component';
import { CustomerSalesOrderDetailComponent } from './SalesOrder-detail/SalesOrder-detail.component';
import { CustomerUserCreateComponent } from './user-create/user-create.component';
import { CustomerUserListComponent } from './user-list/user-list.component';
import { CustomerUserViewComponent } from './user-view/user-view.component';
import { CustomerRoutingModule } from './Customer-routing.module';
import { CustomerOrderViewComponent } from './order-view/order-view.component';
import { ContainComponent } from '../component/contain/contain.component';
import { CustomerDispatchOrderViewComponent } from './dispatch-order-view/dispatch-order-view.component';
import { CustomerCurrentLedgerComponent } from './current-ledger/current-ledger.component';
import { HistoryComponent } from './history/history.component';
import { CustomerBalanceConfirmationViewComponent } from './customer-balance-confirmation-view/customer-balance-confirmation-view.component';
import { RetailerListComponent } from './retailer-list/retailer-list.component';
import { ModalComponent } from '../component/dialog-box/modal.component';
import { CustomerCreateTicketComponent } from './customer-create-ticket/customer-create-ticket.component';
import { PasswordStrengthBarComponent } from './password-strength-bar/password-strength-bar.component';
import { CustomerTicketListComponent } from './customer-ticket-list/customer-ticket-list.component';
import { CustomerTicketViewComponent } from './customer-ticket-view/customer-ticket-view.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { MaterialTestCertificateListComponent } from './material-test-certificate-list/material-test-certificate-list.component';
import { MaterailTestCertificateDetailComponent } from './materail-test-certificate-detail/materail-test-certificate-detail.component';
import { EventImageUploadComponent } from './event-image-upload/event-image-upload.component';

@NgModule({
  declarations: [
    ModalComponent,
    CustomerComponent,
    CustomerInvoiceDetailComponent,
    CustomerDashboardComponent,
    CustomerProfileEditComponent,
    CustomerProfileComponent,
    CustomerSalesOrderDetailComponent,
    CustomerCreateOrderComponent,
    CustomerDispatchOrderDetailComponent,
    CustomerOrderListComponent,
    CustomerUserCreateComponent,
    CustomerUserViewComponent,
    CustomerInvoiceViewComponent,
    CustomerSalesOrderViewComponent,
    CustomerOrderEditComponent,
    CustomerFloatDataComponent,
    CustomerOutStandingComponent,
    CustomerAsideComponent,
    CustomerMenuComponent,
    CustomerUserListComponent,
    CustomerAccountStatementComponent,
    CustomerRetailOrderDetailComponent,
    CustomerRetailOrderViewComponent,
    CustomerRetailOrderEditComponent,
    CustomerChangePasswordComponent,
    CustomerOrderViewComponent ,
    CustomerBalanceConfirmationComponent,
    ContainComponent,
    CustomerDispatchOrderViewComponent,
    CustomerCurrentLedgerComponent,
    HistoryComponent,
    CustomerBalanceConfirmationViewComponent,
    RetailerListComponent,
    CustomerCreateTicketComponent,
    PasswordStrengthBarComponent,
    CustomerTicketListComponent,
    CustomerTicketViewComponent,
    ImageViewerComponent,
    MaterialTestCertificateListComponent,
    MaterailTestCertificateDetailComponent,
    EventImageUploadComponent,
  ],
  imports: [
    MatSlideToggleModule,
    MatButtonToggleModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AlertModule,
    MatRadioModule,
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
export class CustomerModule {}
