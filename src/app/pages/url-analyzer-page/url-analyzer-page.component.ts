import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { FormService } from 'src/app/services/form-service.service'

export class UrlAnalyzerResult {
	hostname?: string
	port?: string
	path?: string
	queryString?: string
	queryStringValues: { [name: string]: string } = {}
	fragment?: string
}

@Component({
	selector: 'app-url-analyzer-page',
	templateUrl: './url-analyzer-page.component.html'
})
export class UrlAnalyzerPageComponent implements OnInit {
	groupUrlAnalyzer!: FormGroup
	result: UrlAnalyzerResult | null = null
	hasError = false

	constructor(public formService: FormService) {}

	ngOnInit(): void {
		this.groupUrlAnalyzer = this.defineFormGroup()
	}

	defineFormGroup(): FormGroup {
		return new FormGroup({
			url: new FormControl('https://www.google.de?q=das+ist+ein+test&p=1&s=25', {
				validators: [Validators.required]
			})
		})
	}

	submitHandler() {
		if (this.formService.validateForm(this.groupUrlAnalyzer)) {
			try {
				const url = new URL(this.groupUrlAnalyzer.get('url')?.value)

				this.result = new UrlAnalyzerResult()
				this.result.hostname = url.hostname
				this.result.port = url.port
				this.result.path = url.pathname
				this.result.queryString = url.search
				if (this.result.queryStringValues) {
					url.searchParams.forEach((val, key) => {
						this.result!.queryStringValues[key] = val
					})
				}
			} catch (err) {
				this.result = null
				this.hasError = true
			}
		}
	}

	handleToogleSearchDetails() {}
}
