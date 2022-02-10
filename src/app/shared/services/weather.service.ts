import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherData } from '../models/weather-data';
import { Observable } from 'rxjs';
import { PollTimer } from '../models/poll-timer';
import { GeoData } from '../models/geo-data';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  public pollTimer: PollTimer = { pollCount: 0, interval: null };

  public lat: number = 0;
  public lon: number = 0;

  public geoData: GeoData[] = [
    {
      name: '',
      local_names: {
        af: '',
        ar: '',
        ascii: '',
        az: '',
        bg: '',
        ca: '',
        da: '',
        de: '',
        el: '',
        en: '',
        eu: '',
        fa: '',
        feature_name: '',
        fi: '',
        fr: '',
        gl: '',
        he: '',
        hi: '',
        hr: '',
        hu: '',
        id: '',
        it: '',
        ja: '',
        la: '',
        lt: '',
        mk: '',
        nl: '',
        no: '',
        pl: '',
        pt: '',
        ro: '',
        ru: '',
        sk: '',
        sl: '',
        sr: '',
        th: '',
        tr: '',
        vi: '',
        zu: '',
      },
      lat: 0,
      lon: 0,
      country: '',
    },
  ];

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

  constructor(private http: HttpClient) {}

  getGeocoding(url: string) {
    return this.http.get<GeoData[]>(url);
  }

  getWeather(url: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(url);
  }
}
