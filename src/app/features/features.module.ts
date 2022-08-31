import {NgModule, Optional, SkipSelf} from "@angular/core";
import {AccountsComponent} from './accounts-management/accounts.component';
import {CustomersListComponent} from "./customers-management/views/customers-list/customers-list.component";
import {
  NbCardModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbSelectModule,
  NbToastrModule
} from "@nebular/theme";
import {CommonModule} from "@angular/common";
import {LayoutModule} from "../layout/layout.module";
import {ReactiveFormsModule} from "@angular/forms";
import { AddEditCustomerComponent } from './customers-management/views/add-edit-customer/add-edit-customer.component';

@NgModule({
  declarations: [
    AccountsComponent,
    CustomersListComponent,
    AddEditCustomerComponent
  ],
  imports: [
    NbCardModule,
    NbSelectModule,
    NbIconModule,
    CommonModule,
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
    LayoutModule,
    ReactiveFormsModule,
    NbDatepickerModule.forRoot(),
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
