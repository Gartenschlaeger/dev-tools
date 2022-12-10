import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CustomTitleStrategyService extends TitleStrategy {

    constructor(private title: Title) {
        super();
    }

    public updateTitle(snapshot: RouterStateSnapshot): void {
        const title = this.buildTitle(snapshot);
        if (title) {
            this.title.setTitle(`Devtools - ${title}`);
        } else {
            this.title.setTitle('DevTools');
        }
    }

}
