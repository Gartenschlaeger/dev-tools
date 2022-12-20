import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DateUtilitiesService } from '../../../modules/shared/services/DateUtilitiesService';
import { FormService } from '../../../modules/shared/services/form-service.service';

interface FormRangeResult {
    days: number;
    months: number;
    years: number;
}

@Component({
    selector: 'app-days-between',
    templateUrl: './date-calculator.component.html'
})
export class DateCalculatorComponent {

    formDateRange = new FormGroup({
        fromDate: new FormControl<Date | undefined>(undefined, {
            validators: [Validators.required]
        }),
        toDate: new FormControl<Date | undefined>(new Date(), {
            validators: [Validators.required]
        })
    });

    formDateRangeResult?: FormRangeResult;

    formDateCalculatorDate = new FormGroup({
        date: new FormControl<Date | null>(new Date())
    });

    formDateCalculatorModify = new FormGroup({
        modifyType: new FormControl<string>('d'),
        modifyAmount: new FormControl<number | undefined>(undefined, {
            validators: [Validators.required]
        })
    });

    constructor(private _route: ActivatedRoute,
                private _formService: FormService,
                private _dateUtilities: DateUtilitiesService) {
    }

    handleDateRangeSubmit() {
        if (this._formService.validate(this.formDateRange)) {
            const fromDate = this.formDateRange.value.fromDate!;
            const toDate = this.formDateRange.value.toDate!;
            this.formDateRangeResult = {
                days: this._dateUtilities.daysBetween(fromDate, toDate!),
                months: this._dateUtilities.monthsBetween(fromDate, toDate!),
                years: this._dateUtilities.yearsBetween(fromDate, toDate!)
            };
        }
    }

    handleDateRangeReset() {
        this._formService.reset(this.formDateRange, {
            fromDate: undefined,
            toDate: new Date()
        });

        this.formDateRangeResult = undefined;
    }

    private negate(value: number, negate: boolean): number {
        return negate ? -value : value;
    }

    private modifyDate(type: string, isAdd: boolean, amount: number) {
        const currentDate = this.formDateCalculatorDate.value.date!;
        switch (type) {
            case 'd':
                this.formDateCalculatorDate.patchValue({
                    date: this._dateUtilities.addDays(currentDate, this.negate(amount, !isAdd))
                });
                break;
            case 'm':
                this.formDateCalculatorDate.patchValue({
                    date: this._dateUtilities.addMonths(currentDate, this.negate(amount, !isAdd))
                });
                break;
            case 'y':
                this.formDateCalculatorDate.patchValue({
                    date: this._dateUtilities.addYears(currentDate, this.negate(amount, !isAdd))
                });
                break;
        }
    }

    public handleDateAdd() {
        if (this._formService.validate(this.formDateCalculatorModify)) {
            this.modifyDate(this.formDateCalculatorModify.value.modifyType!,
                true, this.formDateCalculatorModify.value.modifyAmount!);
        }
    }

    public handleDateRemove() {
        if (this._formService.validate(this.formDateCalculatorModify)) {
            this.modifyDate(this.formDateCalculatorModify.value.modifyType!,
                false, this.formDateCalculatorModify.value.modifyAmount!);
        }
    }
}
