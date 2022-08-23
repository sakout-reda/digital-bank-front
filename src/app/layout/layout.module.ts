
import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({
  declarations: [],
  exports: [],
  imports: [],
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
