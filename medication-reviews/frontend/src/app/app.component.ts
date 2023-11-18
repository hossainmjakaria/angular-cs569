import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-header/>
      <router-outlet/>
      <ng-confirm></ng-confirm>
      <app-footer/>
    </div>
  `,
  styles: []
})
export class AppComponent {

}
