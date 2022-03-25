import { Component, OnInit } from '@angular/core';
import {
  faWater,
  faWind,
  faHandHoldingWater,
  faSun,
  faCloudDownloadAlt,
} from '@fortawesome/free-solid-svg-icons';
import { WeatherData } from 'src/app/shared/models/weather-data';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  faWater = faWater;
  faSun = faSun;
  faWind = faWind;
  faCloudDownloadAlt = faCloudDownloadAlt;
  faHandHoldingWater = faHandHoldingWater;

  constructor(private weatherService: WeatherService) {}

  public selectedDay!: number;

  public currentWeather!: WeatherData;

  public isWeatherDataLoaded: boolean = false;

  public pollTimer = this.weatherService.pollTimer;

  public currentLocationName!: string;

  getCurrentLocationWeather(): void {
    this.weatherService.fetchCurrentLocationWeather();

    this.weatherService.isWeatherDataLoaded$.subscribe((result) => {
      this.isWeatherDataLoaded = result;

      if (this.isWeatherDataLoaded) {
        this.currentWeather = this.weatherService.currentWeather;

        this.currentLocationName = this.weatherService.currentLocationName;
      }
    });
  }

  ngOnInit(): void {
    this.setSelectedDay(0);
    this.getCurrentLocationWeather();
  }

  ngOnDestroy(): void {
    this.weatherService.isWeatherDataLoaded$.unsubscribe();
  }

  setSelectedDay(dayID: number): void {
    this.selectedDay = dayID;
  }

  convertDate(date: number): Date {
    return new Date(date * 1000);
  }
}
