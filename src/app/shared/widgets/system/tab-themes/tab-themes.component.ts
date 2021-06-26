import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/theme/theme.service';

@Component({
  selector: 'app-tab-themes',
  template: ` <div class="trigger-item">
    <i nz-icon nzType="skin" nzTheme="outline" (click)="toggleTheme()"></i>
  </div>`,
})
export class TabThemesComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {}
  toggleTheme(): void {
    this.themeService.toggleTheme().then();
  }
}
