import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { FormService } from 'src/app/services/form-service.service'

@Component({
	selector: 'app-url-analyzer-page',
	templateUrl: './url-analyzer-page.component.html'
})
export class UrlAnalyzerPageComponent implements OnInit {
	groupUrlAnalyzer!: FormGroup
	url?: URL
	error?: string

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
				this.url = new URL(this.groupUrlAnalyzer.get('url')?.value)
				this.error = undefined
			} catch (err) {
				this.error = 'Failed to parse url. Invalid format?'
				console.error(err)
			}
		}
	}
}
