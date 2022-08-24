import {Component, OnInit} from '@angular/core';
import {NbIconLibraries, NbMenuItem} from "@nebular/theme";

@Component({
  selector: 'DB-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  items: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'house-door-fill',
      link: ''
    },
    {
      title: 'Customers',
      icon: 'person-fill',
      link: '/customers'
    },
    {
      title: 'Profile',
      expanded: true,
      children: [
        {
          title: 'Change Password',
        },
        {
          title: 'Privacy Policy',
        },
        {
          title: 'Logout',
        },
      ],
    },
  ];

  constructor(private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('bi', {iconClassPrefix: 'bi'});
    this.iconLibraries.setDefaultPack('bi');
  }

  ngOnInit(): void {
  }

}
