import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FormService } from 'src/app/modules/form/services/form-service.service'
import { PageService } from '../../utilities/page-service'

export class JsonFormatterFormModel {
	source: string = ''
}

export class JsonFormatterResultModel {
	formattedValue: string = ''
	hasErrors: boolean = false
}

const FormDefaults = new JsonFormatterFormModel()

@Component({
	selector: 'app-json-formatter',
	templateUrl: './json-formatter.component.html'
})
export class JsonFormatterComponent implements OnInit {
	form!: FormGroup
	result?: JsonFormatterResultModel

	constructor(private fb: FormBuilder, private formService: FormService, private pageService: PageService) {}

	ngOnInit() {
		this.form = this.defineForm()

		this.pageService.setPageTitle('JSON Formatter')
	}

	defineForm(): FormGroup {
		return this.fb.group({
			source: [FormDefaults.source, [Validators.required]]
		})
	}

	handleReset() {
		this.formService.reset(this.form, FormDefaults)
		this.result = undefined
	}

	handleSubmit() {
		if (this.formService.validate(this.form)) {
			const model = this.form.value

			try {
				const obj = JSON.parse(model.source)
				const res = JSON.stringify(obj, null, '  ')

				this.result = {
					formattedValue: res,
					hasErrors: false
				}
			} catch (err) {
				this.result = {
					formattedValue: '',
					hasErrors: true
				}
			}
		}
	}
}
