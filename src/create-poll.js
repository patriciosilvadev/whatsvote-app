import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class CreatePoll {
  question;
  description;
  method;
  newOption;
  options = [];
  groups = [];

  constructor(httpClient, router) {
    this.http = httpClient;
    this.router = router;
  }

  activate(params) {
    this.groupId = params.group;
    return this.fetchGroups();
  }

  fetchGroups() {
    return this.http.fetch(`/groups`)
      .then(response => response.json())
      .then(response => {
        for (let group of response.groups) {
          if (group.linked) this.groups.push(group);
        }
      });
  }

  addOption() {
    this.options.push({
      id: this.options.length,
      text: this.newOption
    });
    this.newOption = '';
  }

  deleteOption(id) {
    this.options.splice(id, 1);
    for (let optionIndex in this.options) {
      this.options[optionIndex].id = parseInt(optionIndex);
    }
  }

}
