import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { FormService } from 'src/app/modules/form/services/form-service.service'
import { PageComponent } from 'src/app/pages/PageComponent'

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
export class UrlAnalyzerPageComponent extends PageComponent implements OnInit {
	form!: FormGroup
	result: UrlAnalyzerResult | null = null
	hasError = false
	showQueryDetails = false

	constructor(public formService: FormService, private route: ActivatedRoute) {
		super(route)
	}

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

	handleSubmit() {
		if (this.formService.validate(this.form)) {
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
		this.formService.reset(this.form, UrlAnalyzerFormDefaults)
		this.result = null
	}
}
