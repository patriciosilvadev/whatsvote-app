import {inject} from 'aurelia-framework';
import {FetchConfig, AuthorizeStep} from 'spoonx/aurelia-auth';
import {HttpClient} from 'aurelia-fetch-client';

@inject(FetchConfig, HttpClient)
export class App {
  constructor(fetchConfig, http) {
    this.fetchConfig = fetchConfig;
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:3000');
    });
  }

  activate() {
    this.fetchConfig.configure();
  }

  configureRouter(config, router) {
    config.title = 'WhatsVote';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      { route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'Welcome' },
      {route: 'login', name: 'login', moduleId: 'login', title: 'Login'},
      {route: 'signup', name: 'signup', moduleId: 'signup', title: 'Signup'},
      {route: 'groups', name: 'groups', moduleId: 'groups', nav: true, title: 'Groups', auth: true},
      {route: 'groups/:id', name: 'groupDetail', moduleId: 'group-detail', auth: true},
      {route: 'poll/new/:group', name: 'createPoll', moduleId: 'create-poll', auth: true, title: 'New Poll'}
    ]);

    this.router = router;
  }
}
