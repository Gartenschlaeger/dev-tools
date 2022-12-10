import { Injectable } from '@angular/core';

export type SelectedThemeName = 'light' | 'dark';

const LOCAL_STORAGE_KEY = 'selectedTheme';
const DEFAULT_THEME: SelectedThemeName = 'light';

@Injectable({
    providedIn: 'root'
})
export class ThemeSwitchService {

    private selectedTheme: SelectedThemeName;

    constructor() {
        this.selectedTheme = this.restoreSelectedTheme();
        this.themeChanged();
    }

    private themeChanged() {
        if (this.selectedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
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
            }
        }

        return undefined;
    }

    private getUserPreferredTheme(): SelectedThemeName | undefined {
        if (window.matchMedia) {
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
            if (prefersDarkScheme.matches) {
                return 'dark';
            }

            return 'light';
        }

        return undefined;
    }

    public restoreSelectedTheme() {
        const fromLocalStorage = this.getThemeFromLocalStorage();
        if (fromLocalStorage) {
            return fromLocalStorage;
        }

        const userPreferredTheme = this.getUserPreferredTheme();
        if (userPreferredTheme) {
            return userPreferredTheme;
        }

        return DEFAULT_THEME;
    }

    public change(theme: SelectedThemeName) {
        this.selectedTheme = theme;
        localStorage.setItem(LOCAL_STORAGE_KEY, theme);
        this.themeChanged();
    }
    
}
