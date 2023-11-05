import { Component } from '@angular/core';
import { Choices, GameHistory, OverallResult } from './model'; './model.ts'

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <h1>Rock Paper Scissors Game</h1>
    <app-scoreboard [result]="overallResult"/>
    <app-buttons (clickOnUserOption)="handleUserOption($event)" />
    <app-cheating [computerChoice] = "computerChoice" (clickOnCheatingOption)="handleCheatingOption($event)"/>
    <app-history [histories]="histories"/>
  </div>  
  `,
  styles: [
    `
    .container{
      text-align: center;
    }
    `
  ]
})
export class AppComponent {
  overallResult: OverallResult = { winCount: 0, lossCount: 0, tieCount: 0, computerChoice: '' };
  histories: GameHistory[] = [];
  computerChoice!: Choices;
  choicesAlias = Choices;
  cheated: boolean = false;

  handleUserOption = (choice: Choices) => {
    if (!this.cheated) {
      this.computerChoice = this.computerPick();
      this.compare(choice, this.computerChoice);
    }
    else {
      this.compare(choice, this.computerChoice);
    }
  }

  handleCheatingOption = (flag: boolean) => {
    this.cheated = flag;
    if (this.cheated) this.computerChoice = this.computerPick();
  }

  computerPick = (): number => {
    let random = (Math.floor(Math.random() * 10)) % 3;
    return random;
  }

  compare = (playerChoice: Choices, computerChoice: Choices) => {

    this.overallResult.computerChoice = this.choicesAlias[computerChoice];
    this.overallResult = { ...this.overallResult };

    //Checking for a tie
    if (playerChoice === computerChoice) {
      this.overallResult.tieCount++;
      this.histories = [...this.histories, { human: this.choicesAlias[playerChoice], computer: this.choicesAlias[computerChoice], result: "Tie" }];
      this.overallResult = { ...this.overallResult };
      return;
    }

    //Check for Rock
    if (playerChoice === Choices.Rock) {
      if (computerChoice === Choices.Scissors) {
        this.overallResult.winCount++;
        this.histories = [...this.histories, { human: this.choicesAlias[playerChoice], computer: this.choicesAlias[computerChoice], result: "Won" }];
      } else {
        this.overallResult.lossCount++;
        this.histories = [...this.histories, { human: this.choicesAlias[playerChoice], computer: this.choicesAlias[computerChoice], result: "Lost" }];
      }
      this.overallResult = { ...this.overallResult };
      return;
    }

    //Check for Paper
    if (playerChoice === Choices.Paper) {
      if (computerChoice === Choices.Scissors) {
        this.overallResult.lossCount++;
        this.histories = [...this.histories, { human: this.choicesAlias[playerChoice], computer: this.choicesAlias[computerChoice], result: "Lost" }];
      } else {
        this.overallResult.winCount++;
        this.histories = [...this.histories, { human: this.choicesAlias[playerChoice], computer: this.choicesAlias[computerChoice], result: "Won" }];
      }
      this.overallResult = { ...this.overallResult };
      return;
    }

    //Check for Scissors
    if (playerChoice === Choices.Scissors) {
      if (computerChoice === Choices.Rock) {
        this.overallResult.lossCount++;
        this.histories = [...this.histories, { human: this.choicesAlias[playerChoice], computer: this.choicesAlias[computerChoice], result: "Lost" }];
      } else {
        this.overallResult.winCount++;
        this.histories = [...this.histories, { human: this.choicesAlias[playerChoice], computer: this.choicesAlias[computerChoice], result: "Won" }];
      }
      this.overallResult = { ...this.overallResult };
      return;
    }
  }
}