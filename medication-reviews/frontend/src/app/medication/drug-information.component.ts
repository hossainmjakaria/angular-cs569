import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { Medication } from '../models/types.model';
import { MedicationService } from '../services/medication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-drug-information',
  template: `
    <div class="row">
        <div class="col-md-6">
            <h3>{{medication.name}}

            <span *ngIf="userService.medicationSignal()._id === medication.added_by.user_id">
                  <a title="Edit {{medication.name}}" [routerLink]="['', 'medication', 'entry']"
                    [queryParams]="{medicationId: drug_id}" class="btn btn-outline-dark btn-sm">
                      <i class="bi bi-pencil"></i>
                  </a>
                  <button title="Delete {{medication.name}}" class="btn btn-danger btn-sm ms-1" (click)="deleteMedication()">
                      <i class="bi bi-trash"></i>
                  </button>              
              </span>

            </h3>
            <P> Generic : {{medication.generic_name}}
                <br> Class : {{medication.medication_class}}
                <br> Availability : {{medication.availability}}
                <br> Added By : {{medication.added_by.fullname}}
            </P>
        </div>
        
        <div class="col-md-6">
            <img [src]="imageUrl" alt="Avatar" class="img-fluid rounded-circle avatar-image border float-end" width="150" height="150">
        </div>
    </div>

    <div class="row">
      <app-reviews [drug_id]="drug_id"></app-reviews>
    </div>  
  `,
  styles: [
    `
      .modal1{
          background-color: white;
      }    
    `
  ]
})
export class DrugInformationComponent {
  @Input() drug_id: string = '';

  #medicationService = inject(MedicationService);
  userService = inject(UserService);
  #toastr = inject(ToastrService);
  #router = inject(Router);
  #confirmation = inject(NgConfirmService);

  imageUrl: string = '';
  medication: Medication = {
    _id: '', name: '', first_letter: '', generic_name: '', medication_class: '', availability: '',
    image: { filename: '', originalname: '', _id: '' },
    added_by: { user_id: '', email: '', fullname: '' },
    reviews: []
  };

  ngOnChanges() {
    this.#medicationService.getMedicationWithoutReviews(this.drug_id)
      .subscribe(({ success, data }) => {
        this.medication = success ? data : {} as Medication;
        this.imageUrl = environment.IMAGE_URL + this.medication.image._id;
      });
  }

  deleteMedication() {
    this.#confirmation.showConfirm("Do you want to Delete?",
      () => {
        this.#medicationService.deleteMedication(this.drug_id)
          .subscribe(({ success, data }) => {
            if (success) {
              this.#toastr.success('Medication deleted successfully');
              this.#router.navigate(['', 'medication']);
            }
          })
      },
      () => { });
  }
}