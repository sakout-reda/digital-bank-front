import {NgModule, Optional, SkipSelf} from "@angular/core";
import { AccountsComponent } from './accounts-management/accounts.component';
import {CustomersListComponent} from "./customers-management/views/customers-list/customers-list.component";
import {NbCardModule, NbIconModule, NbSelectModule, NbToastrModule} from "@nebular/theme";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AccountsComponent,
    CustomersListComponent
  ],
  imports: [
    NbCardModule,
    NbSelectModule,
    NbIconModule,
    CommonModule,
    NbToastrModule.forRoot(),
  ],
  providers: [],
})
export class FeaturesModule{
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: FeaturesModule
  ) {
    if (parentModule) {
      throw new Error('FeaturesModule is already loaded. Import it in the AppModule only.');
    }
  }
}
