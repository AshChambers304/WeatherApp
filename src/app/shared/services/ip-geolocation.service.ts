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

  private _url: string = 'http://ip-api.com/json/';

  constructor(private http: HttpClient) {}

  getLocation(): Observable<LocationData> {
    return this.http.get<LocationData>(this._url);
  }
}
