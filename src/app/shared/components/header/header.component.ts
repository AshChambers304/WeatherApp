import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faBars = faBars;

  public isOpen: boolean = false;

  constructor(private navService: NavigationService) {}

  ngOnInit(): void {
    this.getCurrentDate();
  }

  public currentTime: string = '';

  getCurrentDate(): void {
    setInterval(() => {
      this.currentTime = new Date().toUTCString().slice(0, 22).toString();
    }, 500);
  }

  toggleSideNav(): void {
    this.navService.toggleNav();
  }
}
