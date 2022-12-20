import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DateUtilitiesService } from '../../../modules/shared/services/DateUtilitiesService';
import { FormService } from '../../../modules/shared/services/form-service.service';
import { NotificationsService } from '../../../modules/shared/services/notifications.service';
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
    form = new FormGroup({
        timestamp: new FormGroup({
            timestamp: new FormControl<number | null>(null, {
                validators: [Validators.required]
            })
        }),
        date: new FormGroup({
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
        })
    });

    result?: UnixTimestampConverterResultsModel;

    constructor(private _formService: FormService,
                private _matDialog: MatDialog,
                private _clipboard: Clipboard,
                private _notifications: NotificationsService,
                private _dateUtilities: DateUtilitiesService) {
    }

    public ngOnInit() {
        this.form.get('timestamp')?.valueChanges.subscribe(() => {
            this.timestampChanges();
        });
        this.form.get('date')?.valueChanges.subscribe(() => {
            this.dateChanges();
        });
    }

    private calculateResults(date: Date) {
        this.result = {
            utcDate: this._dateUtilities.formatDate(date, true),
            localDate: this._dateUtilities.formatDate(date)
        };
    }

    public timestampChanges() {
        if (this.form.get('timestamp')?.valid) {
            const timestamp = this.form.get('timestamp')!.value;

            const date = new Date();
            date.setTime(timestamp.timestamp! * 1000);

            this.form.patchValue({
                date: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate(),
                    hour: date.getUTCHours(),
                    minute: date.getUTCMinutes(),
                    second: date.getUTCSeconds()
                }
            }, {
                emitEvent: false
            });

            this.calculateResults(date);
        }
    }

    private dateChanges() {
        if (this.form.get('date')?.valid) {
            const group = this.form.get('date')!;
            const year = group.get('year')!.value!;
            const month = group.get('month')!.value! - 1;
            const day = group.get('day')!.value!;
            const hour = group.get('hour')!.value!;
            const minute = group.get('minute')!.value!;
            const second = group.get('second')!.value!;

            const utc = Date.UTC(year, month, day, hour, minute, second);
            const date = new Date();
            date.setTime(utc);

            this.form.get('timestamp')?.patchValue({
                timestamp: this._dateUtilities.convertToUnixTimestamp(date)
            }, {
                emitEvent: false
            });

            this.calculateResults(date);
        }
    }

    public handleTimestampCalculator() {
        const dialogData: UnitTimestampCalculatorDialogData = {
            timestamp: this.form.value.timestamp?.timestamp || 0
        };

        this._matDialog.open(UnixTimestampCalculatorDialogComponent, {
            autoFocus: false,
            data: dialogData
        }).afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.form.get('timestamp')!.patchValue({
                    timestamp: result
                });

                this.timestampChanges();
            }
        });
    }

    public handleGrabCurrentTimestamp() {
        this._matDialog.open(CurrentTimestampDialogComponent, {
            autoFocus: false
        }).afterClosed().subscribe(result => {
            if (result) {
                this.form.get('timestamp')!.patchValue({
                    timestamp: result
                });
                this.timestampChanges();
            }
        });
    }

    public handleCopyTimestamp() {
        const timestamp = this.form.value.timestamp?.timestamp;
        if (typeof timestamp === 'number') {
            this._clipboard.copy(String(timestamp));
            this._notifications.show('Copied to clipboard');
        }
    }

    public handleReset() {
        this._formService.reset(this.form, {
            timestamp: {
                timestamp: null
            }
        });

        this.result = undefined;
    }
}
