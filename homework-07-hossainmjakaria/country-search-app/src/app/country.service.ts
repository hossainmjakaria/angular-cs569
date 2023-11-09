import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Country } from './types';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  #bannedStrings: string[] = ['word1', 'word2', 'word3'];
  #http = inject(HttpClient);

  getCountries = (countryName: string, fields: string) => {
    const url = `https://restcountries.com/v3.1/name/${countryName}?fields=${fields}`;
    return this.#http.get<Country[]>(url);
  }

  validateCountryName(searchString: string | null | undefined): { [s: string]: boolean } | null {
    if (this.#bannedStrings.some((element) => element === searchString)) {
      return { bannedKey: true };
    }
    return null;
  }
}