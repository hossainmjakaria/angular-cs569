import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CheatDirective } from './cheat.directive';
import { ZippyBasicComponent } from './zippy-basic.component';


@NgModule({
  declarations: [
    AppComponent,
    CheatDirective,
    ZippyBasicComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
