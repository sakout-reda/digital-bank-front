import {NgModule, Optional, SkipSelf} from "@angular/core";
import { PermissionDeniedComponent } from './permission-denied/permission-denied.component';

@NgModule({
  declarations: [
    PermissionDeniedComponent
  ],
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
