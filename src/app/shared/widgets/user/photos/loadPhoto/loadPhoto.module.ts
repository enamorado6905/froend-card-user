import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { LoadPhotoComponent } from './loadPhoto.component';

@NgModule({
  declarations: [LoadPhotoComponent],
  exports: [LoadPhotoComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    IconsProviderModule,
    NzUploadModule,
    RouterModule,
  ],
})
export class LoadPhotoModule {}
