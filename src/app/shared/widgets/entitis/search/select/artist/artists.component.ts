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
  selector: 'app-select-artists',
  template: `
    <nz-select
      nzMode="multiple"
      nzAllowClear
      nzShowSearch
      nzServerSearch
      [nzPlaceHolder]="'validation.idArtist.placeholder' | translate"
      [(ngModel)]="artists"
      (nzOnSearch)="getArtist($event)"
      (ngModelChange)="sendArtist()"
    >
      <ng-container *ngFor="let option of GetArtist">
        <nz-option
          *ngIf="GetArtist"
          [nzValue]="option._id"
          [nzLabel]="dateArtist(option)"
        >
        </nz-option>
      </ng-container>
      <nz-option *ngIf="!GetArtist" nzDisabled nzCustomContent>
        <i nz-icon nzType="loading" class="loading-icon"></i> Loading Data...
      </nz-option>
    </nz-select>
  `,
})
export class ArtistsSelectsComponent implements OnInit, OnDestroy {
  public artists: Array<string> = [];
  public GetArtist: any;
  @Output() idArtists = new EventEmitter<string[]>();
  @Input('artist') set Artist(artist: Array<Artist>) {
    if (!artist) {
      return;
    }
    artist.forEach(async (m) => {
      await this.getArtist(m.nameArtist);
      this.artists.push(m._id!);
    });
  }
  @Input('reset') set Reset(value: string[]) {
    if (value.length === 0) {
      this.artists = [];
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
    if (this.artists.length === 0) {
      return;
    }
    this.idArtists.emit(this.artists);
  }
  async getArtist(value: string): Promise<void> {
    if (!value || value === '') {
      return;
    }
    this.GetArtist = await this.artistService.SEARCH_NAME_SELECT(value);
  }
}
