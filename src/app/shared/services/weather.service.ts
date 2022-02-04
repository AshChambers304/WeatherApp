import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherData } from '../models/weather-data';
import { Observable } from 'rxjs';
import { PollTimer } from '../models/poll-timer';
import { LocationData } from '../models/location-data';
import { IPGeolocationService } from './ip-geolocation.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  public pollTimer: PollTimer = { pollCount: 0, interval: null };

  public lat: number = 0;
  public lon: number = 0;

  private _url: string =
    'https://api.openweathermap.org/data/2.5/weather?lat=' +
    this.lat +
    '&lon=' +
    this.lon +
    '&appid=3980f86beb307e02c02a934d721a19a7';

  constructor(private http: HttpClient) {}

  getWeather(): Observable<WeatherData> {
    return this.http.get<WeatherData>(this._url);
  }
}
