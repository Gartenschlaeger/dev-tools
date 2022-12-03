import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/modules/form/services/form-service.service';
import { DateService } from 'src/app/modules/shared/services/date.service';
import { PageService } from '../../utilities/page-service';

export class DaysBetweenModel {
    fromDate?: Date;
    toDate?: Date;
}

export class DaysBetweenResult {
    Days?: number;
    Months?: number;
    Years?: number;
}

const FormDefaultValues = new DaysBetweenModel();

@Component({
    selector: 'app-days-between',
    templateUrl: './days-between.component.html'
})
export class DaysBetweenComponent implements OnInit {
    form!: UntypedFormGroup;
    result: DaysBetweenResult | null = null;

    constructor(
        private route: ActivatedRoute,
        private fb: UntypedFormBuilder,
        private formService: FormService,
        private dateService: DateService,
        private pageService: PageService
    ) {
    }

    ngOnInit(): void {
        this.form = this.defineForm();
        this.pageService.setPageTitle('Days between');
    }

    defineForm(): UntypedFormGroup {
        const validators = [Validators.required, Validators.pattern('^\\d+$'), Validators.min(1), Validators.max(9999)];

        return this.fb.group({
            fromDate: [FormDefaultValues.fromDate, validators],
            toDate: [FormDefaultValues.toDate, validators]
        });
    }

    handleSubmit() {
        if (this.formService.validate(this.form)) {
            const model = this.form.value as DaysBetweenModel;
            this.result = {
                Days: this.dateService.DaysBetween(model.fromDate!, model.toDate!),
                Months: this.dateService.MonthsBetween(model.fromDate!, model.toDate!),
                Years: this.dateService.YearsBetween(model.fromDate!, model.toDate!)
            };
        }
    }

    handleReset() {
        this.formService.reset(this.form);
        this.result = null;
    }
}
