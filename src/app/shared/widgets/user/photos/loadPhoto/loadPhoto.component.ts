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
  template: `
    <nz-upload
      [nzCustomRequest]="handleUpload"
      [nzBeforeUpload]="beforeUpload"
      (nzChange)="handleChange($event)"
      [nzOpenFileDialogOnClick]="!loading"
    >
      <button nz-button><i nz-icon nzType="upload"></i>Click to Upload</button>
    </nz-upload>
  `,
})
export class LoadPhotoComponent implements OnInit, OnDestroy {
  public avatarURL: string | undefined;
  public loading = false;
  public progress_photo: number = 0;
  private clientesSubscription: Subscription[] = [];
  @Output() photo = new EventEmitter<any>();

  constructor(private message: MessageService) {}
  ngOnDestroy(): void {
    this.clientesSubscription.forEach((item) => item.unsubscribe());
  }
  ngOnInit(): void {}
  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.message.createMessageError('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.message.createMessageError('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };
  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }
  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info?.file?.originFileObj!, () => {
          this.loading = false;
          this.progress_photo = 0;
          this.photo.emit(info.file);
        });
        break;
      case 'error':
        this.loading = false;
        this.progress_photo = 0;
        break;
    }
  }
}
