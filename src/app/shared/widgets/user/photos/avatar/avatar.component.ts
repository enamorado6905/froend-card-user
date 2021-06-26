import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  Input,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-avatar',
  template: `
    <div class="content-image">
      <div class="content-loading" [@imageAnimation]="contentCtrl">
        <div class="thumb-overlay">
          <div class="sk-folding-cube">
            <div class="sk-cube1 sk-cube"></div>
            <div class="sk-cube2 sk-cube"></div>
            <div class="sk-cube4 sk-cube"></div>
            <div class="sk-cube3 sk-cube"></div>
          </div>
        </div>
      </div>
      <img [@imageAnimation]="imageCtrl" #lImage alt="" [src]="SRC!" />
    </div>
  `,
  animations: [
    trigger('imageAnimation', [
      state(
        'show-image',
        style({
          opacity: '1',
        })
      ),
      state(
        'hide-image',
        style({
          opacity: '0',
        })
      ),
      transition('show-image <=> hide-image', animate('500ms ease-in')),
    ]),
  ],
})
export class AvatarComponent implements AfterViewInit {
  /**
   * @constant imageCtrl this const it will give us the control if we should show the img or not we should show
   * @constant contentCtrl this const it will give us the control if we should show the img or not we should show
   * @constant viewImage :false img didt not loaded
   * @constant lImage : referent img
   * @constant clientesSubscription : subscribe control
   * @method ngOnDestroy() return void, unsubcribe
   * @method ngAfterViewInit() see event (Photo,onload,error)
   */
  public imageCtrl = 'hide-image';
  public contentCtrl = 'show-image';
  public SRC: string | undefined;
  @ViewChild('lImage') lImage!: ElementRef;
  // Lisent imagen change.
  @Input('url') set url(url: string) {
    if (url) {
      this.SRC = environment.CONTACT_URL + 'imagen/' + url;
      return;
    } else {
      this.SRC = environment.CONTACT_URL + 'photo/vue.jpg';
      return;
    }
  }
  constructor() {}
  ngAfterViewInit(): void {
    this.imageCtrl = 'hide-image';
    this.contentCtrl = 'show-image';
    this.lImage.nativeElement.onload = () => {
      console.log('onLoad');
      this.imageCtrl = 'show-image';
      this.contentCtrl = 'hide-image';
    };
    this.lImage.nativeElement.onerror = () => {
      this.SRC = environment.CONTACT_URL + 'photo/vue.jpg';
    };
  }
}
