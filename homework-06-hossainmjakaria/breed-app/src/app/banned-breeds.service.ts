import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannedBreedsService {
  private bannedBreeds: string[] = [];

  constructor() {
    const bannedBreedsJson = localStorage.getItem('bannedBreeds');
    if (bannedBreedsJson) {
      this.bannedBreeds = JSON.parse(bannedBreedsJson);
    }
  }

  isBanned(breedName: string): boolean {
    return this.bannedBreeds.includes(breedName);
  }

  toggleBanned(breedName: string) {
    if (this.isBanned(breedName)) {
      this.bannedBreeds = this.bannedBreeds.filter((name) => name !== breedName);
    }
    else {
      this.bannedBreeds.push(breedName);
    }

    localStorage.setItem('bannedBreeds', JSON.stringify(this.bannedBreeds));
  }

  getBannedBreeds() {
    const bannedBreedsJson = localStorage.getItem('bannedBreeds');
    if (bannedBreedsJson) {
      this.bannedBreeds = JSON.parse(bannedBreedsJson);
    }
    return this.bannedBreeds;
  }
}