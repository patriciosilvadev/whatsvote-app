import {inject, bindable} from 'aurelia-framework';
import {AuthService} from 'spoonx/aurelia-auth';

@inject(AuthService)
export class NavBar {
  @bindable router = null;
  me;

  constructor(authService) {
    this.auth = authService;
  }

  created() {
    this.updateMe();
  }

  updateMe() {
    if (this.isAuthenticated && !this.me) {
      return this.auth.getMe().then(me => {
        this.me = me;
      });
    }
  }

  get isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  get fullName() {
    this.updateMe()
    if (this.me)
      return `${this.me.firstname} ${this.me.lastname}`;
  }

  logOut() {
    this.me = null;
    this.auth.logout('#/welcome');
  }
}
