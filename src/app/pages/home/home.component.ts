import { Component, OnInit, Renderer2 } from '@angular/core';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { WeatherData } from 'src/app/shared/models/weather-data';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faWater,
  faWind,
  faHandHoldingWater,
  faSun,
  faCloudDownloadAlt,
} from '@fortawesome/free-solid-svg-icons';

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
    public weatherService: WeatherService,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((val) => {
      this.day = this.route.snapshot.firstChild?.params['type'];
    });
  }

  public currentWeather!: WeatherData;

  public isWeatherDataLoaded: boolean = false;

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

  public currentLocationName!: string;

  ngOnInit(): void {
    this.setSelectedDay(0);

    this.getCurrentLocationWeather();
  }

  setSelectedDay(dayID: number) {
    this.selectedDay = dayID;
  }

  getCurrentLocationWeather(): void {
    this.weatherService.getCurrentLocationWeather();

    this.weatherService.isWeatherDataLoaded$.subscribe((result) => {
      this.isWeatherDataLoaded = result;

      if (this.isWeatherDataLoaded) {
        this.currentWeather = this.weatherService.currentWeather;

        this.currentLocationName = this.weatherService.currentLocationName;
      }
    });
  }
}
