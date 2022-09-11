import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {FooterComponent} from "./footer/footer.component";
import {
  NbActionsModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbMenuModule,
  NbUserModule
} from "@nebular/theme";
import { LoadingComponent } from './loading/loading.component';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoadingComponent,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoadingComponent,
  ],
  imports: [
    NbCardModule,
    NbMenuModule.forRoot(),
    NbIconModule,
    RouterModule,
    NbActionsModule,
    NbUserModule,
    CommonModule,
    NbContextMenuModule
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
