
 import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';

 export class StoreValue {
    constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService) {

    }

    saveInLocal(key, val): void {
        this.storage.set(key, val);
       }

       getFromLocal(key): void {
         return  this.storage.get(key);
       }
}