import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Root } from './model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: string = "https://randomuser.me/api/?results=10";
  #httpClient: HttpClient = inject(HttpClient);

  getData() {
    return this.#httpClient.get<Root>(this.url);
  }
}
