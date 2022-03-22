import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DateService } from 'src/app/services/date.service'
import { FormService } from 'src/app/services/form-service.service'

export class DaysBetweenModel {
    fromYear?: number
    fromMonth?: number
    fromDay?: number

    toYear?: number
    toMonth?: number
    toDay?: number
}

export class DaysBetweenResult {
    Days?: number
    Months?: number
    Years?: number
}

const DefaultFormState = new DaysBetweenModel()

@Component({
    selector: 'app-days-between',
    templateUrl: './days-between.component.html'
})
export class DaysBetweenComponent implements OnInit {
    form!: FormGroup
    result?: DaysBetweenResult

    constructor(private fb: FormBuilder, private formService: FormService, private dateService: DateService) {}

    ngOnInit(): void {
        this.form = this.defineForm()
    }

    defineForm(): FormGroup {
        const validators = [Validators.required, Validators.pattern('^\\d+$'), Validators.min(1), Validators.max(9999)]

        return this.fb.group({
            fromYear: [DefaultFormState.fromYear, validators],
            fromMonth: [DefaultFormState.fromMonth, validators],
            fromDay: [DefaultFormState.fromDay, validators],
            toYear: [DefaultFormState.toYear, validators],
            toMonth: [DefaultFormState.toMonth, validators],
            toDay: [DefaultFormState.toDay, validators]
        })
    }

    handleSubmit() {
        if (this.formService.validateForm(this.form)) {
            const model = this.form.value as DaysBetweenModel
            const minDate = new Date(model.fromYear!, model.fromMonth! - 1, model.fromDay!)
            const toDate = new Date(model.toYear!, model.toMonth! - 1, model.toDay!)

            this.result = {
                Days: this.dateService.DaysBetween(minDate, toDate),
                Months: this.dateService.MonthsBetween(minDate, toDate),
                Years: this.dateService.YearsBetween(minDate, toDate)
            }
        }
    }
}
