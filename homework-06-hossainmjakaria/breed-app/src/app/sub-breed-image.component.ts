import { Component, OnInit, inject } from '@angular/core';
import { BreedsService } from './breed.service';
import { BreedResponse } from './types';
import { ActivatedRoute, NavigationStart, ParamMap, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sub-breed-image',
  template: `
    <hr/>
    <h2>Sub Breeds Images</h2>
    <div>
      <img *ngFor="let location of images; trackBy:trackByFn" [src]="location" alt="Not Available">
    </div>
  `
})
export class SubBreedImageComponent {
  breed: string = '';
  subBreed: string = '';
  images: string[] = [];
  #breedsService = inject(BreedsService);
  #activatedRoute = inject(ActivatedRoute);

  constructor(private router: Router) {
    this.#activatedRoute.parent?.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe((params: ParamMap) => {
        this.breed = params.get('breed') as string;
      });
    this.#activatedRoute.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe((params: ParamMap) => {
        this.subBreed = params.get('subbreed') as string;
      });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart)
    ).subscribe((event) => {
      this.#breedsService
        .getRandomImages(this.breed, this.subBreed)
        .subscribe((res: BreedResponse) => {
          this.images = res?.message as string[];
        });
    });
  }

  ngOnInit() {
    this.#breedsService
      .getRandomImages(this.breed, this.subBreed)
      .subscribe((res: BreedResponse) => {
        this.images = res?.message as string[];
      });
  }

  trackByFn = (index: number, breed: string) => {
    return index;
  }
}
