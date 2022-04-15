import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FormService } from '../../modules/form/services/form-service.service'
import { PageService } from '../../utilities/page-service'

export class QrCodeGeneratorFormModel {
	text: string = ''
	size: number = 220
}

const FormDefaults = new QrCodeGeneratorFormModel()

@Component({
	selector: 'app-qr-code-generator',
	templateUrl: './qrcode-generator.component.html'
})
export class QrCodeGeneratorComponent implements OnInit {
	form!: FormGroup
	result?: QrCodeGeneratorFormModel

	constructor(private fb: FormBuilder, private formService: FormService, private pageService: PageService) {}

	ngOnInit() {
		this.form = this.defineForm()

		this.pageService.setPageTitle('QR Code Generator')
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
