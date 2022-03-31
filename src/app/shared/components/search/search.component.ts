import { Component, OnInit } from '@angular/core';
import {
  faSearch,
  faWindowClose,
  faCrosshairs,
} from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../../services/weather.service';
import { FormControl } from '@angular/forms';
import { WeatherGeoData } from '../../models/weather-geo-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;
  faWindowClose = faWindowClose;
  faLocationArrow = faCrosshairs;

  locationQueryControl = new FormControl('');

  public _searchQuery: string = '';

  public isQueryDataLoaded: boolean = false;

  public isWeatherDataLoaded: boolean = false;

  public isSearchActive: boolean = false;

  public queryTimeout!: NodeJS.Timeout;

  public queryLocationData: WeatherGeoData[] = [];

  public isDropDownOpen: boolean = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.locationQueryControl.valueChanges.subscribe((query) => {
      this.isQueryDataLoaded = false;
      this.isSearchActive = true;
      this.queryLocationData = [];
      this.stopQueryTimer(this.queryTimeout);
      this.startQueryTimer(query);
    });
  }

  startQueryTimer(queryLocation: string): void {
    this._searchQuery = queryLocation;
    if (queryLocation != '') {
      this.queryTimeout = setTimeout(() => {
        this.getSearchedLocation(queryLocation);
      }, 2000);
    } else {
      this.isSearchActive = false;
      this.hideDropdown();
    }
  }

  stopQueryTimer(timerID: NodeJS.Timeout): void {
    clearTimeout(timerID);
  }

  getSearchedLocation(searchedLocation: string): void {
    this.weatherService.fetchSearchedLocation(searchedLocation);

    this.weatherService.isQueryDataLoaded$.subscribe((result) => {
      this.isQueryDataLoaded = result;

      if (this.isQueryDataLoaded) {
        console.log(this.weatherService.searchedLocation);

        this.queryLocationData = this.weatherService.searchedLocation;
        this.showDropdown();
      }
    });
  }

  getCurrentLocationWeather(): void {
    this.weatherService.fetchCurrentLocationWeather();
  }

  setQuerySelectionIndex(newIndex: number): void {
    this.getSearchedLocationWeather(newIndex);
    this.isSearchActive = false;
    this.hideDropdown();
  }

  getSearchedLocationWeather(newIndex: number): void {
    this.weatherService.fetchSearchedLocationWeather(newIndex);
  }

  showDropdown(): void {
    if (this._searchQuery != '') {
      setTimeout(() => {
        this.isDropDownOpen = true;
      }, 100);
    }
  }

  hideDropdown(): void {
    setTimeout(() => {
      this.isDropDownOpen = false;
    }, 100);
  }
}
