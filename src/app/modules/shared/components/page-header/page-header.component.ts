import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PageUtilitiesService } from '../../services/page-utilities.service';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {

    titleText?: string;

    constructor(private router: Router, private pageUtilities: PageUtilitiesService) {
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const newTitle = router.titleStrategy?.buildTitle(router.routerState.snapshot);
                if (newTitle) {
                    this.titleText = newTitle;
                }
            }
        });

        pageUtilities.titleChanged.subscribe(newTitle => {
            this.titleText = newTitle;
        });
    }

}
