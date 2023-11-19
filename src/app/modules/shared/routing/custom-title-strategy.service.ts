import { Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { CustomTitleService } from '../services/custom-title.service';

@Injectable({
    providedIn: 'root'
})
export class CustomTitleStrategyService extends TitleStrategy {
    constructor(private customTitleService: CustomTitleService) {
        super();
    }

    public updateTitle(snapshot: RouterStateSnapshot): void {
        const title = this.buildTitle(snapshot);
        if (title) {
            this.customTitleService.setBrowserTitle(`Devtools - ${title}`);
            this.customTitleService.setPageTitle(title);
        } else {
            this.customTitleService.setBrowserTitle('DevTools');
            this.customTitleService.setPageTitle('');
        }
    }
}
