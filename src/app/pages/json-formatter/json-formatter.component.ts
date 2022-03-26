import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { FormService } from 'src/app/modules/form/services/form-service.service'
import { PageComponent } from 'src/app/pages/PageComponent'

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
export class JsonFormatterComponent extends PageComponent implements OnInit {
	form!: FormGroup
	result?: JsonFormatterResultModel

	constructor(route: ActivatedRoute, private fb: FormBuilder, private formService: FormService) {
		super(route)
	}

	ngOnInit() {
		this.form = this.defineForm()
	}

	defineForm(): FormGroup {
		return this.fb.group({
			source: [FormDefaults.source, [Validators.required]]
		})
	}

	handleReset() {
		this.form.reset()
		this.form.setValue(FormDefaults)
		this.form.markAsUntouched()
		this.result = undefined
	}

	handleSubmit() {
		if (this.formService.validateForm(this.form)) {
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
