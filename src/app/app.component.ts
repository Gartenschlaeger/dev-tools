import { Component, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ExtendedRoute } from './app.routes';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SelectedThemeName, ThemeSwitchService } from './modules/shared/services/theme-switch.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    title = 'dev-tools';

    @ViewChild('sidenav') sidenav!: MatSidenav;
    @ViewChild('app_navigation') appNavigation!: NavigationComponent;

    // Global shortcut : submit form by multiline text fields
    @HostListener('document:keydown.meta.enter')
    async submitForm() {
        const activeElement = document.activeElement;
        if (activeElement instanceof HTMLTextAreaElement) {
            if (activeElement.form) {
                const submitButton = activeElement.form.querySelector('button[type=submit]');
                if (submitButton instanceof HTMLButtonElement) {
                    submitButton.click();
                }
            }
        }
    }

    constructor(private router: Router, private themes: ThemeSwitchService) {
    }

    public async handleNavigationItemClick(route: ExtendedRoute) {
        if (route.path) {
            await this.router.navigateByUrl(route.path);
        }

        await this.sidenav.close();
    }

    public handleSetTheme(theme: SelectedThemeName) {
        this.themes.change(theme);
    }

    public handleSidenavOpenedChanged(event: boolean) {
        this.appNavigation.handleOpenedChanged(event);
    }

}
