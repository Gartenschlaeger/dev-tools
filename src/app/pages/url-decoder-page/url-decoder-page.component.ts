import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { FormService } from 'src/app/modules/form/services/form-service.service'
import { PageComponent } from 'src/app/pages/PageComponent'

export class UrlDecoderModel {
	url: string = ''
}

export interface UrlDecoderResult {
	decodedUrl: string
}

const FormDefaults = new UrlDecoderModel()

@Component({
	selector: 'app-urldecoder-page',
	templateUrl: './url-decoder-page.component.html'
})
export class URLDecoderPageComponent extends PageComponent implements OnInit {
	form!: FormGroup
	result?: UrlDecoderResult | null = null
	hasErrors = false

	constructor(private route: ActivatedRoute, private fb: FormBuilder, private fs: FormService) {
		super(route)
	}

	ngOnInit() {
		this.form = this.defineForm()
	}

	defineForm(): FormGroup {
		return this.fb.group({
			url: [FormDefaults.url, [Validators.required]]
		})
	}

	handleReset() {
		this.form.reset()
		this.form.markAsUntouched()
		this.form.setValue(FormDefaults)
		this.result = null
	}

	handleSubmit() {
		if (this.fs.validateForm(this.form)) {
			const model: UrlDecoderModel = this.form.value

			try {
				this.result = {
					decodedUrl: decodeURI(model.url)
				}

				this.hasErrors = false
			} catch (error) {
				this.result = null
				this.hasErrors = true
			}
		}
	}
}
