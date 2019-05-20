import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ActionButton } from './action-button';

@Component({
  selector: 'tt-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.css']
})
export class ActionButtonsComponent implements ICellRendererAngularComp {
  buttons: ActionButton[] = [];
  public params: any;

  constructor() { }

  agInit(params: any): void {
    this.params = params;
    this.buttons = this.params.context.buttons;
  }

  isDisplayedAction(showActions, buttonName): boolean {
    let returnValue = false;
    const hidedActionsArray = showActions.split(',');

    hidedActionsArray.forEach(element => {
      if (element === buttonName) {
        returnValue = true;
      }
    });

    return returnValue;
  }

  refresh(params: any): boolean {
    return true;
  }
}
