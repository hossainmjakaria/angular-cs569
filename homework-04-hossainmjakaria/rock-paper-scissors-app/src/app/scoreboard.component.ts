import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OverallResult } from './model';

@Component({
  selector: 'app-scoreboard',
  template: `
  <div>
    <h2>Scoreboard</h2>
    <span>Wins {{result.winCount}} - Losses {{result.lossCount}} - Ties {{result.tieCount}}</span>
  </div>

  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreboardComponent {
  @Input('result') result!: OverallResult;

}
