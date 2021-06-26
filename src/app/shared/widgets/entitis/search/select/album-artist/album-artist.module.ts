import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TranslateModule } from '@ngx-translate/core';
import { AlbumArtistSelectComponent } from './album-artist.component';
import { AlbumsArtistSelectsComponent } from './albums-artist.component';
@NgModule({
  declarations: [AlbumArtistSelectComponent, AlbumsArtistSelectsComponent],
  exports: [AlbumArtistSelectComponent, AlbumsArtistSelectsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AlbumArtistModule {}
