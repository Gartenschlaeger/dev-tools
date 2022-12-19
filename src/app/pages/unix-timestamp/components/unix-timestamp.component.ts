import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormService } from '../../../modules/shared/services/form-service.service';
import { NotificationsService } from '../../../modules/shared/services/notifications.service';
import { DateUtilities } from '../utilities/DateUtilities';
import { CurrentTimestampDialogComponent } from './current-timestamp-dialog/current-timestamp-dialog.component';
import {
    UnitTimestampCalculatorDialogData,
    UnixTimestampCalculatorDialogComponent
} from './unix-timestamp-calculator-dialog/unix-timestamp-calculator-dialog.component';

interface UnixTimestampConverterResultsModel {
    utcDate: string;
    localDate: string;
}

@Component({
    selector: 'app-unix-timestamp',
    templateUrl: './unix-timestamp.component.html',
    styleUrls: ['./unix-timestamp.component.scss']
})
export class UnixTimestampComponent implements OnInit {
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

    constructor(private _formService: FormService,
                private _matDialog: MatDialog,
                private _clipboard: Clipboard,
                private _notifications: NotificationsService) {
    }

    public ngOnInit() {
        this.formTimestamp.valueChanges.subscribe(() => {
            if (this.formTimestamp.status === 'VALID') {
                this.handleSubmitTimestamp();
            }
        });
    }

    private calculateResults(date: Date) {
        this.result = {
            utcDate: DateUtilities.formatDate(date, true),
            localDate: DateUtilities.formatDate(date)
        };
    }

    public handleSubmitTimestamp() {
        if (this._formService.validate(this.formTimestamp)) {
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
        if (this._formService.validate(this.formDate)) {
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
                timestamp: DateUtilities.convertToUnixTimestamp(date)
            });

            this.calculateResults(date);
        }
    }

    public handleReset() {
        this._formService.reset(this.formTimestamp, {
            timestamp: null
        });

        this._formService.reset(this.formDate, {
            year: null,
            month: null,
            day: null,
            hour: null,
            minute: null,
            second: null
        });

        this.result = undefined;
    }

    public handleTimestampCalculator() {
        const dialogData: UnitTimestampCalculatorDialogData = {
            timestamp: this.formTimestamp.value.timestamp || 0
        };

        this._matDialog.open(UnixTimestampCalculatorDialogComponent, {
            autoFocus: false,
            data: dialogData
        }).afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.formTimestamp.patchValue({
                    timestamp: result
                });

                this.handleSubmitTimestamp();
            }
        });
    }

    public handleCurrentTimestamp() {
        this._matDialog.open(CurrentTimestampDialogComponent, {
            autoFocus: false
        }).afterClosed().subscribe(result => {
            if (result) {
                this.formTimestamp.patchValue({
                    timestamp: result
                });
                this.handleSubmitTimestamp();
            }
        });
    }

    public handleCopy() {
        const timestamp = this.formTimestamp.value.timestamp;
        if (typeof timestamp === 'number') {
            this._clipboard.copy(String(timestamp));
            this._notifications.show('Copied to clipboard');
        }
    }
}
