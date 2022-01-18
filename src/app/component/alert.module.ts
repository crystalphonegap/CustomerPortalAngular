import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@NgModule({
    imports: [CommonModule,
      ToastrModule.forRoot()],
    declarations: [AlertComponent],
    exports: [AlertComponent],
    providers: [ { provide: ToastrService, useClass: ToastrService }]
})
export class AlertModule { }
