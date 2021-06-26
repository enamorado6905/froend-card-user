import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { AlbumArtist } from 'app/user/interfaces/entitis/artist/album.interface';
import { AlbumArtistService } from 'app/user/service/entitis/artist/albumArtist.service';

@Component({
  selector: 'app-select-albums-artist',
  template: `
    <nz-select
      nzMode="multiple"
      nzAllowClear
      nzShowSearch
      nzServerSearch
      [nzAutoClearSearchValue]="false"
      [nzPlaceHolder]="'validation.idAlbum.placeholder' | translate"
      [(ngModel)]="albums"
      (nzOnSearch)="getAlbum($event)"
      (ngModelChange)="sendAlbum()"
    >
      <ng-container *ngFor="let option of GetAlbum">
        <nz-option
          *ngIf="GetAlbum"
          [nzValue]="option._id"
          [nzLabel]="option.title"
        ></nz-option>
      </ng-container>
      <nz-option *ngIf="!GetAlbum" nzDisabled nzCustomContent>
        <i nz-icon nzType="loading" class="loading-icon"></i> Loading Data...
      </nz-option>
    </nz-select>
  `,
})
export class AlbumsArtistSelectsComponent implements OnInit, OnDestroy {
  public albums: Array<string> = [];
  public GetAlbum: any;
  @Output() idAlbumsArtist = new EventEmitter<string[]>();
  @Input('album') set Album(album: Array<AlbumArtist>) {
    if (!album) {
      return;
    }
    album.forEach(async (m) => {
      await this.getAlbum(m.title);
      this.albums.push(m._id!);
    });
  }
  @Input('reset') set Reset(value: string[]) {
    if (value.length === 0) {
      this.albums = [];
      this.GetAlbum = undefined;
      return;
    }
  }
  constructor(private albumService: AlbumArtistService) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {}
  sendAlbum(): void {
    if (this.albums) {
      return;
    }
    this.idAlbumsArtist.emit(this.albums);
  }
  async getAlbum(value: string): Promise<void> {
    if (!value || value === '') {
      return;
    }
    this.GetAlbum = await this.albumService.SEARCH_NAME_SELECT(value);
  }
}
