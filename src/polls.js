import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Polls {
  constructor(httpClient) {
    this.http = httpClient;
  }

  activate() {
    return this.fetchPolls();
  }

  fetchPolls() {
    return this.http.fetch('/polls')
      .then(response => response.json())
      .then(response => this.polls = response.polls)
      .then(response => {
        for (let poll of this.polls) {
          console.log(poll);
          poll.votesCast = 0;
          for (let option in poll.votes) {
            poll.votesCast += poll.votes[option].length;
          }

          poll.votesTotal = poll.votesCast + poll.tokens.length;

          return this.http.fetch(`/groups/${poll.groupId}`)
            .then(rp => rp.json())
            .then(rp => poll.group = rp)
            .catch(error => {
              if (error.status == 404) {
                poll.group = {name: 'deleted'};
              }
            });
        }
      });
  }

  deletePoll(id) {
    return this.http.fetch(`/polls/${id}`, {
      method: 'delete'
    })
      .then(response => response.json())
      .then(response => {
        this.fetchPolls()
      });
  }
}
