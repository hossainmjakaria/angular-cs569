import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-child-one></app-child-one>
    <app-child-two></app-child-two>
  `,
  styles: []
})
export class AppComponent {
  title = 'Question2 Demo';
}
