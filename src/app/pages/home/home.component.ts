import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  public currentTime: Date = new Date();

  getCurrentDate(): void {
    setInterval(() => {
      this.currentTime = new Date();
    }, 60000);
  }

  ngOnInit(): void {
    this.getCurrentDate();
  }

  switchTheme() {
    this.themeService.switchTheme();
  }
}
