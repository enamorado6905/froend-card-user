import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PaginationComponent } from './pagination.component';

@NgModule({
  exports: [PaginationComponent],
  declarations: [PaginationComponent],
  imports: [CommonModule, NzSelectModule, NzPaginationModule],
})
export class PaginationModule {}
