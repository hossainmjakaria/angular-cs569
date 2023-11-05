import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="parent-container">
    App Component <span></span>
    <app-counter [count]="initialValue" (countChange)="handleChange($event)" />
    <span>Component Counter Value = {{countedValue}}</span>
  </div>

  <div #header>Hello</div>
  `,
  styles: [`
    .parent-container{
      border: 1px solid #70ad47; 
      margin: 10px;
      padding: 10px;
    }
    .parent-container p{
      margin: 10px;
    }
  `]
})
export class AppComponent {
  initialValue: number = 5;
  countedValue: number = this.initialValue;

  @ViewChild('header') header!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    console.log(this.header);
  }

  handleChange(value: number) {
    this.countedValue = value;
  }
}
