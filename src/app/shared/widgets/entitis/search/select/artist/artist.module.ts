import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TranslateModule } from '@ngx-translate/core';
import { ArtistSelectComponent } from './artist.component';
import { ArtistsSelectsComponent } from './artists.component';
@NgModule({
  declarations: [ArtistSelectComponent, ArtistsSelectsComponent],
  exports: [ArtistSelectComponent, ArtistsSelectsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ArtistModule {}
