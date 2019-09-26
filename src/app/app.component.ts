import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_core/services';
import { User } from './_core/models';
import { TranslateService } from '@ngx-translate/core';
import { from } from 'rxjs';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public translate: TranslateService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    translate.addLangs(['en', 'it']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|it/) ? browserLang : 'en');
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
