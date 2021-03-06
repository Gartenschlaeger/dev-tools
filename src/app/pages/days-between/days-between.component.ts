import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { FormService } from 'src/app/modules/form/services/form-service.service'
import { DateService } from 'src/app/modules/shared/services/date.service'
import { PageService } from '../../utilities/page-service'

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

const FormDefaultValues = new DaysBetweenModel()

@Component({
	selector: 'app-days-between',
	templateUrl: './days-between.component.html'
})
export class DaysBetweenComponent implements OnInit {
	form!: FormGroup
	result: DaysBetweenResult | null = null

	constructor(
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private formService: FormService,
		private dateService: DateService,
		private pageService: PageService
	) {}

	ngOnInit(): void {
		this.form = this.defineForm()
		this.pageService.setPageTitle('Days between')
	}

	defineForm(): FormGroup {
		const validators = [Validators.required, Validators.pattern('^\\d+$'), Validators.min(1), Validators.max(9999)]

		return this.fb.group({
			fromYear: [FormDefaultValues.fromYear, validators],
			fromMonth: [FormDefaultValues.fromMonth, validators],
			fromDay: [FormDefaultValues.fromDay, validators],
			toYear: [FormDefaultValues.toYear, validators],
			toMonth: [FormDefaultValues.toMonth, validators],
			toDay: [FormDefaultValues.toDay, validators]
		})
	}

	handleSubmit() {
		if (this.formService.validate(this.form)) {
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

	handleReset() {
		this.formService.reset(this.form)
		this.result = null
	}
}
