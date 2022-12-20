import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateUtilitiesService } from '../../../../modules/shared/services/DateUtilitiesService';

const SEC_PER_MIN = 60;
const SEC_PER_HOUR = SEC_PER_MIN * 60;
const SEC_PER_DAY = SEC_PER_HOUR * 24;
const SEC_PER_MONTH = SEC_PER_DAY * 30;
const SEC_PER_YEAR = SEC_PER_MONTH * 12;

export interface UnitTimestampCalculatorDialogData {
    timestamp: number;
}

@Component({
    selector: 'app-unix-timestamp-calculator-dialog',
    templateUrl: './unix-timestamp-calculator-dialog.component.html',
    styleUrls: ['./unix-timestamp-calculator-dialog.component.scss']
})
export class UnixTimestampCalculatorDialogComponent {
    timestamp: number;
    dateFormatted: string;

    form = new FormGroup({
        seconds: new FormControl<number>(0),
        minutes: new FormControl<number>(0),
        hours: new FormControl<number>(0),
        days: new FormControl<number>(0),
        months: new FormControl<number>(0),
        years: new FormControl<number>(0)
    });

    constructor(@Inject(MAT_DIALOG_DATA) private _dialogData: UnitTimestampCalculatorDialogData,
                private _dialogRef: MatDialogRef<UnixTimestampCalculatorDialogComponent>,
                private _dateUtilities: DateUtilitiesService) {

        this.timestamp = _dialogData.timestamp + this.calculateNewTimestamp();
        this.dateFormatted = _dateUtilities.formatTimestamp(this.timestamp, true);

        this.form.valueChanges.subscribe(() => {
            this.timestamp = _dialogData.timestamp + this.calculateNewTimestamp();
            this.dateFormatted = _dateUtilities.formatTimestamp(this.timestamp, true);
        });
    }

    private calculateNewTimestamp() {
        let result = 0;
        result += this.form.value.seconds || 0;
        result += (this.form.value.minutes || 0) * SEC_PER_MIN;
        result += (this.form.value.hours || 0) * SEC_PER_HOUR;
        result += (this.form.value.days || 0) * SEC_PER_DAY;
        result += (this.form.value.months || 0) * SEC_PER_MONTH;
        result += (this.form.value.years || 0) * SEC_PER_YEAR;

        return result;
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
