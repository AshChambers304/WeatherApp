import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;

  public _searchQuery: string = '';

  public isWeatherDataLoaded: boolean = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}

  getSearchedLocationWeather(searchedLocation: string): void {
    this.weatherService.fetchSearchedLocationWeather(searchedLocation);

    this.weatherService.isWeatherDataLoaded$.subscribe((result) => {
      this.isWeatherDataLoaded = result;

      if (this.isWeatherDataLoaded) {
        console.log(this.weatherService.searchedLocation);
      }
    });
  }

  get searchQuery() {
    return this._searchQuery;
  }

  set searchQuery(newQuery: string) {
    this._searchQuery = newQuery;

    console.log(this.searchQuery);
  }
}
