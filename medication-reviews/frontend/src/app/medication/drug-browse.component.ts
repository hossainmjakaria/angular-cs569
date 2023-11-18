import { Component, Input, inject } from '@angular/core';
import { IResponse, LETTER_SET, Medication, Review } from '../models/types.model';
import { MedicationService } from '../services/medication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-drug-browse',
  template: `
    <h4>Browse A-Z</h4>

    <a *ngFor="let letter of letters; index as i;trackBy:trackByFn" [ngClass]="{'ms-1': i!==0}" [routerLink]="['','medication']" [queryParams]="{firstLetter: letter}"
      class="btn btn-light fw-medium">
        {{letter}}
    </a>

    <h4 class="mt-4">Browse Medications</h4>

    <ng-container *ngIf="(medications$|async)?.data as medications">
        <a *ngFor="let medication of medications; index as i;trackBy:trackByDrugFn" [ngClass]="{'ms-1': i!==0}" [routerLink]="['drug', medication._id]"
          class="btn btn-light fw-medium">
            {{medication.name}}
        </a>
    </ng-container>
  `,
  styles: [
  ]
})
export class DrugBrowseComponent {
  letters = LETTER_SET;
  medications$!: Observable<IResponse<Medication[]>>;
  #medicationService = inject(MedicationService);

  @Input() firstLetter: string = 'A';

  ngOnChanges() {
    this.medications$ = this.#medicationService.getMedications(this.firstLetter);
  }

  trackByFn = (index: number, letter: string) => { return index; }

  trackByDrugFn = (index: number, medication: Medication) => { return index; }
}
