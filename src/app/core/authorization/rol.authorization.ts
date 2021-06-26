import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  decodedToken: any;
  constructor(
    private rolesService: NgxRolesService,
    private permissionsService: NgxPermissionsService,
    private jwt: JwtHelperService
  ) {}
  public GET_ROL_PERMISSIONS(): void {
    this.decodedToken = this.jwt.decodeToken(this.jwt.tokenGetter());
    this.rolesService.addRole(this.decodedToken?.rol, this.decodedToken?.rol);
    this.permissionsService.addPermission(this.decodedToken?.rol);
  }
  public GET_ROL(): string {
    return this.rolesService.getRole(this.decodedToken?.rol)?.name;
  }
  public RE_LOAD_ROL_PERMISSIONS(): void {
    this.rolesService.flushRolesAndPermissions();
    this.GET_ROL_PERMISSIONS();
  }
}
