import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { FormService } from 'src/app/modules/form/services/form-service.service'
import { LoggingService } from 'src/app/modules/shared/services/logging.service'
import { PageComponent } from 'src/app/pages/PageComponent'

export class Base64Model {
	sourceValue: string = ''
}

const FormDefaults = new Base64Model()

@Component({
	selector: 'app-base64-encoder',
	templateUrl: './base64.component.html'
})
export class Base64Component extends PageComponent implements OnInit {
	form!: FormGroup
	hasErrors: boolean = false
	isEncodeMode!: boolean
	processedValue: string = ''

	constructor(
		private logger: LoggingService,
		private fb: FormBuilder,
		private formService: FormService,
		private route: ActivatedRoute
	) {
		super(route)

		this.isEncodeMode = route.snapshot.url[0].path === 'base64-encoder'
	}

	ngOnInit() {
		this.form = this.defineForm()
		this.route.paramMap.subscribe((params) => {
			this.handleReset()
		})
	}

	defineForm(): FormGroup {
		return this.fb.group({
			sourceValue: [FormDefaults.sourceValue, [Validators.required]]
		})
	}

	handleSubmit() {
		this.logger.trace('handleSubmit', this.form.valid)

		if (this.formService.validateForm(this.form)) {
			const model: Base64Model = this.form.value

			try {
				this.processedValue = this.isEncodeMode ? btoa(model.sourceValue) : atob(model.sourceValue)
				this.hasErrors = false
			} catch (err) {
				this.logger.error(err)
				this.processedValue = ''
				this.hasErrors = true
			}
		}
	}

	handleReset() {
		this.form.reset()
		this.form.setValue(FormDefaults)
		this.form.markAsUntouched()
		this.processedValue = ''
		this.hasErrors = false
	}
}
