import {Component, OnInit} from '@angular/core';
import {NbMenuItem} from "@nebular/theme";

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
      link: '/'
    },
    {
      title: 'Customers',
      icon: 'people-fill',
      link: '/customers'
    },
    {
      title: 'Accounts',
      icon: 'file-earmark-person',
      link: '/accounts'
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
  ngOnInit(): void {
  }

}
