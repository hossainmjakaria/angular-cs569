import { Component, Input } from '@angular/core';
import { Result } from './model';

@Component({
  selector: 'app-list',
  template: `
  <app-card *ngFor="let item of items;trackBy:trackByFn" [item]="item"></app-card>
  `,
})
export class ListComponent {
  @Input('list') items: Result[] = [];
  trackByFn = (index: number, item: Result) => { return index; }
}
