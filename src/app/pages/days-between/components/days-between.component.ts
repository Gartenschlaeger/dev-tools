import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../../modules/shared/services/form-service.service';
import { DaysBetweenModel } from '../entities/days-between.model';
import { DaysBetweenResult } from '../entities/days-between.result';

const FormDefaultValues = new DaysBetweenModel();

@Component({
    selector: 'app-days-between',
    templateUrl: './days-between.component.html'
})
export class DaysBetweenComponent implements OnInit {

    form!: UntypedFormGroup;
    result: DaysBetweenResult | null = null;

    constructor(private route: ActivatedRoute,
                private fb: UntypedFormBuilder,
                private formService: FormService) {
    }

    ngOnInit(): void {
        this.form = this.defineForm();
    }

    defineForm(): UntypedFormGroup {
        return this.fb.group({
            fromDate: [FormDefaultValues.fromDate, [Validators.required]],
            toDate: [FormDefaultValues.toDate, [Validators.required]]
        });
    }

    calculateDaysBetween(from: Date, to: Date): number {
        const differenceInTime = to.getTime() - from.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        return Math.round(differenceInDays);
    }

    calculateMonthsBetween(from: Date, to: Date): number {
        var months: number;
        months = (to.getFullYear() - from.getFullYear()) * 12;
        months -= from.getMonth();
        months += to.getMonth();

        return Math.round(months);
    }

    calculateYearsBetween(from: Date, to: Date): number {
        const differenceInYears = to.getFullYear() - from.getFullYear();

        return Math.round(differenceInYears);
    }

    handleSubmit() {
        if (this.formService.validate(this.form)) {
            const model = this.form.value as DaysBetweenModel;
            this.result = {
                Days: this.calculateDaysBetween(model.fromDate!, model.toDate!),
                Months: this.calculateMonthsBetween(model.fromDate!, model.toDate!),
                Years: this.calculateYearsBetween(model.fromDate!, model.toDate!)
            };
        }
    }

    handleReset() {
        this.formService.reset(this.form, FormDefaultValues);
        this.result = null;
    }
}
