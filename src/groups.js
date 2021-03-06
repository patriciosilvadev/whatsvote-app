import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {DialogService} from 'aurelia-dialog';
import {DeletePrompt} from './delete-prompt';

@inject(HttpClient, DialogService)
export class Groups{
  groups = [];

  constructor(http, dialogService) {
    this.http = http;
    this.dialog = dialogService;
  }

  fetchGroups() {
    return this.http.fetch('/groups')
      .then(response => response.json())
      .then(response => this.groups = response.groups || []);
  }

  activate() {
    return this.fetchGroups();
  }

  groupName;

  createGroup() {
    this.http.fetch('/groups', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.groupName
      })
    })
      .then(response => response.json())
      .then(response => {
        delete response.ok;
        this.groups.push(response);
        this.groupName = '';
      });
  }

  deleteGroup(group) {
    return this.dialog.open({viewModel: DeletePrompt, model: group.name}).then(result => {
      if(result.wasCancelled) return;
      this.http.fetch(`/groups/${group.id}`, {
        method: 'delete'
      })
        .then(response => response.json())
        .then(response => {
          this.fetchGroups();
        });
    });
  }
}
