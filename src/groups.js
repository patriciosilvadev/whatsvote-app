import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Groups{
  groups = [];

  constructor(http) {
    this.http = http;
  }

  fetchGroups() {
    return this.http.fetch('/groups')
      .then(response => response.json())
      .then(response => this.groups = response.groups);
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

  deleteGroup(id) {
    this.http.fetch(`/groups/${id}`, {
      method: 'delete'
    })
      .then(response => response.json())
      .then(response => {
        this.fetchGroups();
      })
  }
}
