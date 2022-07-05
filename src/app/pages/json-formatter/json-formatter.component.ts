import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FormService } from 'src/app/modules/form/services/form-service.service'
import { PageService } from '../../utilities/page-service'

export class JsonFormatterFormModel {
	source: string = ''
	minify: boolean = false
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
			source: [FormDefaults.source, [Validators.required]],
			minify: [FormDefaults.minify]
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

				let res = ''
				if (model.minify) {
					res = JSON.stringify(obj)
				} else {
					res = JSON.stringify(obj, null, '  ')
				}

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
