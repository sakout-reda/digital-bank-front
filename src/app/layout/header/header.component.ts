import {Component, OnInit} from '@angular/core';
import {NbMenuService, NbSidebarService} from "@nebular/theme";
import {filter, map} from "rxjs";
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

@Component({
  selector: 'DB-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged = false;
  loggedUserName = '';
  userProfile: KeycloakProfile | null = null;

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
              private keycloakService: KeycloakService) {
  }

  async ngOnInit() {
    this.isLogged = await this.keycloakService.isLoggedIn();

    if (this.isLogged) {
      this.userProfile = await this.keycloakService.loadUserProfile();
      this.loggedUserName = this.userProfile?.firstName + " " + this.userProfile.lastName;
    }
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
        this.keycloakService.logout(window.location.origin);
        break;
      }
      case 'Change Password' : {
        // this.securityService.kc.accountManagement();
        break;
      }
    }
  }

}
