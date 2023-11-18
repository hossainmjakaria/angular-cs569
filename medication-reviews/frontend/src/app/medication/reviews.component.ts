import { Component, Input, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgConfirmService } from 'ng-confirm-box';
import { ToastrService } from 'ngx-toastr';
import { Review } from '../models/types.model';
import { MedicationService } from '../services/medication.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-reviews',
  template: `
    <div class="row">
        <h4>Reviews</h4>

        <div class="col-md-12" *ngFor="let review of reviews; let i = index; trackBy:trackByFn">
            <div class="card mb-3 d-flex">
                <div class="card-body">
                    <div class=" row">
                        <div class="col-md-10">
                            <div class="col-md-8">
                                <div class="card-subtitle text-muted">{{review.by.fullname}} </div>
                                <app-rating [rating]="review.rating" [readOnly]="true" />
                            </div>

                            <div class=" col-md-4 text-muted"> {{review.date | date: 'MMM dd, yyyy hh:mm a' }}</div>
                        </div>
                        <div class="col-md-2 d-flex justify-content-end align-items-start">
                            <div class="dropdown" *ngIf="validUserToUpdate(review.by.user_id)">
                                <div class="btn-text ">
                                    <a class="btn btn-outline-dark btn-sm" title="Edit" (click)="editReview(review)" ><i class="bi bi-pencil"></i></a>
                                    <a class="btn btn btn-danger btn-sm ms-1" title="Delete" (click)="deleteReview(drug_id, review._id)"><i class="bi bi-trash"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card-text mt-3 ">
                        <div *ngIf="!review.enableUpdate;">{{review.review}}</div>

                        <div *ngIf="review.enableUpdate">
                            <form [formGroup]="reviewEditForm">
                                <input type="text" formControlName="review" value="{{review.review}}" class="form-control">
                                <app-rating [rating]="0" [readOnly]="false" (ratingChange)="onRatingChange($event, true)" />
                                <button class="btn btn-primary mt-3" type="submit" (click)="updateReview(drug_id,review._id)">Update</button>
                                <button class="btn btn-primary mt-3 ms-3" (click)="review.enableUpdate = false">Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-12" *ngIf="userService.isLoggedIn()">
            <form [formGroup]="reviewAddForm" (ngSubmit)="addReview()">
                <textarea placeholder="Write a review" class="form-control" rows="2" formControlName="review"></textarea>
                <app-rating [rating]="0" [readOnly]="false" (ratingChange)="onRatingChange($event)" />
                <button class="btn btn-primary mt-3">Post</button>
            </form>
        </div>
    </div>
  `,
  styles: [
  ]
})
export class ReviewsComponent {
  @Input() drug_id: string = '';

  #medicationService = inject(MedicationService);
  userService = inject(UserService);
  #confirmation = inject(NgConfirmService);
  #toastr = inject(ToastrService);

  reviews!: Review[];

  reviewAddForm = inject(FormBuilder).nonNullable.group({ review: '', rating: 0, by: { user_id: '', fullname: '' }, date: 0 });
  reviewEditForm = inject(FormBuilder).nonNullable.group({ review: '', rating: 0, by: { user_id: '', fullname: '' }, date: 0 });

  ngOnChanges() {
    if (this.drug_id) {
      this.loadReviews();
    }
  }

  loadReviews() {
    this.#medicationService.getMedicationReviews(this.drug_id)
      .subscribe(({ success, data }) => {
        this.reviews = success ? data : [];
      });
  }

  addReview() {
    this.#medicationService.addMedicationReview(this.drug_id, this.reviewAddForm.value as Review)
      .subscribe(({ success, data }) => {
        if (success) {
          this.reviewAddForm.reset();
          this.#toastr.success('Review added successfully');
          this.loadReviews();
        }
      });
  }

  editReview(review: Review) {
    console.log(review);
    review.enableUpdate = true;
    this.reviewEditForm.reset();
    this.reviewEditForm.patchValue({ review: review.review });
  }

  deleteReview(medicationId: string, reviewId: string) {
    this.#confirmation.showConfirm("Do you want to Delete?",
      () => {
        this.#medicationService.deleteMedicationReview(medicationId, reviewId)
          .subscribe(() => {
            this.loadReviews();
          })
      },
      () => { });
  }

  updateReview(medicationId: string, reviewId: string) {
    this.#medicationService.updateMedicationReview(medicationId, reviewId, this.reviewEditForm.value as Review)
      .subscribe(() => {
        this.#toastr.success('Review updated successfully');
        this.reviewEditForm.reset();
        this.loadReviews();
      });
  }

  validUserToUpdate(reviewerId: string): boolean {
    return this.userService.medicationSignal()._id === reviewerId;
  }

  onRatingChange(rating: number, edit: boolean = false) {
    if (edit)
      this.reviewEditForm.patchValue({ rating });
    else
      this.reviewAddForm.patchValue({ rating });
  }

  trackByFn = (index: number, review: Review) => { return index; }

}