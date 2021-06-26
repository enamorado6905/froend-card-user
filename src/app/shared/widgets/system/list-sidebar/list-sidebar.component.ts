import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared.service';
import { AuthorizationService } from 'src/app/core/authorization/rol.authorization';
export enum Roles {
  ADM = 'ADM',
}

@Component({
  selector: 'app-list-sidebar',
  template: `
    <ul
      nz-menu
      nzMode="inline"
      class="menu"
      [nzInlineCollapsed]="sharedService.isCollapsed_"
    >
      <ng-container
        *ngTemplateOutlet="menuTpl; context: { $implicit: menus }"
      ></ng-container>
      <ng-template #menuTpl let-menus>
        <ng-container *ngFor="let menu of menus">
          <li
            *ngIf="!menu.children && menu.roles.includes(auth.GET_ROL())"
            nz-menu-item
            [nzPaddingLeft]="menu.paddingleft * 15"
            [nzDisabled]="menu.disabled"
            [nzSelected]="menu.open"
          >
            <i nz-icon [nzType]="menu.icon" *ngIf="menu.icon"></i>
            <a [routerLink]="menu.path">
              <span>{{ menu.title | translate }}</span>
            </a>
          </li>
          <li
            *ngIf="menu.children && menu.roles.includes(auth.GET_ROL())"
            nz-submenu
            [nzPaddingLeft]="menu.paddingleft * 15"
            [(nzOpen)]="menu.open"
            [nzTitle]="menu.title | translate"
            [nzIcon]="menu.icon"
            [nzDisabled]="menu.disabled"
            (nzOpenChange)="openHandler(menu.level, menu.title)"
          >
            <ul>
              <ng-container
                *ngTemplateOutlet="
                  menuTpl;
                  context: { $implicit: menu.children }
                "
              ></ng-container>
            </ul>
          </li>
        </ng-container>
      </ng-template>
    </ul>
  `,
})
export class ListSidebarComponent implements OnInit {
  routerAdm = 'gestion/adm/';
  routerUser = 'gestion/usuario/';
  routerDayRental = 'gestion/drenta/';
  routerRental = 'gestion/renta/';
  routerPrice = 'gestion/compra/';
  routerCard = 'gestion/carro/';
  constructor(
    public sharedService: SharedService,
    public auth: AuthorizationService
  ) {}

  public menus = [
    {
      level: 1,
      title: 'app-sidebar.label.menu-link-sub-Manage',
      icon: 'appstore',
      open: true,
      selected: false,
      disable: false,
      roles: [Roles.ADM],
      children: [
        {
          level: 2,
          paddingleft: 2,
          path: '/adm',
          title: 'app-sidebar.label.menu-link-sub-Manage-sub-adm',
          icon: 'bars',
          open: false,
          selected: false,
          disable: false,
          roles: [Roles.ADM],
          children: [
            {
              level: 3,
              paddingleft: 3,
              path: `${this.routerAdm}adicionar`,
              title: 'app-sidebar.label.menu-link-sub-Manage-sub-1',
              selected: false,
              disable: false,
              roles: [Roles.ADM],
            },
            {
              level: 3,
              paddingleft: 3,
              path: `${this.routerAdm}listado`,
              title: 'app-sidebar.label.menu-link-sub-Manage-sub-2',
              selected: false,
              disable: false,
              roles: [Roles.ADM],
            },
          ],
        },
        {
          level: 2,
          paddingleft: 2,
          title: 'app-sidebar.label.menu-link-sub-Manage-sub-user',
          path: '/user',
          icon: 'bars',
          open: false,
          selected: false,
          disable: false,
          roles: [Roles.ADM],
          children: [
            {
              level: 3,
              paddingleft: 3,
              path: `${this.routerUser}adicionar`,
              title: 'app-sidebar.label.menu-link-sub-Manage-sub-1',
              selected: false,
              disable: false,
              roles: [Roles.ADM],
            },
            {
              level: 3,
              paddingleft: 3,
              path: `${this.routerUser}listado`,
              title: 'app-sidebar.label.menu-link-sub-Manage-sub-2',
              selected: false,
              disable: false,
              roles: [Roles.ADM],
            },
          ],
        },
        {
          level: 2,
          paddingleft: 2,
          path: '/drenta',
          title: 'app-sidebar.label.menu-link-sub-Manage-sub-dayrental',
          icon: 'bars',
          open: false,
          selected: false,
          disable: false,
          roles: [Roles.ADM],
          children: [
            {
              level: 3,
              paddingleft: 3,
              path: `${this.routerDayRental}adicionar`,
              title: 'app-sidebar.label.menu-link-sub-Manage-sub-1',
              selected: false,
              disable: false,
              roles: [Roles.ADM],
            },
            {
              level: 3,
              paddingleft: 3,
              path: `${this.routerDayRental}listado`,
              title: 'app-sidebar.label.menu-link-sub-Manage-sub-2',
              selected: false,
              disable: false,
              roles: [Roles.ADM],
            },
          ],
        },
        {
          level: 2,
          paddingleft: 2,
          title: 'app-sidebar.label.menu-link-sub-Manage-sub-rental',
          path: '/',
          icon: 'bars',
          open: false,
          selected: false,
          disable: false,
          roles: [Roles.ADM],
          children: [
            {
              level: 3,
              paddingleft: 3,
              path: `${this.routerRental}adicionar`,
              title: 'app-sidebar.label.menu-link-sub-Manage-sub-1',
              selected: false,
              disable: false,
              roles: [Roles.ADM],
            },
            {
              level: 3,
              paddingleft: 3,
              path: `${this.routerRental}listado`,
              title: 'app-sidebar.label.menu-link-sub-Manage-sub-2',
              selected: false,
              disable: false,
              roles: [Roles.ADM],
            },
          ],
        },
        {
          level: 2,
          paddingleft: 2,
          title: 'app-sidebar.label.menu-link-sub-Manage-sub-price',
          path: '/compra',
          icon: 'bars',
          open: false,
          selected: false,
          disable: false,
          roles: [Roles.ADM],
          children: [
            {
              level: 3,
              paddingleft: 3,
              path: `${this.routerPrice}adicionar`,
              title: 'app-sidebar.label.menu-link-sub-Manage-sub-1',
              selected: false,
              disable: false,
              roles: [Roles.ADM],
            },
            {
              level: 3,
              paddingleft: 3,
              path: `${this.routerPrice}listado`,
              title: 'app-sidebar.label.menu-link-sub-Manage-sub-2',
              selected: false,
              disable: false,
              roles: [Roles.ADM],
            },
          ],
        },
        {
          level: 2,
          paddingleft: 2,
          title: 'app-sidebar.label.menu-link-sub-Manage-sub-card',
          path: '/carro',
          icon: 'bars',
          open: false,
          selected: false,
          disable: false,
          roles: [Roles.ADM],
          children: [
            {
              level: 3,
              paddingleft: 3,
              path: `${this.routerCard}adicionar`,
              title: 'app-sidebar.label.menu-link-sub-Manage-sub-1',
              selected: false,
              disable: false,
              roles: [Roles.ADM],
            },
            {
              level: 3,
              paddingleft: 3,
              path: `${this.routerCard}listado`,
              title: 'app-sidebar.label.menu-link-sub-Manage-sub-2',
              selected: false,
              disable: false,
              roles: [Roles.ADM],
            },
          ],
        },
      ],
    },
  ];
  ngOnInit(): void {}
  openHandler(level: number, title: string): void {}
}
