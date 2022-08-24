
import { NgModule, Optional, SkipSelf } from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {FooterComponent} from "./footer/footer.component";
import {NbCardModule, NbMenuModule} from "@nebular/theme";

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    NbCardModule,
    NbMenuModule.forRoot()
  ],
  providers: [],
})
export class LayoutModule {
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: LayoutModule
  ) {
    if (parentModule) {
      throw new Error('LayoutModule is already loaded. Import it in the AppModule only.');
    }
  }
}