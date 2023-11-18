import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer.component';
import { HeaderComponent } from './header.component';
import { HomeComponent } from './home.component';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { SignInComponent } from './signin.component';
import { SignupComponent } from './signup.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgConfirmModule } from 'ng-confirm-box';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SignInComponent, title: 'Sign In' },
  { path: 'signup', component: SignupComponent, title: 'Register' },
  {
    path: 'medication',
    loadChildren: () => import('./medication/medication.module').then(m => m.MedicationModule)
  },
  { path: '**', redirectTo: '' }
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SignInComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes, { bindToComponentInputs: true }),
    NgConfirmModule
  ],
  providers: [
    provideHttpClient(withInterceptors([tokenInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
