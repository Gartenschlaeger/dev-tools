import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FormService } from 'src/app/modules/form/services/form-service.service'
import { PageService } from '../../utilities/page-service'

export class JsonFormatterFormModel {
	source: string = ''
	minify: boolean = false
	stringify: boolean = false
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
		this.pageService.setPageTitle('JSON Formatter')

		this.form = this.defineForm()

		// if source was passed by another page immediately start formatting
		const model: JsonFormatterFormModel = this.form.value
		if (model.source) {
			this.handleSubmit()
		}
	}

	defineForm(): FormGroup {
		const source = (history.state.source as string) || FormDefaults.source
		return this.fb.group({
			source: [source, [Validators.required]],
			minify: [FormDefaults.minify],
			stringify: [FormDefaults.stringify]
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

				if (model.stringify) {
					res = JSON.stringify(res)
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
