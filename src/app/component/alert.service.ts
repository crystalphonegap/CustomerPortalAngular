import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from './alert';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<Alert>();
    private defaultId = 'default-alert';
    constructor(private toastr: ToastrService) {}
    // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<Alert> {

        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    // convenience methods
    success(message: string, options?: any) {
        this.clear();
        this.alert(new Alert({ ...options, type: AlertType.Success, message }));
        this.toastr.success(message);
        window.scroll(0,0);
    }

    error(message: string, options?: any) {
        this.clear();
        this.alert(new Alert({ ...options, type: AlertType.Error, message }));
        this.toastr.error(message);
        window.scroll(0,0);
    }

    info(message: string, options?: any) {
        this.clear();
        this.toastr.info(message);
        this.alert(new Alert({ ...options, type: AlertType.Info, message }));
        window.scroll(0,0);
    }

    warn(message: string, options?: any) {
        this.clear();
        this.toastr.warning(message);
        this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
        window.scroll(0,0);
    }

    // main alert method
    alert(alert: Alert) {
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    // clear alerts
    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id }));
    }
}
