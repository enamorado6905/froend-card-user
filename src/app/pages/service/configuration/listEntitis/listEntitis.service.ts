import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListEntitisService {
  public setOfCheckedId = new Set<string>(); // list id
  public checked = false; // select item
  public list: Array<any> = []; // list all item
  public listIdSelect: string[] = []; // list item select
  public indeterminate = false;
  public listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      },
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.list.forEach((data, index) =>
          this.updateCheckedSet(data?._id!, index % 2 !== 0)
        );
        this.refreshCheckedStatus();
      },
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.list.forEach((data, index) =>
          this.updateCheckedSet(data?._id!, index % 2 === 0)
        );
        this.refreshCheckedStatus();
      },
    },
  ];

  constructor() {}

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }
  onAllChecked(value: boolean): void {
    this.list.forEach((item: any) => this.updateCheckedSet(item?._id!, value));
    this.refreshCheckedStatus();
  }
  refreshCheckedStatus(): void {
    this.checked = this.list.every((item: any) =>
      this.setOfCheckedId.has(item?._id!)
    );
    this.indeterminate =
      this.list.some((item: any) => this.setOfCheckedId.has(item?._id!)) &&
      !this.checked;
  }
  private updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
      this.listIdSelect.push(id);
    } else {
      this.setOfCheckedId.delete(id);
      this.clearIdDelete(id);
    }
  }
  clearSetIdDelete(): void {
    this.indeterminate = false;
    this.checked = false;
    this.setOfCheckedId.forEach((m) => this.setOfCheckedId.delete(m));
    this.listIdSelect.forEach(() => this.listIdSelect.pop());
  }
  private clearIdDelete(id: string): void {
    let cont = 0;
    for (const item of this.listIdSelect) {
      if (item === id) {
        this.listIdSelect.splice(cont, 1);
        break;
      }
      cont++;
    }
  }
}
