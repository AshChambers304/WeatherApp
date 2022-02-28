import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherData } from '../models/weather-data';
import { Observable } from 'rxjs';
import { PollTimer } from '../models/poll-timer';
import { GeoData } from '../models/geo-data';
import { WeatherGeoData } from '../models/weather-geo-data';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  public pollTimer: PollTimer = { pollCount: 0, interval: null };

  public lat: number = 0;
  public lon: number = 0;

  public currentLocation: GeoData = {
    coords: {
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      latitude: 0,
      longitude: 0,
      speed: 0,
    },
    timestamp: 0,
  };

  public currentWeather: WeatherData = {
    alerts: [],
    current: {
      clouds: 0,
      dew_point: 0,
      dt: 0,
      feels_like: 0,
      humidity: 0,
      pressure: 0,
      sunrise: 0,
      sunset: 0,
      temp: 0,
      uvi: 0,
      visibility: 0,
      weather: [],
      wind_deg: 0,
      wind_gust: 0,
      wind_speed: 0,
    },
    daily: [],
    hourly: [],
    lat: 0,
    lon: 0,
    minutely: [],
    timezone: '',
    timezone_offset: 0,
  };

  public currentWeatherGeo!: WeatherGeoData[];

  constructor(private http: HttpClient) {}

  getLocation(): Observable<GeoData> {
    return Observable.create((observer: any) => {
      window.navigator.geolocation.getCurrentPosition(
        (position: GeoData) => {
          observer.next(position);
          observer.complete();
        },
        (error) => observer.error(error)
      );
    });
  }

  getLocationName(url: string): Observable<WeatherGeoData[]> {
    return this.http.get<WeatherGeoData[]>(url);
  }

  getWeather(url: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(url);
  }
}
