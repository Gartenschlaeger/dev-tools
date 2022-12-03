import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { INavigationItem } from './entities/INavigationItem';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'dev-tools';

    @ViewChild('sidenav') sidenav!: MatSidenav;

    constructor(private router: Router) {
    }

    async handleNavigationItemClick(item: INavigationItem) {
        await this.router.navigateByUrl(item.routerLink);
        await this.sidenav.close();
    }
}
