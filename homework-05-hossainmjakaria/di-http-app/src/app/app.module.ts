import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListComponent } from './list.component';
import { CardComponent } from './card.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { userAgentInterceptor } from './user-agent.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    // provideHttpClient(),
    provideHttpClient(withInterceptors([userAgentInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
