import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <a [routerLink]="['']">Breeds</a>
    <a [routerLink]="['','banned-breeds']">Banned Breeds</a>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {

}
