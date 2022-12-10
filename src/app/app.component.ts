import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ExtendedRoute } from './app.routes';
import { SelectedThemeName, ThemeSwitchService } from './modules/shared/services/theme-switch.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'dev-tools';

    @ViewChild('sidenav') sidenav!: MatSidenav;

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
}
