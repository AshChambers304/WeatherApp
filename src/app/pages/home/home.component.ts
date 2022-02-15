import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { WeatherData } from 'src/app/shared/models/weather-data';
import { IPGeolocationService } from 'src/app/shared/services/ip-geolocation.service';
import { mergeMap } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('day') day!: ViewChild;

  constructor(
    private weatherService: WeatherService,
    private locService: IPGeolocationService,
    private renderer: Renderer2
  ) {}

  public pollTimer = this.weatherService.pollTimer;

  public isWeatherDataLoaded: Promise<boolean> = Promise.resolve(false);

  public currentWeather: WeatherData = this.weatherService.currentWeather;

  ngOnInit(): void {
    this.locService
      .getLocation(
        'https://api.ipgeolocation.io/ipgeo?apiKey=49a5d14471df45129ca6f68faadc4edd'
      )
      .pipe(
        mergeMap((locData) => {
          this.locService.currentLocation = locData;
          return this.weatherService
            .getGeocoding(
              `https://api.openweathermap.org/geo/1.0/direct?q=${this.locService.currentLocation.city},${this.locService.currentLocation.country}&limit=1&appid=3980f86beb307e02c02a934d721a19a7`
            )
            .pipe(
              mergeMap((geoData) => {
                this.weatherService.geoData = geoData;
                return this.weatherService.getWeather(
                  `https://api.openweathermap.org/data/2.5/weather?lat=${this.weatherService.geoData[0].lat}&lon=${this.weatherService.geoData[0].lon}&appid=3980f86beb307e02c02a934d721a19a7`
                );
              })
            );
        })
      )
      .subscribe((weatherData) => {
        this.weatherService.currentWeather = weatherData;
        this.currentWeather = this.weatherService.currentWeather;

        this.isWeatherDataLoaded = Promise.resolve(true);
      });

    this.weatherService.pollTimer.interval = setInterval(() => {
      this.isWeatherDataLoaded = Promise.resolve(false);
      this.locService
        .getLocation('http://ip-api.com/json/')
        .pipe(
          mergeMap((locData) => {
            this.locService.currentLocation = locData;
            return this.weatherService
              .getGeocoding(
                `http://api.openweathermap.org/geo/1.0/direct?q=${this.locService.currentLocation.city},${this.locService.currentLocation.country}&limit=1&appid=3980f86beb307e02c02a934d721a19a7`
              )
              .pipe(
                mergeMap((geoData) => {
                  this.weatherService.geoData = geoData;
                  return this.weatherService.getWeather(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${this.weatherService.geoData[0].lat}&lon=${this.weatherService.geoData[0].lon}&appid=3980f86beb307e02c02a934d721a19a7`
                  );
                })
              );
          })
        )
        .subscribe((weatherData) => {
          this.weatherService.currentWeather = weatherData;
          this.currentWeather = this.weatherService.currentWeather;

          this.isWeatherDataLoaded = Promise.resolve(true);
        });

      this.weatherService.pollTimer.pollCount++;
    }, 600000);
  }

  setSelectedDay(id: number): void {
    let elements = document.getElementsByClassName('scroll-element');

    for (let i = 0; i < elements.length; i++) {
      if (id == i) {
        this.renderer.addClass(elements[i], 'selected');
      } else this.renderer.removeClass(elements[i], 'selected');
    }
  }
}
