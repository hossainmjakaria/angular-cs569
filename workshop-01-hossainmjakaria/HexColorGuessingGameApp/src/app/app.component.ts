import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { GameHistory, GameResult } from './model';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <h1>Hex Color Guessing Game</h1>
    <div>wins: {{gameResult.winCount}} losses: {{gameResult.lossCount}}</div>
    
    <div [cheat]="computerColor" [ngStyle]="{'background-color': computerColor, 'height':'200px', 'width':'200px'}" ></div>
    
    <div>
        <button *ngFor="let btn of buttonsColor;trackBy:trackByFn" #button (click)= "go(btn)"> {{btn}} </button>
    </div>
    <button (click)="reset()">Reset</button>
    <div> computer | human | wins | losses</div> 
    <div *ngFor="let history of histories; even as isEven">
      <span [ngStyle]="{'background-color': isEven ? '#ccc': '#fff'}"> {{history.computer}} | {{history.human}} | {{history.wins}} | {{history.losses}}</span>
    </div>
  </div>

  <app-zippy-basic>
    <p>Is content projection cool?</p>
    <p>Is content projection cool?</p>
    <p>Is content projection cool q?</p>
    <p question>Is content projection cool q?</p>
    <p question>Is content projection cool q?</p>      
    <p>Is content projection cool?</p>
    <p>Is content projection cool?</p>
    <div>Test</div>
  </app-zippy-basic>
  `,
  styles: [
    `
    div{
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      padding:5px
    }
    `
  ]
})
export class AppComponent {
  @ViewChildren('button') buttons!: QueryList<ElementRef>;
  gameResult: GameResult = { winCount: 0, lossCount: 0 };
  histories: GameHistory[] = [];
  buttonsColor!: string[];
  computerColor!: string;

  ngOnInit() {
    this.#getRandomColors();
    const storage = localStorage.getItem("HEX");
    if (storage) {
      this.histories = JSON.parse(storage);
      const lastItem = this.histories.at(-1);
      this.gameResult = { winCount: lastItem?.wins as number, lossCount: lastItem?.losses as number }
    }
  }

  #getRandomColors() {
    this.buttonsColor = [
      this.#generateRandomHexColor(),
      this.#generateRandomHexColor(),
      this.#generateRandomHexColor()
    ];
    this.computerColor = this.#getRandomItemFromArray(this.buttonsColor);
  }

  go(playerSelectedColor: string) {
    if (playerSelectedColor === this.computerColor) this.gameResult.winCount++
    else this.gameResult.lossCount++;

    let history = {
      computer: this.computerColor,
      human: playerSelectedColor,
      wins: this.gameResult.winCount,
      losses: this.gameResult.lossCount
    };

    this.histories.push(history);
    localStorage.setItem("HEX", JSON.stringify(this.histories));
    this.#getRandomColors();
    if (this.gameResult.winCount >= 2)
      this.buttons.forEach((button: ElementRef<HTMLButtonElement>) => {
        button.nativeElement.disabled = true;
      });
  }

  reset() {
    this.histories = [];
    this.gameResult = { lossCount: 0, winCount: 0 };
    localStorage.clear();
    this.buttons.forEach((button: ElementRef<HTMLButtonElement>) => {
      button.nativeElement.disabled = false;
    });
  }

  #generateRandomHexColor(): string {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
  }

  #getRandomItemFromArray(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  trackByFn(index: number, item: string) {
    return index;
  }
}
