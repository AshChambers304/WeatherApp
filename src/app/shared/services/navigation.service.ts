import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  public isNavOpen: boolean = false;

  constructor() {}

  openNav(): void {
    this.isNavOpen = true;
  }

  closeNav(): void {
    this.isNavOpen = false;
  }

  toggleNav(): void {
    this.isNavOpen ? this.closeNav() : this.openNav();
  }
}
