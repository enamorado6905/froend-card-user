import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { Artist } from 'app/user/interfaces/entitis/artist/artist.interface';
import { ArtistService } from 'app/user/service/entitis/artist/artist.service';

@Component({
  selector: 'app-select-artist',
  template: `
    <nz-select
      nzAllowClear
      nzShowSearch
      nzServerSearch
      [nzPlaceHolder]="'validation.idArtist.placeholder' | translate"
      [(ngModel)]="artist"
      (nzOnSearch)="getArtist($event)"
      (ngModelChange)="sendArtist()"
    >
      <ng-container *ngFor="let option of GetArtist">
        <nz-option
          *ngIf="GetArtist"
          [nzValue]="option._id"
          [nzLabel]="dateArtist(option)"
        ></nz-option>
      </ng-container>
      <nz-option *ngIf="!GetArtist" nzDisabled nzCustomContent>
        <i nz-icon nzType="loading" class="loading-icon"></i> Loading Data...
      </nz-option>
    </nz-select>
  `,
})
export class ArtistSelectComponent implements OnInit, OnDestroy {
  public artist: string | undefined;
  public GetArtist: any;
  @Output() idArtist = new EventEmitter<string>();
  @Input('artist') set Artist(artist: Artist) {
    if (!artist) {
      return;
    }
    this.getArtist(artist.name);
    this.artist = artist._id!;
  }
  @Input('reset') set Reset(value: any) {
    if (!value) {
      this.artist = undefined;
      this.GetArtist = undefined;
      return;
    }
  }
  constructor(private artistService: ArtistService) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {}
  dateArtist(option: Artist): string {
    return ` ${option.name} ${option.nametwo} ${option.lastnameone}
          ${option.lastnametwo} => ${option.nameArtist}
`;
  }
  sendArtist(): void {
    if (!this.artist) {
      return;
    }
    this.idArtist.emit(this.artist);
  }
  async getArtist(value: string): Promise<void> {
    if (!value || value === '') {
      return;
    }
    this.GetArtist = await this.artistService.SEARCH_NAME_SELECT(value);
  }
}
