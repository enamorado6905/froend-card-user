import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  public sidebarColor: string = 'red';

  constructor() {}

  ngOnInit() {}
  ngOnDestroy() {}
}
