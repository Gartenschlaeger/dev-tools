import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShareService {

    private enableSubject = new BehaviorSubject<boolean>(false);
    private activateSubject = new BehaviorSubject<boolean>(false);
    private dataCallback?: () => string = undefined;

    public activated$ = this.activateSubject.asObservable();

    public enabled$ = this.enableSubject.asObservable();

    setEnable(enabled: boolean) {
        this.enableSubject.next(enabled);
    }

    /**
     * Resets the share button to its defaults.
     */
    reset() {
        this.activateSubject.next(false);
        this.enableSubject.next(false);
        this.dataCallback = undefined;
    }

    /**
     * Registers for share button usage.
     * @param dataCallback Callback to generate the data to be shared.
     */
    registerForShare(dataCallback: () => string) {
        this.activateSubject.next(true);
        this.enableSubject.next(false);
        this.dataCallback = dataCallback;
    }

    /**
     * Starts the share process.
     * Normally only called by a click on the share button.
     */
    startShare() {
        if (this.dataCallback) {

        }
    }

}
