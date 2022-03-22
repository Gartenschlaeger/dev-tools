import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { FormService } from 'src/app/services/form-service.service'

export class UrlAnalyzerResult {
	hostname?: string
	port?: string
	path?: string
	queryString?: string
	queryStringValues: { name: string; value: string }[] = []
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
	showQueryDetails = false

	constructor(public formService: FormService) {}

	ngOnInit(): void {
		this.groupUrlAnalyzer = this.defineFormGroup()
	}

	defineFormGroup(): FormGroup {
		return new FormGroup({
			url: new FormControl('', {
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
}
