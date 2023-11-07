import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CheatDirective } from './cheat.directive';
import { ZippyBasicComponent } from './zippy-basic.component';
import { NgTemplateOutletExample } from './ng-template-outlet-example.component';


@NgModule({
  declarations: [
    AppComponent,
    CheatDirective,
    ZippyBasicComponent,
    NgTemplateOutletExample
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
