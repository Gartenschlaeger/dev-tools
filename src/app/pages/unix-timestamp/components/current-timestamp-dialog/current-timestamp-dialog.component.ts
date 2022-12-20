import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { DateUtilitiesService } from '../../../../modules/shared/services/DateUtilitiesService';

@Component({
    selector: 'app-current-timestamp-dialog',
    templateUrl: './current-timestamp-dialog.component.html',
    styleUrls: ['./current-timestamp-dialog.component.scss']
})
export class CurrentTimestampDialogComponent implements OnInit, OnDestroy {
    currentTimestamp: number = 0;
    timerSubscription!: Subscription;

    constructor(private _dateUtilities: DateUtilitiesService) {
    }

    public ngOnInit() {
        this.currentTimestamp = this._dateUtilities.getUnixTimestamp();
        this.timerSubscription = interval(1000)
            .subscribe(() => {
                this.currentTimestamp = this._dateUtilities.getUnixTimestamp();
            });
    }

    public ngOnDestroy(): void {
        this.timerSubscription.unsubscribe();
    }
}
