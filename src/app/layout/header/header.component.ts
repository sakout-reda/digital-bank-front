import {Component, Inject, OnInit} from '@angular/core';
import {NB_WINDOW, NbMenuService, NbSidebarService} from "@nebular/theme";
import {KeycloakSecurityService} from "../../core/services/keycloak-security.service";
import {filter, map} from "rxjs";

@Component({
  selector: 'DB-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userMenu = [

    {
      title: 'Profile',
      link: '/'
    },
    {
      title: 'Change Password',
      link: '/'
    },
    {
      title: 'Logout',
      link: '/'
    },
  ];

  constructor(private sidebarService: NbSidebarService,
              private nbMenuService: NbMenuService,
              public securityService: KeycloakSecurityService) {
  }

  ngOnInit(): void {
    this.nbMenuService.onItemClick().pipe(
      filter(({tag}) => tag === 'userContextMenu'),
      map(({item: {title}}) => title),
    ).subscribe(title => this.onMenuItemClick(title));
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  onMenuItemClick(item: string) {
    switch (item) {
      case 'Logout' : {
        this.securityService.kc.logout();
        this.securityService.kc.login();
        break;
      }
      case 'Change Password' : {
        this.securityService.kc.accountManagement();
        break;
      }
    }
  }

}
