import { Component, OnInit, Renderer2 } from '@angular/core';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { WeatherData } from 'src/app/shared/models/weather-data';
import { mergeMap, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faWater,
  faWind,
  faHandHoldingWater,
  faSun,
  faCloudDownloadAlt,
} from '@fortawesome/free-solid-svg-icons';
import { GeoData } from 'src/app/shared/models/geo-data';

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

  constructor(
    private weatherService: WeatherService,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((val) => {
      this.day = this.route.snapshot.firstChild?.params['type'];
    });
  }

  public currentWeather: WeatherData = this.weatherService.currentWeather;

  public currentLocationName: string = '';

  public isWeatherDataLoaded: Promise<boolean> = Promise.resolve(false);

  public pollTimer = this.weatherService.pollTimer;

  public dayWeather: {
    route: string;
    date: string;
  }[] = [
    {
      route: 'day1',

      date: '',
    },
    {
      route: 'day2',

      date: '',
    },
    {
      route: 'day3',

      date: '',
    },
    {
      route: 'day4',

      date: '',
    },
    {
      route: 'day5',

      date: '',
    },
    {
      route: 'day6',

      date: '',
    },
    {
      route: 'day7',

      date: '',
    },
  ];

  public day!: string;

  public selectedDay!: number;

  setSelectedDay(dayID: number) {
    this.selectedDay = dayID;
  }

  ngOnInit(): void {
    this.setSelectedDay(0);

    this.isWeatherDataLoaded = Promise.resolve(false);
    this.weatherService
      .getLocation()
      .pipe(
        mergeMap((position) => {
          this.weatherService.currentLocation = position;
          this.weatherService.lat =
            this.weatherService.currentLocation.coords.latitude;
          this.weatherService.lon =
            this.weatherService.currentLocation.coords.longitude;

          return this.weatherService
            .getLocationName(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${this.weatherService.lat}&lon=${this.weatherService.lon}&limit=1&appid=3980f86beb307e02c02a934d721a19a7`
            )
            .pipe(
              mergeMap((weatherGeoData) => {
                this.weatherService.currentWeatherGeo = weatherGeoData;
                this.currentLocationName =
                  this.weatherService.currentWeatherGeo[0].name;

                return this.weatherService.getWeather(
                  `https://api.openweathermap.org/data/2.5/onecall?lat=${this.weatherService.lat}&lon=${this.weatherService.lon}&units=metric&appid=3980f86beb307e02c02a934d721a19a7`
                );
              })
            );
        })
      )
      .subscribe((weather) => {
        this.weatherService.currentWeather = weather;
        this.currentWeather = this.weatherService.currentWeather;

        for (let i = 0; i < this.dayWeather.length; i++) {
          this.dayWeather[i].date = new Date(
            this.currentWeather.daily[i].dt * 1000
          ).toUTCString();
        }

        this.isWeatherDataLoaded = Promise.resolve(true);
      });

    this.weatherService.pollTimer.interval = setInterval(() => {
      this.isWeatherDataLoaded = Promise.resolve(false);
      this.weatherService
        .getLocation()
        .pipe(
          mergeMap((position) => {
            this.weatherService.currentLocation = position;
            this.weatherService.lat =
              this.weatherService.currentLocation.coords.latitude;
            this.weatherService.lon =
              this.weatherService.currentLocation.coords.longitude;

            return this.weatherService
              .getLocationName(
                `https://api.openweathermap.org/geo/1.0/reverse?lat=${this.weatherService.lat}&lon=${this.weatherService.lon}&limit=1&appid=3980f86beb307e02c02a934d721a19a7`
              )
              .pipe(
                mergeMap((weatherGeoData) => {
                  this.weatherService.currentWeatherGeo = weatherGeoData;
                  this.currentLocationName =
                    this.weatherService.currentWeatherGeo[0].name;

                  return this.weatherService.getWeather(
                    `https://api.openweathermap.org/data/2.5/onecall?lat=${this.weatherService.lat}&lon=${this.weatherService.lon}&units=metric&appid=3980f86beb307e02c02a934d721a19a7`
                  );
                })
              );
          })
        )
        .subscribe((weather) => {
          this.weatherService.currentWeather = weather;
          this.currentWeather = this.weatherService.currentWeather;

          for (let i = 0; i < this.dayWeather.length; i++) {
            this.dayWeather[i].date = new Date(
              this.currentWeather.daily[i].dt * 1000
            ).toUTCString();
          }

          this.isWeatherDataLoaded = Promise.resolve(true);
        });

      this.weatherService.pollTimer.pollCount++;
    }, 600000);
  }
}
