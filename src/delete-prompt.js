import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)
export class DeletePrompt {
  constructor(dialogController) {
    this.controller = dialogController;
  }

  activate(name) {
    this.name = name;
  }
}
