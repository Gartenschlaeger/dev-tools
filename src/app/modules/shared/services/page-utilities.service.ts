import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';

/**
 * Service with common page utilities.
 */
@Injectable({
    providedIn: 'root'
})
export class PageUtilitiesService {

    titleChanged: Subject<string> = new Subject<string>();

    constructor(private title: Title) {
    }

    /**
     * Changes the page title to the given new title.
     *
     * @param newTitle Title to set
     */
    public setTitle(newTitle: string) {
        this.title.setTitle(`DevTools - ${newTitle}`);
        this.titleChanged.next(newTitle);
    }

}
