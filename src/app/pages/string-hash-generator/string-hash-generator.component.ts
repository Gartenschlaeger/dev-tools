import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import * as CryptoJS from 'crypto-js'
import { FormService } from '../../modules/form/services/form-service.service'
import { PageComponent } from '../PageComponent'

class StringHashGeneratorFormModel {
	algorithm: StringHashAlgorithm = 'md5'
	inputText: string = ''
	key: string = ''
}

const FormDefaults = new StringHashGeneratorFormModel()

export type StringHashAlgorithm = 'md5' | 'md5hmac' | 'sha1'

@Component({
	selector: 'app-string-hash-generator',
	templateUrl: './string-hash-generator.component.html'
})
export class StringHashGeneratorComponent extends PageComponent implements OnInit {
	form!: FormGroup
	hashedString: string | null = null
	error: string | null = null

	constructor(route: ActivatedRoute, private fb: FormBuilder, private formService: FormService) {
		super(route)
	}

	ngOnInit() {
		this.form = this.defineForm()
	}

	defineForm(): FormGroup {
		return this.fb.group(
			{
				algorithm: [FormDefaults.algorithm, [Validators.required]],
				key: [FormDefaults.key],
				inputText: [FormDefaults.inputText, [Validators.required]]
			},
			{
				validators: [this.keyValidator]
			}
		)
	}

	keyValidator(form: FormGroup): ValidationErrors | null {
		const model: StringHashGeneratorFormModel = form.value
		if (model.algorithm === 'md5hmac' && model.key && model.key.length) {
			return null
		}

		return { required: true }
	}

	handleReset() {
		this.hashedString = null
		this.error = null
		this.formService.reset(this.form, FormDefaults)
	}

	handleSubmit() {
		if (this.formService.validate(this.form)) {
			const model: StringHashGeneratorFormModel = this.form.value
			if (model.algorithm && model.inputText) {
				try {
					this.error = null

					switch (model.algorithm) {
						case 'md5':
							this.hashedString = CryptoJS.MD5(model.inputText).toString()
							break
						case 'md5hmac':
							this.hashedString = CryptoJS.HmacMD5(model.inputText, model.key).toString()
							break
						case 'sha1':
							this.hashedString = CryptoJS.SHA1(model.inputText).toString()
							break
					}
				} catch (err: any) {
					this.error = `Error while hashing string : "${err?.message ?? err}"`
				}
			}
		}
	}
}
