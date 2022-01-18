import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  promptEvent: any;
  
  constructor(private swUpdate: SwUpdate) {
    swUpdate.available.subscribe(event => {
      swUpdate.activateUpdate().then(() => document.location.reload());
      /* if (this.askUserToUpdate()) {
        window.location.reload();
      } */
    });
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
  }

  askUserToUpdate() {
    return confirm('There is an update');
  }

}