import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocationData } from '../models/location-data';
import { PollTimer } from '../models/poll-timer';

@Injectable({
  providedIn: 'root',
})
export class IPGeolocationService {
  public pollTimer: PollTimer = { pollCount: 0, interval: null };

  public lat: number = 0;
  public lon: number = 0;

  public currentLocation: LocationData = {
    query: '',
    status: '',
    country: '',
    countryCode: '',
    region: '',
    regionName: '',
    city: '',
    zip: '',
    lat: 0,
    lon: 0,
    timezone: '',
    isp: '',
    org: '',
    as: '',
  };

  constructor(private http: HttpClient) {}

  getLocation(url: string): Observable<LocationData> {
    return this.http.get<LocationData>(url);
  }
}
