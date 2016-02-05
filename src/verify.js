import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient , Router)
export class Verify {
  constructor(httpClient, router) {
    this.http = httpClient;
    this.router = router;
  }

  activate(params) {
    return this.http.fetch(`/auth/verify/${params.user}/${params.token}`, {
      method: 'post'
    })
      .then(response => {
        this.router.navigateToRoute('login');
      })
      .catch(respone => {});
  }
}
