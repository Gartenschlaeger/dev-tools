import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { FormService } from 'src/app/services/form-service.service'

export class UrlAnalyzerModel {
	url: string = ''
}

export class UrlAnalyzerResult {
	hostname?: string
	port?: string
	path?: string
	queryString?: string
	queryStringValues: { name: string; value: string }[] = []
	fragment?: string
}

const UrlAnalyzerFormDefaults = new UrlAnalyzerModel()

@Component({
	selector: 'app-url-analyzer-page',
	templateUrl: './url-analyzer-page.component.html'
})
export class UrlAnalyzerPageComponent implements OnInit {
	form!: FormGroup
	result: UrlAnalyzerResult | null = null
	hasError = false
	showQueryDetails = false

	constructor(public formService: FormService) {}

	ngOnInit(): void {
		this.form = this.defineFormGroup()
	}

	defineFormGroup(): FormGroup {
		return new FormGroup({
			url: new FormControl(UrlAnalyzerFormDefaults.url, {
				validators: [Validators.required, Validators.pattern('^http(s)?:\\/\\/.+')]
			})
		})
	}

	submitHandler() {
		if (this.formService.validateForm(this.form)) {
			try {
				const url = new URL(this.form.get('url')?.value)

				this.result = new UrlAnalyzerResult()
				this.result.hostname = url.hostname
				this.result.port = url.port
				this.result.path = url.pathname
				this.result.fragment = url.hash

				if (url.search) {
					this.result.queryString = url.search.substring(1)
				}

				if (this.result.queryStringValues) {
					url.searchParams.forEach((val, key) => {
						this.result?.queryStringValues.push({
							name: key,
							value: val
						})
					})
				}

				this.hasError = false
			} catch (err) {
				this.result = null
				this.hasError = true
			}
		}
	}

	handleToogleSearchDetails() {
		this.showQueryDetails = !this.showQueryDetails
	}

	handleReset() {
		this.form.reset()
		this.form.markAsUntouched()
		this.form.setValue(UrlAnalyzerFormDefaults)
		this.result = null
	}
}
