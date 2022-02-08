import { Component, OnInit, Renderer2 } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faSearch,
  faMoon,
  faSun,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { NavigationService } from '../../services/navigation.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  faHome = faHome;
  faSearch = faSearch;
  faMoon = faMoon;
  faSun = faSun;

  constructor(
    public navService: NavigationService,
    private themeService: ThemeService
  ) {}

  switchTheme(): void {
    this.themeService.switchTheme();
  }

  ngOnInit(): void {}
}
