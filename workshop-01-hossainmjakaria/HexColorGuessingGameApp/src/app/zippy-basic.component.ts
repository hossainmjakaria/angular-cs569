import { Component } from '@angular/core';

@Component({
  selector: 'app-zippy-basic',
  template: `
     <h2>Multi-slot content projection</h2>

    Default:
    <ng-content></ng-content>

    Question:
    <ng-content select="[question]"></ng-content>
  `
})
export class ZippyBasicComponent { }