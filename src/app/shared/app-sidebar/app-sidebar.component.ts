import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
})
export class AppSidebarComponent implements OnInit, OnDestroy {
  eventone = (): void => {
    if (window.innerWidth >= 768 && this.sharedService.isCollapsed_) {
      this.sharedService.isCollapsed_ = false;
      this.sharedService.clickCollapsed();
    }
  };
  constructor(public sharedService: SharedService) {}

  ngOnInit(): void {
    this.collapse();
  }
  collapse(): void {
    const sidebarMenu = document.getElementsByClassName('sidebar-menu')[0];
    const sidebarAvatar = document.getElementsByClassName('sidebar-avatar')[0];
    sidebarMenu?.addEventListener('click', this.eventone);
    sidebarAvatar?.addEventListener('click', this.eventone);
  }
  ngOnDestroy(): void {}
}
