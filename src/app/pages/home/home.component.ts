import { AfterContentInit, Component, OnInit, Renderer2 } from '@angular/core';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { WeatherData } from 'src/app/shared/models/weather-data';
import { IPGeolocationService } from 'src/app/shared/services/ip-geolocation.service';
import { mergeMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterContentInit {
  constructor(
    private weatherService: WeatherService,
    private locService: IPGeolocationService,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log();

    this.router.events.subscribe((val) => {
      this.day = this.route.snapshot.firstChild?.params['type'];
    });
  }

  public currentWeather: WeatherData = this.weatherService.currentWeather;

  public isWeatherDataLoaded: Promise<boolean> = Promise.resolve(false);

  public pollTimer = this.weatherService.pollTimer;

  public dayWeather: {
    route: string;
    day: string;
    date: string;
  }[] = [
    {
      route: 'day1',
      day: 'Sun',
      date: '17/02',
    },
    {
      route: 'day2',
      day: 'Mon',
      date: '18/02',
    },
    {
      route: 'day3',
      day: 'Tue',
      date: '19/02',
    },
    {
      route: 'day4',
      day: 'Wed',
      date: '20/02',
    },
    {
      route: 'day5',
      day: 'Thu',
      date: '21/02',
    },
    {
      route: 'day6',
      day: 'Fri',
      date: '22/02',
    },
    {
      route: 'day7',
      day: 'Sat',
      date: '23/02',
    },
  ];

  public day!: string;

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

  ngAfterContentInit(): void {
    for (let i = 0; i < this.dayWeather.length; i++) {
      if (
        this.route.snapshot.firstChild?.params['type'] ==
        this.dayWeather[i].route
      ) {
        this.setSelectedDay(i);
      }
    }
  }

  setSelectedDay(id: number): void {
    let elements = document.getElementsByClassName('element-wrapper');

    for (let i = 0; i < elements.length; i++) {
      if (id == i) {
        elements[i].classList.add('selected');
      } else elements[i].classList.remove('selected');
    }
  }
}
