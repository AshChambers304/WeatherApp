import { Component, OnInit, Renderer2 } from '@angular/core';
import { faHome, faSearch, faBolt } from '@fortawesome/free-solid-svg-icons';
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
  faBolt = faBolt;

  constructor(
    public navService: NavigationService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {}
}
