import {Component, OnInit} from '@angular/core';
import {NbSidebarService} from "@nebular/theme";

@Component({
  selector: 'DB-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private sidebarService: NbSidebarService) {
  }

  ngOnInit(): void {
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }
}
