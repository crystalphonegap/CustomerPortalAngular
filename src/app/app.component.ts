import { AlertComponent } from './component';
import { interval, Subscription } from 'rxjs';
// Angular
import { ApplicationRef, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { DatePipe } from '@angular/common';

@Component({ selector: 'app', styleUrls: ['./app.component.css'], templateUrl: 'app.component.html',
animations: [
    trigger('myAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [style({ opacity: 0 })],
          { optional: true }
        ),
        query(
          ':leave',
           [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
          { optional: true }
        ),
        query(
          ':enter',
          [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))],
          { optional: true }
        )
      ])
    ]),

      ]

})
export class AppComponent  {
  updateChecked = false;
  updateAvailable = false;
  angularUpdatedDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  // In your template, use this value to show a loading indicator while we are
  // waiting for updates. (You can also use it to hide the rest of the UI if
  // you want to prevent the old version from being used.)
  get waitingForUpdates() {
    return !this.updateChecked || this.updateAvailable;
  }

  constructor(private updates: SwUpdate, public datePipe: DatePipe)  {}

  async ngOnInit() {

    let date = this.datePipe.transform(new Date(localStorage.getItem("angularUpdatedDate")), 'yyyy-MM-dd');
    if(localStorage.getItem("angularUpdatedDate")==null || localStorage.getItem("angularUpdatedDate")==''  ){
      localStorage.setItem("angularUpdatedDate",String(new Date()) );
      window.location.reload();
    }else if(date != this.angularUpdatedDate )
    { localStorage.setItem("angularUpdatedDate",String(new Date()) );
    window.location.reload();

    }


    this.updates.available.subscribe(() => {
      // Keep the loading indicator active while we reload the page
      this.updateAvailable = true;
      window.location.reload();
    });
    if (this.updates.isEnabled) {
      // This promise will return when the update check is completed,
      // and if an update is available, it will also wait for the update
      // to be downloaded (at which point it calls our callback above and
      // we just need to reload the page to apply it).
      await this.updates.checkForUpdate();
    } else {
      console.log('Service worker updates are disabled.');
    }
    // The update check is done (or service workers are disabled), now
    // we can take the loading indicator down (unless we need to apply an
    // update, but in that case, we have already set this.updateAvailable
    // to true by this point, which keeps the loading indicator active).
    this.updateChecked = true;
  }
}
