import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NbButtonModule, NbLayoutModule, NbSidebarModule, NbThemeModule} from "@nebular/theme";
import {CoreModule} from "./core/core.module";
import {LayoutModule} from "./layout/layout.module";
import {SharedModule} from "./shared/shared.module";
import {ViewsModule} from "./views/views.module";
import {FeaturesModule} from "./features/features.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {NbDateFnsDateModule} from "@nebular/date-fns";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {initializeKeycloak} from "./app-init.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    CoreModule,
    LayoutModule,
    SharedModule,
    ViewsModule,
    FeaturesModule,
    NbDateFnsDateModule,
    KeycloakAngularModule
  ],
  providers: [{
    provide:APP_INITIALIZER,
    useFactory:initializeKeycloak,
    multi:true,
    deps:[KeycloakService],
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
