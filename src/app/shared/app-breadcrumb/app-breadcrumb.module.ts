import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { AppBreadcrumbComponent } from './app-breadcrumb.component';

@NgModule({
  declarations: [AppBreadcrumbComponent],
  exports: [AppBreadcrumbComponent],
  imports: [CommonModule, NzBreadCrumbModule],
})
export class AppBreadcrumbModule {}
