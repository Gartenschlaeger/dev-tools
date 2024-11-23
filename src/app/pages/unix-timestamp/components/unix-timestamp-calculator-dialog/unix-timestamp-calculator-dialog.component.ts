import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateUtilitiesService } from '../../../../modules/shared/services/DateUtilitiesService';

export interface UnitTimestampCalculatorDialogData {
    timestamp: number;
}

@Component({
    selector: 'app-unix-timestamp-calculator-dialog',
    templateUrl: './unix-timestamp-calculator-dialog.component.html',
    styleUrls: ['./unix-timestamp-calculator-dialog.component.scss'],
    standalone: false
})
export class UnixTimestampCalculatorDialogComponent {
    initialDate: Date;

    currentDate?: Date;
    timestamp?: number;
    dateFormatted?: string;

    form = new FormGroup({
        seconds: new FormControl<number>(0),
        minutes: new FormControl<number>(0),
        hours: new FormControl<number>(0),
        days: new FormControl<number>(0),
        months: new FormControl<number>(0),
        years: new FormControl<number>(0)
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) private _dialogData: UnitTimestampCalculatorDialogData,
        private _dialogRef: MatDialogRef<UnixTimestampCalculatorDialogComponent>,
        private _dateUtilities: DateUtilitiesService
    ) {
        this.initialDate = _dateUtilities.getUtcDateByTimestamp(_dialogData.timestamp);

        this.recalculate();
        this.form.valueChanges.subscribe(() => {
            this.recalculate();
        });
    }

    private recalculate() {
        const seconds = this.form.value.seconds!;
        const minutes = this.form.value.minutes!;
        const hours = this.form.value.hours!;
        const days = this.form.value.days!;
        const months = this.form.value.months!;
        const years = this.form.value.years!;

        this.currentDate = this.initialDate;
        this.currentDate = this._dateUtilities.addSeconds(this.currentDate, seconds);
        this.currentDate = this._dateUtilities.addMinutes(this.currentDate, minutes);
        this.currentDate = this._dateUtilities.addHours(this.currentDate, hours);
        this.currentDate = this._dateUtilities.addDays(this.currentDate, days);
        this.currentDate = this._dateUtilities.addMonths(this.currentDate, months);
        this.currentDate = this._dateUtilities.addYears(this.currentDate, years);

        this.timestamp = this._dateUtilities.convertToUnixTimestamp(this.currentDate);
        this.dateFormatted = this._dateUtilities.formatTimestamp(this.timestamp, true);
    }

    patchValue(formControlName: string, amount: number) {
        let currentUnit: number = this.form.get(formControlName)?.value;
        currentUnit += amount;
        this.form.get(formControlName)?.setValue(currentUnit);
    }

    handleSubmit() {
        this._dialogRef.close(this.timestamp);
    }
}
