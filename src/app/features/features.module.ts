import {NgModule, Optional, SkipSelf} from "@angular/core";
import {AccountsListComponent} from './accounts-management/views/accounts-list/accounts-list.component';
import {CustomersListComponent} from "./customers-management/views/customers-list/customers-list.component";
import {
    NbAccordionModule,
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
import { CrudCustomerComponent } from './customers-management/views/crud-customer/crud-customer.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AccountsListComponent,
    CustomersListComponent,
    CrudCustomerComponent
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
        RouterModule,
        NbAccordionModule,
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
