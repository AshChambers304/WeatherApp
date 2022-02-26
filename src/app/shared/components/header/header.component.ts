import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NavigationService } from '../../services/navigation.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faBars = faBars;

  public themeName = this.themeService.currentThemeName;
  public themeIcon = this.themeService.currentThemeIcon;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.getCurrentDate();
  }

  switchTheme(): void {
    this.themeService.switchTheme();

    this.themeName = this.themeService.currentThemeName;
    this.themeIcon = this.themeService.currentThemeIcon;
  }

  public currentTime: string = '';

  getCurrentDate(): void {
    setInterval(() => {
      this.currentTime = new Date().toUTCString().slice(0, 22).toString();
    }, 500);
  }
}
