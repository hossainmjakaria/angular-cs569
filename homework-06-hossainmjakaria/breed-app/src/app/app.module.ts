import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubBreedsComponent } from './sub-breeds.component';
import { BreedsComponent } from './breeds.component';
import { provideHttpClient } from '@angular/common/http';
import { SubBreedImageComponent } from './sub-breed-image.component';
import { BannedBreedsComponent } from './banned-breeds.component';

@NgModule({
  declarations: [
    AppComponent,
    BreedsComponent,
    SubBreedsComponent,
    SubBreedImageComponent,
    BannedBreedsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
