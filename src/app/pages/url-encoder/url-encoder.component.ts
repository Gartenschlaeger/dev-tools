import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { FormService } from 'src/app/modules/form/services/form-service.service'
import { PageComponent } from 'src/app/pages/PageComponent'

export class UrlEncoderFormModel {
	sourceValue: string = ''
	encodeAsQueryString: boolean = false
}

export interface UrlEncoderResultModel {
	processedValue: string
	hasErrors: boolean
}

const FormDefaults = new UrlEncoderFormModel()

@Component({
	selector: 'app-url-encoder',
	templateUrl: './url-encoder.component.html'
})
export class URLEncoderComponent extends PageComponent implements OnInit {
	form!: FormGroup
	result?: UrlEncoderResultModel
	isEncodeMode!: boolean

	constructor(private route: ActivatedRoute, private fb: FormBuilder, private formService: FormService) {
		super(route)

		this.isEncodeMode = route.snapshot.url[0].path === 'url-encoder'
	}

	ngOnInit() {
		this.form = this.defineForm()
	}

	defineForm(): FormGroup {
		const result = this.fb.group({
			sourceValue: [FormDefaults.sourceValue, [Validators.required]]
		})

		if (this.isEncodeMode) {
			result.addControl('encodeAsQueryString', new FormControl(false))
		}

		return result
	}

	handleSubmit() {
		if (this.formService.validateForm(this.form)) {
			const model: UrlEncoderFormModel = this.form.value

			try {
				let processedValue: string
				if (this.isEncodeMode) {
					processedValue = model.encodeAsQueryString
						? encodeURIComponent(model.sourceValue)
						: encodeURI(model.sourceValue)
				} else {
					processedValue = decodeURIComponent(model.sourceValue)
				}

				this.result = {
					processedValue,
					hasErrors: false
				}
			} catch (error) {
				this.result = {
					processedValue: '',
					hasErrors: true
				}
			}
		}
	}

	handleReset() {
		this.form.reset()
		this.form.setValue(FormDefaults)
		this.form.markAsUntouched()
		this.result = undefined
	}
}
