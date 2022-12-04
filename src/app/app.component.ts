import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { INavigationItem } from './entities/INavigationItem';
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

    public async handleNavigationItemClick(item: INavigationItem) {
        await this.router.navigateByUrl(item.routerLink);
        await this.sidenav.close();
    }

    public handleSetTheme(theme: SelectedThemeName) {
        this.themes.change(theme);
    }
}
