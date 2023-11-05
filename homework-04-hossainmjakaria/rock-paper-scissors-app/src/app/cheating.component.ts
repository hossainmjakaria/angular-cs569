import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Choices } from './model';

@Component({
  selector: 'app-cheating',
  template: `
    <div>
      <h2> <button (click)="handleOption()">Reveal</button> computer choice</h2>
      <span *ngIf="showCheating">{{choiceAlias[computerChoice]}}</span>
    </div>
  `,
  styles: [
  ]
})
export class CheatingComponent {
  @Input() computerChoice!: Choices;
  choiceAlias = Choices;
  showCheating: boolean = false;

  @Output() clickOnCheatingOption = new EventEmitter<boolean>();

  handleOption() {
    this.showCheating = !this.showCheating;
    this.clickOnCheatingOption.emit(this.showCheating);
  }
}
