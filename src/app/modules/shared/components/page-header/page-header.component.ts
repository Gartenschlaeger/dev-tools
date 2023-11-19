import { Component, signal } from '@angular/core';
import { CustomTitleService } from '../../services/custom-title.service';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
    title = signal('');

    constructor(customTitleService: CustomTitleService) {
        customTitleService.pageTitle().subscribe((newTitle) => {
            this.title.set(newTitle);
        });
    }
}
