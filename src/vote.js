import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class Vote {
  selectedOption = -1;
  selectedOptions = [];

  constructor(httpClient, router) {
    this.http = httpClient;
    this.router = router;
  }

  activate(params) {
    this.pollId = params.pollid;
    this.token = params.token;
    return this.fetchPoll();
  }

  fetchPoll() {
    return this.http.fetch(`/polls/vote/${this.pollId}/${this.token}`)
      .then(response => response.json())
      .then(response => this.poll = response)
      .catch(response => {
        this.alert = 'Your token has expired. Have you already voted?'
      });
  }

  submitVote() {

    let body = {};

    switch (this.poll.method) {
      case 'single-choice':
        if (this.selectedOption < 0) {
          this.alert = 'Please select an option!';
          return;
        }
        body = {optionId: this.selectedOption};
        break;
      case 'multiple-choice':
        if (this.selectedOptions.length <= 0) {
          this.alert = 'Please select one or more options!';
          return;
        }
        body = {optionIds: this.selectedOptions};
        break;
    }

    this.http.fetch(`/polls/vote/${this.pollId}/${this.token}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(response => {
        if (response.ok) {
          this.router.navigateToRoute('voteCast');
        }
      });

  }
}
