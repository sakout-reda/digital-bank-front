import {NgModule, Optional, SkipSelf} from "@angular/core";

@NgModule({
  declarations: [],
  imports: [],
  providers: [],
})
export class ViewsModule{
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: ViewsModule
  ) {
    if (parentModule) {
      throw new Error('ViewsModule is already loaded. Import it in the AppModule only.');
    }
  }
}
