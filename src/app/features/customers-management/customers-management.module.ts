
import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({
  declarations: [],
  exports: [],
  imports: [],
  providers: [],
})
export class CustomersManagementModule {
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: CustomersManagementModule
  ) {
    if (parentModule) {
      throw new Error('CustomersManagementModule is already loaded. Import it in the AppModule only.');
    }
  }
}
