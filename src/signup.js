import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class Login {
  constructor(httpClient, router) {
    this.http = httpClient;
    this.router = router;
  }
  firstname;
  lastname;
  email;
  password;
  passwordcheck;
  alert = '';

  signup() {
    if(!this.firstname || !this.lastname) {
      this.alert = 'Please enter your name';
      return;
    }

    if(!this.email) {
      this.alert = 'Please enter a valid email address';
      return;
    }

    if(!this.password || this.password.length < 6) {
      this.alert = 'Please enter a password with a minimum of 6 characters';
      return;
    }

    if(this.password !== this.passwordcheck) {
      this.alert = 'The password dont match';
      return;
    }

    this.http.fetch('/auth/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      })
    })
      .then(response => {
        this.router.navigateToRoute('verifyRequired');
      })
      .catch(response => response.json())
      .then(response => {
        if (response.message) {
          this.alert = response.message;
          return;
        }
        this.alert = 'An error occured. Please check your inputs and try again.'
      });
  }
}
