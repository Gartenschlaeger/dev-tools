import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { PageComponent } from 'src/app/pages/PageComponent'
import { v4 as uuidv4 } from 'uuid'

export class GuidGeneratorModel {
	addDashes: boolean = true
	addCurlyBraces: boolean = false
}

const FormDefaultValues = new GuidGeneratorModel()

@Component({
	selector: 'app-guid-generator',
	templateUrl: './guid-generator.component.html'
})
export class GuidGeneratorComponent extends PageComponent implements OnInit {
	form!: FormGroup
	guid?: string

	constructor(private fb: FormBuilder, private route: ActivatedRoute) {
		super(route)
	}

	ngOnInit() {
		this.form = this.fb.group({
			addDashes: [FormDefaultValues.addDashes],
			addCurlyBraces: [FormDefaultValues.addCurlyBraces]
		})

		this.form.valueChanges.subscribe(() => {
			this.generateGuid()
		})

		this.generateGuid()
	}

	generateGuid() {
		const model: GuidGeneratorModel = this.form.value

		this.guid = uuidv4()

		if (!model.addDashes) {
			this.guid = this.guid.replace(/-/g, '')
		}
		if (model.addCurlyBraces) {
			this.guid = `{${this.guid}}`
		}
	}

	handleGenerate() {
		this.generateGuid()
	}
}
