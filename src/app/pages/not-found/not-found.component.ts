import { Component, OnInit } from '@angular/core';
import { PageService } from '../../utilities/page-service';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit {
    constructor(private pageService: PageService) {
    }

    ngOnInit() {
        this.pageService.resetTitle();
    }
}
