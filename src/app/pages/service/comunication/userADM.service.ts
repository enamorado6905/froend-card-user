import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ListEntitisService } from 'src/app/pages/service/configuration/listEntitis/listEntitis.service';
import { NZConfZorroService } from 'src/app/core/ng-zorro/nz-conf-zorro.service';

@Injectable({
  providedIn: 'root',
})
export class UserADMCOMService {
  public IDManageList: string | undefined;
  public IDSManageList: Array<string> = [];
  public openOperation = false;
  private url = 'gestion/adm';
  public subjectOperation = new Subject<void>();
  constructor(
    private router: Router,
    public listEntitis: ListEntitisService,
    public nzZorro: NZConfZorroService
  ) {}
  openListDate(): void {
    this.router.navigateByUrl(`${this.url}/listado`);
  }
  openShowDate(id: string): void {
    this.IDManageList = id;
    this.openOperation = true;
    this.router.navigate([this.url, { outlets: { drawer: `mostrar/${id}` } }]);
  }
  openEditDate(id: string): void {
    this.IDManageList = id;
    this.openOperation = true;
    this.router.navigate([this.url, { outlets: { drawer: `editar/${id}` } }]);
  }
  openDeleteDate(id: string): void {
    this.IDManageList = id;
    this.openOperation = true;
    this.router.navigate([this.url, { outlets: { modal: `eliminar/${id}` } }]);
  }
  openDeletesDate(): void {
    this.IDSManageList = this.listEntitis.listIdSelect;
    this.openOperation = true;
    this.router.navigate([this.url, { outlets: { modal: `eliminar` } }]);
  }
  subcribeLayoutChanges(): Subscription {
    const subscribe = this.nzZorro.layoutChanges.subscribe(() => {
      this.nzZorro.updateMyLayoutForOrientationChange();
    });
    return subscribe;
  }
}
