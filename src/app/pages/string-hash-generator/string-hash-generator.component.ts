import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import * as CryptoJS from 'crypto-js'
import { FormService } from '../../modules/form/services/form-service.service'
import { LoggingService } from '../../modules/shared/services/logging.service'
import { PageService } from '../../utilities/page-service'

interface StringHashGeneratorFormModel {
	key: string
	inputText: string
}

export type StringHashAlgorithm = 'md5' | 'md5hmac' | 'sha1'

@Component({
	selector: 'app-string-hash-generator',
	templateUrl: './string-hash-generator.component.html'
})
export class StringHashGeneratorComponent implements OnInit {
	form!: FormGroup
	pageTitle!: string
	algorithm: StringHashAlgorithm | null = null

	hashedString: string | null = null
	error: string | null = null

	constructor(
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private formService: FormService,
		private logger: LoggingService,
		private pageService: PageService
	) {}

	ngOnInit() {
		this.setAlgorithm(this.route.snapshot.paramMap.get('algorithm') as StringHashAlgorithm)
		this.route.paramMap.subscribe((paramMap) => {
			this.setAlgorithm(paramMap.get('algorithm') as StringHashAlgorithm)
			this.handleReset()

			this.pageService.setPageTitle(this.pageTitle)
		})

		this.pageService.setPageTitle(this.pageTitle)
	}

	setAlgorithm(algorithm: StringHashAlgorithm | null) {
		switch (algorithm) {
			case 'md5':
			case 'md5hmac':
			case 'sha1':
				this.algorithm = algorithm
				break

			default:
				this.logger.warning(`Got invalid algorithm ${algorithm}, fallback to md5`)
				this.algorithm = 'md5'
				break
		}

		this.form = this.defineForm()
		this.pageTitle = `${this.getAlgorithmName()} Hash Generator`
	}

	getAlgorithmName(): string | null {
		switch (this.algorithm) {
			case 'md5':
				return 'MD5'
			case 'md5hmac':
				return 'HMAC MD5'
			case 'sha1':
				return 'SHA1'
		}

		return null
	}

	defineForm(): FormGroup {
		const form = this.fb.group({
			inputText: ['', [Validators.required]]
		})

		if (this.algorithm === 'md5hmac') {
			form.addControl('key', new FormControl('', [Validators.required]))
		}

		return form
	}

	handleReset() {
		this.hashedString = null
		this.error = null
		this.formService.reset(this.form)
	}

	handleSubmit() {
		if (this.formService.validate(this.form)) {
			const model: StringHashGeneratorFormModel = this.form.value
			if (model.inputText) {
				try {
					switch (this.algorithm) {
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

					this.error = null
				} catch (err: any) {
					this.error = `Error while hashing string : "${err?.message ?? err}"`
				}
			}
		}
	}
}
