import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomTitleService {
    private pageTitleSubject: Subject<string> = new Subject<string>();

    constructor(private title: Title) {}

    // Sets the browser title, which is the title that appears in the browser tab
    public setBrowserTitle(newTitle: string) {
        this.title.setTitle(newTitle);
    }

    // Sets the page title, which is the title that appears in the page header component
    public setPageTitle(newTitle: string) {
        this.pageTitleSubject.next(newTitle);
    }

    // Occurs when the page title changes
    public pageTitle(): Observable<string> {
        return this.pageTitleSubject.asObservable();
    }
}
