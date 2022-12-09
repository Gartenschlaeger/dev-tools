import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DateService } from 'src/app/modules/shared/services/date.service';
import { FormService } from '../../modules/shared/services/form-service.service';
import { PageService } from '../../utilities/page-service';

export class DaysBetweenModel {
    fromDate?: Date;
    toDate: Date = new Date();
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
        return this.fb.group({
            fromDate: [FormDefaultValues.fromDate, [Validators.required]],
            toDate: [FormDefaultValues.toDate, [Validators.required]]
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
        this.formService.reset(this.form, FormDefaultValues);
        this.result = null;
    }
}
