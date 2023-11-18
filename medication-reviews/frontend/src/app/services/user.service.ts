import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IResponse, User } from '../models/types.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  #http = inject(HttpClient);
  medicationSignal = signal({ _id: '', fullname: '', email: '', jwt: '' });

  constructor() {
    const state = localStorage.getItem('MedicationState');
    if (state) {
      this.medicationSignal.set(JSON.parse(state));
    }
  }

  isLoggedIn() {
    return this.medicationSignal().jwt ? true : false;
  }

  signIn(user: User): Observable<IResponse<string>> {
    return this.#http.post<IResponse<string>>(environment.SERVER_URL + `users/signin`, user)
      .pipe(
        catchError((error: Error) => {
          return of({ success: false, data: '' });
        })
      );
  }

  signUp(user: User): Observable<IResponse<User>> {
    return this.#http.post<IResponse<User>>(environment.SERVER_URL + `users/signup`, user);
  }
}
