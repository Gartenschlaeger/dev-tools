import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
    titleText?: string;

    constructor(private router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const newTitle = router.titleStrategy?.buildTitle(router.routerState.snapshot);
                if (newTitle) {
                    this.titleText = newTitle;
                }

                if (newTitle === 'Home') {
                    this.titleText = '';
                }
            }
        });
    }
}
