import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { FormService } from 'src/app/modules/form/services/form-service.service'
import { PageComponent } from 'src/app/pages/PageComponent'
import * as randomizer from '../../utilities/randomizer'

export class StringRandomizerFormModel {
	sourceText: string = ''
	trimResult: boolean = false
	splitIntoWords: boolean = false
}

export class StringRandomizerResultModel {
	randomizedValue?: string
}

const FormDefaults = new StringRandomizerFormModel()

@Component({
	selector: 'app-string-randomizer',
	templateUrl: './string-randomizer.component.html'
})
export class StringRandomizerComponent extends PageComponent implements OnInit {
	form!: FormGroup
	result?: StringRandomizerResultModel

	constructor(route: ActivatedRoute, private fb: FormBuilder, private formService: FormService) {
		super(route)
	}

	ngOnInit() {
		this.form = this.defineForm()
	}

	defineForm(): FormGroup {
		return this.fb.group({
			sourceText: [FormDefaults.sourceText, [Validators.required]],
			trimResult: [FormDefaults.trimResult],
			splitIntoWords: [FormDefaults.splitIntoWords]
		})
	}

	handleReset() {
		this.formService.reset(this.form, FormDefaults)
		this.result = undefined
	}

	handleSubmit() {
		if (this.formService.validate(this.form)) {
			const model: StringRandomizerFormModel = this.form.value

			let randomizedValue: string

			if (model.splitIntoWords) {
				const words = model.sourceText.split(' ')
				const shuffledArray = randomizer.shuffleArray(words)
				randomizedValue = shuffledArray.join(' ')
			} else {
				randomizedValue = randomizer.shuffleString(model.sourceText)
			}

			if (model.trimResult) {
				randomizedValue = randomizedValue.trim()
			}

			this.result = {
				randomizedValue
			}
		}
	}
}
