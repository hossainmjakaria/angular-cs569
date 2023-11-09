import { Component, OnInit, inject } from '@angular/core';
import { BannedBreedsService } from './banned-breeds.service';


@Component({
  selector: 'app-banned-breeds',
  template: `
    <h2>Banned Breeds</h2>
    <a *ngFor="let bannedBreed of bannedBreeds; trackBy:trackByFn" [routerLink]="['', 'sub-breeds',bannedBreed]" routerLinkActive="active"> {{bannedBreed}}</a>
  `
})
export class BannedBreedsComponent implements OnInit {
  bannedBreeds: string[] = [];
  #bannedBreedsService = inject(BannedBreedsService);

  ngOnInit() {
    this.bannedBreeds = this.#bannedBreedsService.getBannedBreeds()
  }

  trackByFn = (index: number, breed: string) => {
    return index;
  }
}