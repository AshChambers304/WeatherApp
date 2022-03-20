import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherData } from '../models/weather-data';
import { mergeMap, Observable, Subject } from 'rxjs';
import { PollTimer } from '../models/poll-timer';
import { GeoData } from '../models/geo-data';
import { WeatherGeoData } from '../models/weather-geo-data';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  public pollTimer: PollTimer = { pollCount: 0, interval: null };

  public lat!: number;
  public lon!: number;

  public isWeatherDataLoaded$: Subject<boolean> = new Subject<boolean>();

  public currentLocationName!: string;

  public currentLocation!: GeoData;

  public currentWeather!: WeatherData;

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

  getCurrentLocationWeather(): void {
    this.isWeatherDataLoaded$.next(false);
    this.getLocation()
      .pipe(
        mergeMap((position) => {
          this.currentLocation = position;
          this.lat = this.currentLocation.coords.latitude;
          this.lon = this.currentLocation.coords.longitude;

          return this.getLocationName(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${this.lat}&lon=${this.lon}&limit=1&appid=3980f86beb307e02c02a934d721a19a7`
          ).pipe(
            mergeMap((weatherGeoData) => {
              this.currentWeatherGeo = weatherGeoData;
              this.currentLocationName = this.currentWeatherGeo[0].name;

              return this.getWeather(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&units=metric&appid=3980f86beb307e02c02a934d721a19a7`
              );
            })
          );
        })
      )
      .subscribe((weather) => {
        this.currentWeather = weather;

        this.isWeatherDataLoaded$.next(true);
      });
  }
}
