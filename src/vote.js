import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class Vote {
  selectedOption = -1;

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
    if (this.selectedOption < 0) {
      this.alert = 'Please select an option!';
      return;
    }

    this.http.fetch(`/polls/vote/${this.pollId}/${this.token}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({optionId: this.selectedOption})
    })
      .then(response => response.json())
      .then(response => {
        if (response.ok) {
          this.router.navigateToRoute('voteCast');
        }
      });

  }
}
