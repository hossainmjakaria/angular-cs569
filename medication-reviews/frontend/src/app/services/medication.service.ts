import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IResponse, Image, Medication, Review } from '../models/types.model';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  #http = inject(HttpClient);

  createMedication(medication: FormData): Observable<IResponse<Medication>> {
    return this.#http.post<IResponse<Medication>>(environment.SERVER_URL + `medications`, medication);
  }

  getMedications(firstLetter: string = 'A'): Observable<IResponse<Medication[]>> {
    return this.#http.get<IResponse<Medication[]>>(environment.SERVER_URL + `medications?first_letter=${firstLetter}`);
  }

  updateMedication(medicationId: string, medication: FormData): Observable<IResponse<boolean>> {
    return this.#http.put<IResponse<boolean>>(environment.SERVER_URL + `medications/${medicationId}`, medication);
  }

  getMedicationWithoutReviews(medicationId: string): Observable<IResponse<Medication>> {
    return this.#http.get<IResponse<Medication>>(environment.SERVER_URL + `medications/${medicationId}`);
  }

  deleteMedication(medicationId: string): Observable<IResponse<boolean>> {
    return this.#http.delete<IResponse<boolean>>(environment.SERVER_URL + `medications/${medicationId}`);
  }

  addMedicationReview(medicationId: string, review: Review): Observable<IResponse<string>> {
    return this.#http.post<IResponse<string>>(environment.SERVER_URL + `medications/${medicationId}/reviews`, review);
  }

  getMedicationReviews(medicationId: string): Observable<IResponse<Review[]>> {
    return this.#http.get<IResponse<Review[]>>(environment.SERVER_URL + `medications/${medicationId}/reviews`);
  }

  updateMedicationReview(medicationId: string, reviewId: string, review: Review): Observable<IResponse<boolean>> {
    return this.#http.put<IResponse<boolean>>(environment.SERVER_URL + `medications/${medicationId}/reviews/${reviewId}`, review);
  }

  getMedicationReview(medicationId: string, reviewId: string): Observable<IResponse<Review>> {
    return this.#http.get<IResponse<Review>>(environment.SERVER_URL + `medications/${medicationId}/reviews/${reviewId}`);
  }

  deleteMedicationReview(medicationId: string, reviewId: string): Observable<IResponse<boolean>> {
    return this.#http.delete<IResponse<boolean>>(environment.SERVER_URL + `medications/${medicationId}/reviews/${reviewId}`);
  }

  getMedicationImage(imageId: string): Observable<IResponse<Image>> {
    return this.#http.get<IResponse<Image>>(environment.SERVER_URL + `medications/images/${imageId}`);
  }
}