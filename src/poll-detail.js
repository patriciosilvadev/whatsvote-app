import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class PollDetail {
  constructor(httpClient) {
    this.http = httpClient;
  }

  colors = [
    '#FF858A',
    '#64B8D0',
    '#B29784',
    '#856649',
    '#910F1B',
    '#6D0E54',
    '#C95314',
    '#C49958'
  ]

  activate(params, routeConfig) {
    this.pollId = params.id;
    return this.fetchPoll()
      .then(r => {
        routeConfig.navModel.title = this.poll.question;
      });
  }

  fetchPoll() {
    this.lastUpdated = new Date();
    return this.http.fetch((this.resultsPage ? '/results/' : '/polls/') + this.pollId)
      .then(response => response.json())
      .then(response => this.poll = response)
      .then(response => {
        this.poll.votesCast = 0;
        for (let option in this.poll.votes) {
          this.poll.votesCast += this.poll.votes[option].length;
        }

        this.poll.votesTotal = this.poll.votesCast + this.poll.tokens.length;

        return this.http.fetch(`/groups/${this.poll.groupId}`)
          .then(rp => rp.json())
          .then(rp => this.poll.group = rp)
          .catch(error => {
            if (error.status == 404) {
              this.poll.group = {name: 'deleted'};
            }
          });
      });
  }

  get chartData() {
    let data = [];
    for (let option of this.poll.options) {
      data.push({
        color: this.colors[option.id % this.colors.length],
        value: this.poll.votes[option.id.toString()].length,
        label: option.text
      });
    }
    return data;
  }
}
