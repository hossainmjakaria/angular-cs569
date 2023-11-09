import { Component, OnInit, inject } from '@angular/core';
import { BreedsService } from './breed.service';
import { BreedResponse } from './types';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BannedBreedsService } from './banned-breeds.service';

@Component({
  selector: 'app-sub-breed',
  template: `
    <h2>Sub Breeds</h2><button (click)="toggleBannedBreeds()"> {{!isBreedBanned ? 'Add to banned breeds': 'Remove from banned breeds'}}</button>
    <div>
       <a *ngFor="let subBreed of breeds; trackBy:trackByFn" [routerLink]="['','sub-breeds', breed, subBreed]" routerLinkActive="active"> {{subBreed}}</a>
    </div>
    <hr/>
    <div>
      <img *ngFor="let location of breedImages; trackBy:trackByFn" [src]="location" alt="Not Available">
    </div>

    <router-outlet></router-outlet>
  `
})
export class SubBreedsComponent implements OnInit {
  breed: string = '';
  breeds: string[] = [];
  breedImages: string[] = [];
  isBreedBanned: boolean = false;
  #breedsService = inject(BreedsService);
  #activatedRoute = inject(ActivatedRoute);
  #bannedBreedsService = inject(BannedBreedsService);

  constructor() {
    this.#activatedRoute.paramMap
      .subscribe((params: ParamMap) => {
        this.breed = params.get('breed') as string;
      });
  }

  ngOnInit() {
    this.#breedsService
      .getSubBreeds(this.breed)
      .subscribe((res: BreedResponse) => {
        this.breeds = res?.message as string[];
      });

    this.#breedsService
      .getRandomImages(this.breed)
      .subscribe((res: BreedResponse) => {
        this.breedImages = res?.message as string[];
      });
    this.isBreedBanned = this.isBanned();
  }

  trackByFn = (index: number, breed: string) => {
    return index;
  }

  toggleBannedBreeds() {
    this.#bannedBreedsService.toggleBanned(this.breed);
    this.isBreedBanned = this.isBanned();
  }

  isBanned(): boolean {
    return this.#bannedBreedsService.isBanned(this.breed);
  }
}
