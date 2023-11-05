import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { GameHistory } from './model';

@Component({
  selector: 'app-history',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <h2>History</h2>
      <table>
        <thead>
          <tr class="table-header">
            <td>You</td>
            <td>Computer</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let history of histories; trackBy:trackByFn">
            <td>{{history?.human}}</td>
            <td>{{history?.computer}}</td>
            <td>{{history?.result}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
    table{
      margin-left: auto; 
      margin-right: auto;
      border: 1px solid lightgray;
    }

    .table-header{
      background-color: lightgray;
      font-weight: bold;
    }
    table tr{
      border: 1px solid lightgray;
    }
    `
  ]
})
export class HistoryComponent {
  @Input() histories: GameHistory[] = [];

  trackByFn = (index: number, history: GameHistory) => index;
}
