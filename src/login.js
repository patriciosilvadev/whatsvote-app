import {inject} from 'aurelia-framework';
import {AuthService} from 'spoonx/aurelia-auth';

@inject(AuthService)
export class Login {
  constructor(authService) {
    this.auth = authService;
  }

  alert;

  email;
  password;

  login() {
    this.auth.login(this.email, this.password)
      .catch(error => {
        console.log(error);
        this.alert = 'Invalid email or password.'
      });
  }
}
