import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NavigationExtras, Router } from '@angular/router'
import { FormService } from '../../modules/form/services/form-service.service'

export class JsonParserFormModel {
	source: string = ''
}

export class JsonParserResultModel {
	formattedValue?: string
	errorMessage?: string

	reset() {
		this.formattedValue = undefined
		this.errorMessage = undefined
	}
}

const FormDefaults = new JsonParserFormModel()

@Component({
	selector: 'app-json-parser',
	templateUrl: './json-parser.component.html'
})
export class JsonParserComponent implements OnInit {
	form!: FormGroup
	result!: JsonParserResultModel

	constructor(private fb: FormBuilder, private formService: FormService, private router: Router) {}

	ngOnInit(): void {
		this.form = this.defineForm()
		this.result = new JsonParserResultModel()
	}

	defineForm(): FormGroup {
		return this.fb.group({
			source: [FormDefaults.source, [Validators.required]]
		})
	}

	handleReset() {
		this.formService.reset(this.form)
		this.result.reset()
	}

	handlePassToJsonFormatter() {
		if (this.result.formattedValue === undefined) {
			return
		}

		const extra: NavigationExtras = {
			state: {
				source: this.result.formattedValue
			}
		}

		this.router.navigate(['/json-formatter'], extra)
	}

	handleSubmit() {
		if (this.formService.validate(this.form)) {
			const model: JsonParserFormModel = this.form.value
			this.result.reset()

			try {
				let parsedObj = JSON.parse(model.source)
				while (typeof parsedObj !== 'object') {
					parsedObj = JSON.parse(parsedObj)
				}

				this.result.formattedValue = JSON.stringify(parsedObj, null, '  ')
			} catch (err: unknown) {
				this.result.errorMessage = 'Failed to parse json'
				if (err instanceof Error) {
					this.result.errorMessage += ': "' + err.message + '"'
				}
			}
		}
	}
}
