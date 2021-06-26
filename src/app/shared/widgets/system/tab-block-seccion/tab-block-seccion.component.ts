import { Component, OnInit } from '@angular/core';
import { VerifyTokenService } from 'src/app/pages/service/configuration/auth/verify_token.service';

@Component({
  selector: 'app-tab-block-seccion',
  template: `<div class="trigger-item" (click)="verifyToken.logoutToken()">
    <i nz-icon nzType="lock" nzTheme="outline"></i>
  </div>`,
})
export class TabBlockSeccionComponent implements OnInit {
  constructor(public verifyToken: VerifyTokenService) {}

  ngOnInit(): void {}
}
