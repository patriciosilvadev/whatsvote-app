import {inject} from 'aurelia-framework';
import {FetchConfig, AuthorizeStep} from 'spoonx/aurelia-auth';
import {HttpClient} from 'aurelia-fetch-client';

@inject(FetchConfig, HttpClient)
export class App {
  constructor(fetchConfig, http) {
    this.fetchConfig = fetchConfig;
    http.configure(config => {
      let baseUrl = (window.location.href.indexOf('localhost') > 0 ? 'http://localhost:3000' : 'http://api.whatsvote.leonadi.de');
      config
        .useStandardConfiguration()
        .withBaseUrl(baseUrl);
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
      {route: 'poll/new/:group', name: 'createPoll', moduleId: 'create-poll', auth: true, title: 'New Poll'},
      {route: 'vote/:pollid/:token', name: 'vote', moduleId: 'vote', title: 'Vote'},
      {route: 'vote/cast', name: 'voteCast', moduleId: 'vote-cast', title: 'Vote cast'},
      {route: 'polls', name: 'polls', moduleId: 'polls', title: 'Polls', auth: true, nav: true},
      {route: 'polls/:id', name: 'pollDetail', moduleId: 'poll-detail', auth: true},
      {route: 'results/:id', name: 'pollResults', moduleId: 'results'},
      {route: 'verifiyrequired', name: 'verifyRequired', moduleId: 'verify-required'},
      {route: 'verify/:user/:token', name: 'verify', moduleId: 'verify'}
    ]);

    this.router = router;
  }
}
