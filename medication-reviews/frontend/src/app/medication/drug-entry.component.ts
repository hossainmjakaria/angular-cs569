import { Component, Input, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { Availability } from '../models/types.model';
import { MedicationService } from '../services/medication.service';


@Component({
  selector: 'app-drug-entry',
  template: `
    <form class="needs-validation" [formGroup]="medicationForm" (ngSubmit)="saveMedication()">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" formControlName="name" class="form-control" id="name" required>
        <div  class="invalid-feedback d-block" *ngIf="name?.invalid && (name?.dirty|| name?.touched)">
          <div *ngIf="name?.errors?.['required']">Name is required</div>
        </div>
      </div>
      <div class="mb-3">
        <label for="generic_name" class="form-label">Generic name</label>
        <input type="text" formControlName="generic_name" class="form-control" id="generic_name">
        <div  class="invalid-feedback d-block" *ngIf="generic_name?.invalid && (generic_name?.dirty|| generic_name?.touched)">
          <div *ngIf="generic_name?.errors?.['required']">Generic name is required</div>
        </div>
      </div>
      <div class="mb-3">
        <label for="medication_class" class="form-label">Medication class</label>
        <input type="text" formControlName="medication_class" class="form-control" id="medication_class">
         <div  class="invalid-feedback d-block" *ngIf="medication_class?.invalid && (medication_class?.dirty|| medication_class?.touched)">
          <div *ngIf="medication_class?.errors?.['required']">Medication class is required</div>
        </div>
      </div>

      <div class="mb-3">
        <label for="availability" class="form-label">Availability</label>
        <select class="form-select form-control" formControlName="availability" aria-label="select" id="availability">
          <option value="" selected>Select availability</option>
          <option *ngFor="let item of availabilities; trackBy:trackByFn" [value]="item" >{{item}}</option>
        </select>
        <div  class="invalid-feedback d-block" *ngIf="availability?.invalid && (availability?.dirty|| availability?.touched)">
          <div *ngIf="availability?.errors?.['required']">Availability is required</div>
        </div>
      </div>

      <div class="mb-3">
        <label for="medication_image" class="form-label">Image</label>
        <input type="file" formControlName="medication_image" class="form-control" id="medication_image" (change)="onFileSelect($event)">
      </div>
      <button class="btn btn-primary" type="submit" [disabled]="!medicationForm.valid">Save</button>
    </form>    
  `,
  styles: [
  ]
})
export class DrugEntryComponent {
  #medicationService = inject(MedicationService);
  #toastr = inject(ToastrService);
  #router = inject(Router);
  file!: File;
  availabilities: Availability[] = Object.values(Availability);
  imageUrl: string = '';

  @Input() medicationId: string = '';

  medicationForm = inject(FormBuilder).nonNullable.group({
    name: ['', Validators.required],
    generic_name: ['', Validators.required],
    medication_class: ['', Validators.required],
    availability: ['', Validators.required],
    medication_image: ''
  });

  get name() { return this.medicationForm.get('name'); }
  get generic_name() { return this.medicationForm.get('generic_name'); }
  get medication_class() { return this.medicationForm.get('medication_class'); }
  get availability() { return this.medicationForm.get('availability'); }

  ngOnChanges() {
    if (this.medicationId) {
      this.#medicationService.getMedicationWithoutReviews(this.medicationId)
        .subscribe(({ success, data }) => {
          if (success) {
            this.medicationForm.patchValue(data);
            this.imageUrl = environment.IMAGE_URL + data.image._id;
          }
        });
    }
  }

  saveMedication() {
    const formData = new FormData();
    formData.append('name', this.medicationForm.value?.name as string);
    formData.append('generic_name', this.medicationForm.value?.generic_name as string);
    formData.append('medication_class', this.medicationForm.value?.medication_class as string);
    formData.append('availability', this.medicationForm.value?.availability as string);
    formData.append('medication_image', this.file);

    if (this.medicationId) {
      this.#medicationService.updateMedication(this.medicationId, formData)
        .subscribe(({ success, data }) => {
          if (success) {
            this.#toastr.success('Medication updated successfully');
            this.#router.navigate(['', 'medication', 'drug', this.medicationId]);
          }
        });
    }
    else {
      this.#medicationService.createMedication(formData)
        .subscribe(({ success, data }) => {
          if (success) {
            this.#toastr.success('Medication created successfully');
            this.#router.navigate(['', 'medication', 'drug', data._id]);
          }
        });
    }
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files!.length > 0) this.file = input.files![0];
  }

  trackByFn = (index: number, letter: string) => { return index; }
}
