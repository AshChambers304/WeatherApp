import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.getCurrentDate();
  }

  public currentTime: string = '';

  getCurrentDate(): void {
    setInterval(() => {
      this.currentTime = new Date().toUTCString().slice(0, 22).toString();
    }, 500);
  }

  switchTheme() {
    this.themeService.switchTheme();
  }
}
