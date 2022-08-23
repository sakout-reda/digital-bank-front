import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NbButtonModule, NbLayoutModule, NbSidebarModule, NbThemeModule} from "@nebular/theme";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
