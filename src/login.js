import {inject} from 'aurelia-framework';
import {AuthService} from 'spoonx/aurelia-auth';

@inject(AuthService)
export class Login {
  constructor(authService) {
    this.auth = authService;
  }

  email;
  password;

  login() {
    this.auth.login(this.email, this.password);
  }
}
