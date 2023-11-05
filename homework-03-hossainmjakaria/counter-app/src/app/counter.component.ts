import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <p class="child-container">
      Counter Component
      <button (click)="decrease()"> - </button>
      <span> {{count}} </span>
      <button (click)="increase()"> + </button>
    </p>
  `,
  styles: [
    `
    .child-container{
      border: 1px solid #ed7d31; 
      margin: 10px;
      padding: 10px;
    }
    `
  ]
})
export class CounterComponent {
  @Input('count') count: number = 0;
  @Output() countChange = new EventEmitter<number>();

  decrease = () => {
    this.count--;
    this.countChange.emit(this.count);
  }

  increase = () => {
    this.count++
    this.countChange.emit(this.count);
  }
}
