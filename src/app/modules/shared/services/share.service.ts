import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShareService {

    enableSubject = new BehaviorSubject<boolean>(false);
    enabled$ = this.enableSubject.asObservable();

    /**
     * enables the share button
     */
    enable() {
        this.enableSubject.next(true);
    }

    /**
     * disables the share button
     */
    disable() {
        this.enableSubject.next(false);
    }

}
