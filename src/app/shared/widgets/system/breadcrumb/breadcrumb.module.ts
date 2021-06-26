import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { BreadcrumbComponent } from './breadcrumb';

@NgModule({
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent],
  imports: [CommonModule, NzBreadCrumbModule],
})
export class BreadcrumbModule {}
