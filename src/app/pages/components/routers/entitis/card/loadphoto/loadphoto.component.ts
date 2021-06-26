import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MessageService } from 'src/app/pages/service/configuration/message/message.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer, Subscription } from 'rxjs';
@Component({
  selector: 'app-load-photo',
  template: `
    <nz-descriptions
      [nzExtra]="extraTpl"
      nzBordered
      nzLayout="vertical"
      [nzColumn]="{ xxl: 4, xl: 4, lg: 4, md: 3, sm: 2, xs: 1 }"
    >
      <nz-descriptions-item
        [nzSpan]="1"
        [nzTitle]="'validation.music.name' | translate"
        >{{ file?.name! }}</nz-descriptions-item
      >
      <nz-descriptions-item
        [nzSpan]="1"
        [nzTitle]="'validation.music.size' | translate"
        >{{ file?.size! | formatFileSize: true }}</nz-descriptions-item
      >
      <nz-descriptions-item
        [nzSpan]="1"
        [nzTitle]="'validation.music.type' | translate"
        >{{ file?.type! }}</nz-descriptions-item
      >
      <nz-descriptions-item
        [nzSpan]="1"
        [nzTitle]="'validation.music.uid' | translate"
        >{{ file?.uid! }}</nz-descriptions-item
      >
    </nz-descriptions>
    <ng-template #extraTpl>
      <nz-upload [nzBeforeUpload]="beforeUpload" [nzShowUploadList]="false">
        <button type="button" nzType="primary" nz-button>
          <i nz-icon type="button" nzType="upload"></i
          >{{ 'button.upload' | translate }}
        </button>
      </nz-upload>
    </ng-template>
  `,
})
export class LoadPhotoComponent implements OnInit, OnDestroy {
  public avatarURL: string | undefined;
  public loading = false;
  public progress_photo: number = 0;
  public file: NzUploadFile | undefined;
  private clientesSubscription: Subscription[] = [];
  @Output() photo = new EventEmitter<any>();

  constructor(private message: MessageService) {}
  ngOnDestroy(): void {
    this.clientesSubscription.forEach((item) => item.unsubscribe());
  }
  ngOnInit(): void {}

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): boolean => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      this.message.createMessageError('You can only upload image file!');
      return false;
    }
    const isLt2M = file.size! / 9000000 / 9000000 < 2;
    if (!isLt2M) {
      this.message.createMessageError('Image must smaller than 9MB!');
      return false;
    }
    this.file = file;
    this.photo.emit(file);
    return false;
  };
}
