import { Component, EventEmitter, Output } from '@angular/core';
import { Choices } from './model';

@Component({
  selector: 'app-buttons',
  template: `
    <div>
      <h2>Choose an option</h2>
      <button (click)="handleOption(choiceType.Rock)"> Rock </button>
      <button (click)="handleOption(choiceType.Paper)"> Paper </button>
      <button (click)="handleOption(choiceType.Scissors)"> Scissors </button>
    </div>
  `,
  styles: [
    `
      button {
        padding: 5px;
        min-width: 80px;
      }
    `
  ]
})
export class ButtonsComponent {
  @Output() clickOnUserOption = new EventEmitter<Choices>();

  choiceType = Choices;

  handleOption(choices: Choices) {
    this.clickOnUserOption.emit(choices);
  }
}
