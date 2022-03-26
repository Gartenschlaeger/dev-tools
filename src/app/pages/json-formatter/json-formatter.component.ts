import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { FormService } from 'src/app/modules/form/services/form-service.service'
import { PageComponent } from 'src/app/pages/PageComponent'

export class JsonFormatterFormModel {
	source: string = ''
}

const FormDefaults = new JsonFormatterFormModel()

@Component({
	selector: 'app-json-formatter',
	templateUrl: './json-formatter.component.html'
})
export class JsonFormatterComponent extends PageComponent implements OnInit {
	form!: FormGroup

	constructor(route: ActivatedRoute, private fb: FormBuilder, private formService: FormService) {
		super(route)
	}

	ngOnInit() {
		this.form = this.defineForm()
	}

	defineForm(): FormGroup {
		return this.fb.group({
			source: [FormDefaults.source, [Validators.required]]
		})
	}

	handleReset() {}

	handleSubmit() {
		if (this.formService.validateForm(this.form)) {
		}
	}
}
