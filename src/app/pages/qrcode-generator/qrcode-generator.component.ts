import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { FormService } from '../../modules/form/services/form-service.service'
import { PageComponent } from '../PageComponent'

export class QrCodeGeneratorFormModel {
	text: string = ''
	size: number = 220
}

const FormDefaults = new QrCodeGeneratorFormModel()

@Component({
	selector: 'app-qr-code-generator',
	templateUrl: './qrcode-generator.component.html'
})
export class QrCodeGeneratorComponent extends PageComponent implements OnInit {
	form!: FormGroup
	result?: QrCodeGeneratorFormModel

	constructor(route: ActivatedRoute, private fb: FormBuilder, private formService: FormService) {
		super(route)
	}

	ngOnInit() {
		this.form = this.defineForm()
	}

	defineForm(): FormGroup {
		const form = this.fb.group({
			text: [FormDefaults.text, [Validators.required]],
			size: [FormDefaults.size, [Validators.min(100), Validators.max(999)]]
		})

		form.get('size')?.valueChanges.subscribe((value) => {
			this.form.get('size')?.setValue(value, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
		})

		return form
	}

	handleReset() {
		this.formService.reset(this.form, FormDefaults)
		this.result = undefined
	}

	handleSubmit() {
		if (this.formService.validate(this.form)) {
			this.result = { ...this.form.value }
		}
	}
}
