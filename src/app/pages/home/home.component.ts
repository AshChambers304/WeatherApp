import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  public currentTime: string = '';

  getCurrentDate(): void {
    setInterval(() => {
      this.currentTime = new Date().toUTCString().slice(0, 22).toString();
    }, 500);
  }

  ngOnInit(): void {
    this.getCurrentDate();
  }

  switchTheme() {
    this.themeService.switchTheme();
  }
}
