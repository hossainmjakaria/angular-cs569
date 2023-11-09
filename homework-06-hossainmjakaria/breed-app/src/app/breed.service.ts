import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BreedResponse } from './types';

@Injectable({
  providedIn: 'root'
})
export class BreedsService {

  constructor(private http: HttpClient) { }

  getBreeds() {
    return this.http.get<BreedResponse>('https://dog.ceo/api/breeds/list/all');
  }

  getSubBreeds(breed: string) {
    return this.http.get<BreedResponse>(`https://dog.ceo/api/breed/${breed}/list`);
  }

  getRandomImages(breed: string, subbreed?: string) {
    const url = subbreed ? `https://dog.ceo/api/breed/${breed}/${subbreed}/images/random/3` : `https://dog.ceo/api/breed/${breed}/images/random/3`;
    return this.http.get<BreedResponse>(url);
  }
}
