import {NgModule, Optional, SkipSelf} from "@angular/core";
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [],
  providers: [],
})
export class SharedModule{
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: SharedModule
  ) {
    if (parentModule) {
      throw new Error('SharedModule is already loaded. Import it in the AppModule only.');
    }
  }
}
