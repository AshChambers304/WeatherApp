import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { IconProp, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme: string = 'light-theme';
  sun = faSun;
  moon = faMoon;
  private renderer: Renderer2;

  public currentThemeIcon: IconDefinition = this.moon;
  public currentThemeName: string = 'Dark Theme';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

    if (localStorage.getItem('themeToken') === null) {
      this.theme = 'light-theme';
    } else this.theme = localStorage.getItem('themeToken') || 'null';

    if (localStorage.getItem('themeIconToken') === null) {
      this.currentThemeIcon = this.moon;
    } else {
      this.currentThemeIcon = JSON.parse(
        localStorage.getItem('themeIconToken') || 'null'
      );
    }

    if (localStorage.getItem('themeNameToken') === null) {
      this.currentThemeName = 'Dark Theme';
    } else
      this.currentThemeName = localStorage.getItem('themeNameToken') || 'null';

    this.initializeTheme();
  }

  initializeTheme = (): void =>
    this.renderer.addClass(this.document.body, this.theme);

  switchTheme(): void {
    this.document.body.classList.replace(
      this.theme,
      this.theme === 'light-theme'
        ? (this.theme = 'dark-theme')
        : (this.theme = 'light-theme')
    );

    this.currentThemeIcon === this.moon
      ? (this.currentThemeIcon = this.sun)
      : (this.currentThemeIcon = this.moon);

    this.currentThemeName === 'Dark Theme'
      ? (this.currentThemeName = 'Light Theme')
      : (this.currentThemeName = 'Dark Theme');

    localStorage.setItem('themeToken', this.theme);

    localStorage.setItem(
      'themeIconToken',
      JSON.stringify(this.currentThemeIcon)
    );

    localStorage.setItem('themeNameToken', this.currentThemeName);
  }
}
