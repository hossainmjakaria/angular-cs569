import { CommonModule } from '@angular/common';
import { NgModule, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../services/user.service';
import { ConfirmationComponent } from '../utilities/confirmation.component';
import { RatingComponent } from '../utilities/rating.component';
import { DrugBrowseComponent } from './drug-browse.component';
import { DrugEntryComponent } from './drug-entry.component';
import { DrugInformationComponent } from './drug-information.component';
import { ReviewsComponent } from './reviews.component';


const routes: Routes = [
  { path: '', component: DrugBrowseComponent, title: 'Browse Medication' },
  { path: 'drug/:drug_id', component: DrugInformationComponent, title: 'Medication Information' },
  {
    path: 'entry', component: DrugEntryComponent, title: 'Medication Entry',
    canActivate: [() => inject(UserService).isLoggedIn()]
  },
];

@NgModule({
  declarations: [
    DrugBrowseComponent,
    DrugInformationComponent,
    DrugEntryComponent,
    RatingComponent,
    ConfirmationComponent,
    ReviewsComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),

  ]
})
export class MedicationModule { }
