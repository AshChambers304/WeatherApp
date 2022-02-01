import { Component, OnInit } from '@angular/core';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  faHome = faHome;
  faSearch = faSearch;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {}
}
