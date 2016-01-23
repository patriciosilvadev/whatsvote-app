import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthService} from 'spoonx/aurelia-auth';

@inject(Router, AuthService)
export class Welcome {
  constructor(router, authService) {
    this.router = router;
    this.auth = authService;

    if (this.auth.isAuthenticated()) {
      this.router.navigateToRoute('groups');
    }
  }
}
