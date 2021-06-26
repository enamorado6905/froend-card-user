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
  selector: 'app-select-album-artist',
  template: `
    <nz-select
      nzAllowClear
      nzShowSearch
      nzServerSearch
      [nzAutoClearSearchValue]="false"
      [nzPlaceHolder]="'validation.idAlbum.placeholder' | translate"
      [(ngModel)]="album"
      (nzOnSearch)="getAlbum($event)"
      (ngModelChange)="sendAlbum()"
    >
      <ng-container *ngFor="let option of GetAlbum | async">
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
export class AlbumArtistSelectComponent implements OnInit, OnDestroy {
  public album: string | undefined;
  public GetAlbum: any;
  @Output() idAlbumArtist = new EventEmitter<string>();
  @Input('album') set Album(album: AlbumArtist) {
    if (!album) {
      return;
    }
    this.getAlbum(album.title);
    this.album = album._id!;
  }
  @Input('reset') set Reset(value: any) {
    if (!value) {
      this.album = undefined;
      this.GetAlbum = undefined;
      return;
    }
  }
  constructor(private albumService: AlbumArtistService) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {}
  sendAlbum(): void {
    if (!this.album) {
      return;
    }
    this.idAlbumArtist.emit(this.album);
  }
  getAlbum(value: string): void {
    if (!value || value === '') {
      return;
    }
    this.GetAlbum = this.albumService.SEARCH_NAME_SELECT(value);
  }
}
