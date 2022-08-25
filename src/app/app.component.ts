import { Component } from '@angular/core';
import {NbIconLibraries} from "@nebular/theme";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DigitalBank_Front';

  constructor(private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('bi', {iconClassPrefix: 'bi'});
    this.iconLibraries.setDefaultPack('bi');
  }
}

