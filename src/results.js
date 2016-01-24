import {inject, useView} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {PollDetail} from './poll-detail';

@inject(HttpClient)
@useView('./poll-detail.html')
export class Results extends PollDetail {
  constructor(httpClient) {
    super(httpClient);
    this.resultsPage = true;
  }
}
