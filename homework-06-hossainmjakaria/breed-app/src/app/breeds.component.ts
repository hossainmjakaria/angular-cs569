import { Component, OnInit, inject } from '@angular/core';
import { BreedsService } from './breed.service';
import { BreedResponse } from './types';


@Component({
  selector: 'app-breeds',
  template: `
    <h2>Breeds</h2> 
    <a [routerLink]="['', 'sub-breeds', breed]" routerLinkActive="active" *ngFor="let breed of breeds; trackBy:trackByFn" > {{breed}}</a>
  `
})
export class BreedsComponent implements OnInit {
  breeds: string[] = [];
  #breedsService = inject(BreedsService);

  ngOnInit() {
    this.#breedsService
      .getBreeds()
      .subscribe((res: BreedResponse) => {
        this.breeds = Object.keys(res?.message);
      });
  }

  trackByFn = (index: number, breed: string) => {
    return index;
  }
}