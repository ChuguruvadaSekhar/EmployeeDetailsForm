import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  // We will use this property to show or hide
  // the loading indicatior

  showLoadingIndicator = true;

  constructor(private router: Router) {

    // subscribe to the router events observable
    this.router.events.subscribe((routerEvent: Event) => {

      // On NavigationStart, set show LoadingIndicator to true

      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }

      // On NavigationEnd or NavigationError or NavigationCancel
      // set  showLoadingIndicator to false

      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationError ||
        routerEvent instanceof NavigationCancel) {
        this.showLoadingIndicator = false;
      }
    });
  }
}
