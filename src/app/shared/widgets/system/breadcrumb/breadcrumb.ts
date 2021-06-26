import { Component } from '@angular/core';
import { SharedService } from '../../../shared.service';
@Component({
  selector: 'app-breadcrumb',
  template: `<nz-breadcrumb>
    <nz-breadcrumb-item>Homo1</nz-breadcrumb-item>
    <nz-breadcrumb-item>Home2</nz-breadcrumb-item>
    <nz-breadcrumb-item>App</nz-breadcrumb-item>
  </nz-breadcrumb>`,
})
export class BreadcrumbComponent {
  isCollapsed: boolean = false;
  constructor(public sharedService: SharedService) {}
}
