import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {DialogService} from 'aurelia-dialog';
import {DeletePrompt} from './delete-prompt';

@inject(HttpClient, DialogService)
export class Polls {
  constructor(httpClient, dialogService) {
    this.http = httpClient;
    this.dialog = dialogService;
  }

  activate() {
    return this.fetchPolls();
  }

  fetchPolls() {
    return this.http.fetch('/polls')
      .then(response => response.json())
      .then(response => this.polls = response.polls.reverse())
      .then(response => {
        let promises = []
        for (let poll of this.polls) {
          poll.votesCast = 0;
          for (let option in poll.votes) {
            poll.votesCast += poll.votes[option].length;
          }

          poll.votesTotal = poll.votesCast + poll.tokens.length;

          promises.push(this.http.fetch(`/groups/${poll.groupId}`)
            .then(rp => rp.json())
            .then(rp => poll.group = rp)
            .catch(error => {
              if (error.status == 404) {
                poll.group = {name: 'deleted'};
              }
            }));
        }
        return promises;
      });
  }

  deletePoll(poll) {
    return this.dialog.open({viewModel: DeletePrompt, model: poll.question}).then(result => {
      if(!result.wasCancelled) {
        return this.http.fetch(`/polls/${poll.id}`, {
          method: 'delete'
        })
          .then(response => response.json())
          .then(response => {
            this.fetchPolls()
          });
      }
    });
  }
}
