import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherData } from '../models/weather-data';
import { Observable } from 'rxjs';
import { PollTimer } from '../models/poll-timer';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  public pollTimer: PollTimer = { pollCount: 0, interval: null };

  private _url: string =
    'https://api.openweathermap.org/data/2.5/weather?lat=51.509865&lon=-0.118092&appid=3980f86beb307e02c02a934d721a19a7';

  constructor(private http: HttpClient) {}

  getWeather(): Observable<WeatherData> {
    return this.http.get<WeatherData>(this._url);
  }
}
