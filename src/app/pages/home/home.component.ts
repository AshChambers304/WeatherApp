import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { WeatherData } from 'src/app/shared/models/weather-data';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}

  public pollTimer = this.weatherService.pollTimer;

  public currentWeather: WeatherData = {
    coord: { lon: 0, lat: 0 },
    weather: [],
    base: '',
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
    },
    visibility: 0,
    wind: { speed: 0, deg: 0 },
    clouds: { all: 0 },
    dt: 0,
    sys: {
      type: 0,
      id: 0,
      message: 0,
      country: '',
      sunrise: 0,
      sunset: 0,
    },
    timezone: 0,
    id: 0,
    name: '',
    cod: 0,
  };

  ngOnInit(): void {
    this.weatherService
      .getWeather()
      .subscribe((data) => (this.currentWeather = data));

    /*this.weatherService.pollTimer.interval = setInterval(() => {
      this.weatherService
        .getWeather()
        .subscribe((data) => (this.currentWeather = data));

      this.weatherService.pollTimer.pollCount++;

      console.log('No. of updates: ' + this.weatherService.pollTimer.pollCount);
    }, 60000);*/
  }

  ngOnDestroy(): void {
    this.weatherService.pollTimer.interval = null;
  }
}
