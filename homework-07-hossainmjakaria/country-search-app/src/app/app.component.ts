import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CountryService } from './country.service';
import { Country } from './types';

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="searchForm" (ngSubmit)="search()">
      <div>
      <label for="countryName">Country Name</label>&nbsp;
      <input  formControlName="countryName" placeholder="Country Name"/>
        <div  *ngIf="countryName?.invalid && (countryName?.dirty || countryName?.touched)"  class="alert alert-danger">
        <div *ngIf="countryName?.errors?.['required']">Country name is required.</div>
        <div *ngIf="countryName?.errors?.['minlength']">
          Country name must be at least 4 characters long.
        </div>
        <div *ngIf="countryName?.errors?.['bannedKey']">
          Country name cannot be in the banned list
        </div>
    </div>
      </div>
      <br/>
      <div>
        <input type="checkbox" formControlName="name" /> 
        <label for="name">name</label>

        <input type="checkbox" formControlName="capital" />
        <label for="capital">capital</label>

        <input type="checkbox" formControlName="region" />
        <label for="region">region</label>

        <input type="checkbox" formControlName="subregion" />
        <label for="subregion">subregion</label>

        <input type="checkbox" formControlName="languages" /> 
        <label for="languages">languages</label>

        <input type="checkbox" formControlName="population" />
        <label for="population">population</label>

        <input type="checkbox" formControlName="timezones" /> 
        <label for="timezones">timezones</label>

        <input type="checkbox" formControlName="flags" />
        <label for="flags">flags</label>

        <input type="checkbox" formControlName="maps" />
        <label for="maps">maps</label>
      </div>
     <br/>
      <div><button type="submit" [disabled]="!searchForm.valid">Search</button></div>
    </form>

    <hr />

    <ng-container *ngIf="countryInfo$ | async; let countryInfo">
      Country information: {{ countryInfo | json }}
    </ng-container>    
  `,
  styles: []
})
export class AppComponent {
  #countryService = inject(CountryService);
  countryInfo$!: Observable<Country[]>;

  searchForm = inject(FormBuilder).nonNullable.group({
    countryName: ['', Validators.compose([Validators.required, Validators.minLength(3), this.myCustomValidator.bind(this)])],
    name: true,
    capital: true,
    region: true,
    subregion: true,
    languages: true,
    population: true,
    timezones: true,
    flags: true,
    maps: true,
  });

  get countryName() {
    return this.searchForm.get('countryName');
  }

  search = () => {
    const fields = Object.entries(this.searchForm.value)
      .filter(([key, value]) => value)
      .map(([key, value]) => key)
      .join(',')
    this.countryInfo$ = this.#countryService.getCountries((this.searchForm.value.countryName as string), fields)
  }

  myCustomValidator(control: AbstractControl): { [s: string]: boolean } | null {
    return this.#countryService.validateCountryName(control.value);
  }
}
