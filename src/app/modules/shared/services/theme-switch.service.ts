import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

export type SelectedThemeName = 'system' | 'light' | 'dark';

const LOCAL_STORAGE_KEY = 'selectedTheme';
const DEFAULT_THEME: SelectedThemeName = 'light';

@Injectable({
    providedIn: 'root'
})
export class ThemeSwitchService {
    private selectedTheme: SelectedThemeName;

    constructor(private _logger: LoggingService) {
        this.selectedTheme = this.restoreSelectedTheme();
        this.themeChanged();
    }

    private themeChanged() {
        let selectedTheme = this.selectedTheme;
        if (selectedTheme === 'system') {
            selectedTheme = this.getUserPreferredTheme();
        }

        this._logger.info(`Change theme to ${selectedTheme}`);

        switch (selectedTheme) {
            case 'dark':
                document.body.classList.add('dark-theme');
                break;
            case 'light':
                document.body.classList.remove('dark-theme');
                break;
        }
    }

    private getThemeFromLocalStorage(): SelectedThemeName | undefined {
        const value = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (value) {
            switch (value) {
                case 'light':
                    return 'light';
                case 'dark':
                    return 'dark';

                case 'system':
                    return 'system';
            }
        }

        return undefined;
    }

    private getUserPreferredTheme(): SelectedThemeName {
        if (window.matchMedia) {
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
            if (prefersDarkScheme.matches) {
                return 'dark';
            }
        }

        return DEFAULT_THEME;
    }

    restoreSelectedTheme() {
        const fromLocalStorage = this.getThemeFromLocalStorage();
        if (fromLocalStorage && fromLocalStorage !== 'system') {
            return fromLocalStorage;
        }

        const userPreferredTheme = this.getUserPreferredTheme();
        if (userPreferredTheme) {
            return userPreferredTheme;
        }

        return DEFAULT_THEME;
    }

    change(theme: SelectedThemeName) {
        this.selectedTheme = theme;
        localStorage.setItem(LOCAL_STORAGE_KEY, theme);
        this.themeChanged();
    }
}
