import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <a [routerLink]="['']">Home</a>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

}
