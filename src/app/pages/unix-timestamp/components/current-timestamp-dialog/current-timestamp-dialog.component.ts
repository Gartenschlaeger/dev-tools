import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { DateUtilities } from '../../utilities/DateUtilities';

@Component({
    selector: 'app-current-timestamp-dialog',
    templateUrl: './current-timestamp-dialog.component.html',
    styleUrls: ['./current-timestamp-dialog.component.scss']
})
export class CurrentTimestampDialogComponent implements OnInit, OnDestroy {
    currentTimestamp: number = 0;
    timerSubscription!: Subscription;

    public ngOnInit() {
        this.currentTimestamp = DateUtilities.getUnixTimestamp();
        this.timerSubscription = interval(1000)
            .subscribe(() => {
                this.currentTimestamp = DateUtilities.getUnixTimestamp();
            });
    }

    public ngOnDestroy(): void {
        this.timerSubscription.unsubscribe();
    }
}
