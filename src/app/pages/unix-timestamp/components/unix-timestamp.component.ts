import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { FormService } from '../../../modules/shared/services/form-service.service';

interface UnixTimestampConverterResultsModel {
    utcDate: string;
    localDate: string;
}

@Component({
    selector: 'app-unix-timestamp',
    templateUrl: './unix-timestamp.component.html',
    styleUrls: ['./unix-timestamp.component.scss']
})
export class UnixTimestampComponent implements OnInit, OnDestroy {

    currentTimestamp: number = 0;
    timerSubscription!: Subscription;

    formTimestamp = new FormGroup({
        timestamp: new FormControl<number | null>(null, {
            validators: [Validators.required]
        })
    });

    formDate = new FormGroup({
        year: new FormControl<number | null>(null, {
            validators: [Validators.required]
        }),
        month: new FormControl<number | null>(null, {
            validators: [Validators.required]
        }),
        day: new FormControl<number | null>(null, {
            validators: [Validators.required]
        }),
        hour: new FormControl<number | null>(null, {
            validators: [Validators.required]
        }),
        minute: new FormControl<number | null>(null, {
            validators: [Validators.required]
        }),
        second: new FormControl<number | null>(null, {
            validators: [Validators.required]
        })
    });

    result?: UnixTimestampConverterResultsModel;

    constructor(private formService: FormService) {
    }

    public ngOnInit(): void {
        this.currentTimestamp = this.getUnixTimestamp();
        this.timerSubscription = interval(1000)
            .subscribe(() => {
                this.currentTimestamp = this.getUnixTimestamp();
            });
    }

    public ngOnDestroy(): void {
        this.timerSubscription.unsubscribe();
    }

    private getUnixTimestamp(): number {
        const date = new Date();
        return this.convertToUnixTimestamp(date);
    }

    private convertToUnixTimestamp(date: Date): number {
        const milliseconds = date.getTime();
        return Math.floor(milliseconds / 1000.0);
    }

    private calculateResults(date: Date) {
        this.result = {
            utcDate: this.formatDate(date, true),
            localDate: this.formatDate(date)
        };
    }

    private formatDate(date: Date, toUtc?: boolean) {
        return date.toLocaleString('en-UK', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            weekday: 'short',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'longOffset',
            timeZone: toUtc ? 'UTC' : undefined
        });
    }

    public handleSetCurrentTimestamp() {
        this.formTimestamp.patchValue({
            timestamp: this.getUnixTimestamp()
        });

        this.handleSubmitTimestamp();
    }

    public handleSubmitTimestamp() {
        if (this.formService.validate(this.formTimestamp)) {
            const timestamp = this.formTimestamp.value.timestamp!;

            const date = new Date();
            date.setTime(timestamp * 1000);

            this.calculateResults(date);

            this.formDate.patchValue({
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate(),
                hour: date.getUTCHours(),
                minute: date.getUTCMinutes(),
                second: date.getUTCSeconds()
            });
        }
    }

    public handleSubmitDate() {
        if (this.formService.validate(this.formDate)) {
            const year = this.formDate.value.year!;
            const month = this.formDate.value.month! - 1;
            const day = this.formDate.value.day!;
            const hour = this.formDate.value.hour!;
            const minute = this.formDate.value.minute!;
            const second = this.formDate.value.second!;

            const utc = Date.UTC(year, month, day, hour, minute, second);
            const date = new Date();
            date.setTime(utc);

            this.formTimestamp.patchValue({
                timestamp: this.convertToUnixTimestamp(date)
            });

            this.calculateResults(date);
        }
    }

    public handleReset() {
        this.formService.reset(this.formTimestamp, {
            timestamp: null
        });

        this.formService.reset(this.formDate, {
            year: null,
            month: null,
            day: null,
            hour: null,
            minute: null,
            second: null
        });

        this.result = undefined;
    }

}
