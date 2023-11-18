import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  template: `
    <div class="rating">
      <span *ngFor="let star of stars; let i = index" (click)="onRatingChange(i + 1)">
        {{ i < rating ? '★' : '☆' }}
      </span>
    </div>
  `,
  styles: [
    `
      .rating {
        font-size: 15px;
        padding: 5px 10px 0 5px;
      }
      .rating span {
        cursor: pointer; 
      }

      .rating span:hover {
        color: orange; 
      }
    `
  ]
})
export class RatingComponent {
  @Input() rating!: number;
  @Input() readOnly: boolean = false;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();
  stars: number[] = [1, 2, 3, 4, 5];

  onRatingChange(value: number): void {
    if (!this.readOnly) {
      this.rating = value;
      this.ratingChange.emit(this.rating);
    }
  }

  trackByFn = (index: number, star: number) => { return index; }
}
