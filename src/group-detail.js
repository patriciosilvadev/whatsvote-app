import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {AuthService} from 'spoonx/aurelia-auth';
import {Router} from 'aurelia-router';

@inject(HttpClient, AuthService, Router)
export class GroupDetail {
  alert = '';
  email = '';

  constructor(httpClient, authService, router) {
    this.http = httpClient;
    this.auth = authService;
    this.router = router;
  }

  activate(params, routeConfig) {
    this.groupId = params.id;
    return [this.fetchGroup()
      .then(() => {
        routeConfig.navModel.title = this.group.name
      }),
      this.auth.getMe().then(me => this.email = me.email)
    ];
  }

  fetchGroup(refreshparticipants) {
    return this.http.fetch(`/groups/${this.groupId}` + (refreshparticipants? '?refreshparticipants' : ''))
      .then(response => response.json())
      .then(response => {
        delete response.ok;
        this.group = response;
      });
  }

  deleteGroup() {
    return this.dialog.open({viewModel: DeletePrompt, model: this.group.name}).then(result => {
      if (result.wasCancelled) return;
      this.http.fetch(`/groups/${this.groupId}`, {
        method: 'delete'
      })
        .then(response => {
          this.router.navigateToRoute('groups');
        });
    });
  }

  createLink() {
    let link = this.newlink.match(/[^\r\n]+/g);
    if (!this.group.links) {
      this.group.links = [];
    }
    this.group.links.push(link);
    return this.http.fetch(`/groups/${this.groupId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.group)
    })
      .then(response => response.json())
      .then(response => {
        delete response.ok;
        this.group = response;
        this.newlink = '';
      })
      .catch(error => {
        this.alert = error.json().message;
      });
  }
}
