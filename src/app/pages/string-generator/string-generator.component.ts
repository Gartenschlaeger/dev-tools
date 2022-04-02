import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { FormService } from 'src/app/modules/form/services/form-service.service'
import { LoggingService } from 'src/app/modules/shared/services/logging.service'
import * as randomizer from '../../utilities/randomizer'

export class StringGeneratorFormModel {
	includeLowercaseCharacters: boolean = true
	includeUppercaseCharacters: boolean = true
	includeNumbers: boolean = true
	includeSpecialCharacters: boolean = false
	specialCharacters: string = ''
	length: number = 25
}

export class StringGeneratorResultModel {
	generatedString?: string
}

const LowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz'
const UppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NumberCharacters = '0123456789'
const DefaultSpecialCharacters = '#$-_&'

const FormDefaults = new StringGeneratorFormModel()

@Component({
	selector: 'app-string-generator',
	templateUrl: './string-generator.component.html'
})
export class StringGeneratorComponent implements OnInit {
	form!: FormGroup
	result?: StringGeneratorResultModel

	get defaultSpecialCharacters() {
		return DefaultSpecialCharacters
	}

	constructor(
		route: ActivatedRoute,
		private fb: FormBuilder,
		private formService: FormService,
		private logger: LoggingService
	) {}

	ngOnInit() {
		this.form = this.defineForm()
	}

	defineForm(): FormGroup {
		return this.fb.group({
			includeLowercaseCharacters: [FormDefaults.includeLowercaseCharacters],
			includeUppercaseCharacters: [FormDefaults.includeUppercaseCharacters],
			includeNumbers: [FormDefaults.includeNumbers],
			includeSpecialCharacters: [FormDefaults.includeSpecialCharacters],
			specialCharacters: [FormDefaults.specialCharacters],
			length: [FormDefaults.length, [Validators.pattern('\\d+'), Validators.min(1), Validators.max(99)]]
		})
	}

	handleReset() {
		this.formService.reset(this.form, FormDefaults)
		this.result = undefined
	}

	handleSubmit() {
		this.logger.debug('handleSubmit()', this.form.valid, this.form)

		if (this.formService.validate(this.form)) {
			const model: StringGeneratorFormModel = this.form.value

			let types = ''
			types += model.includeLowercaseCharacters ? 'l' : ''
			types += model.includeUppercaseCharacters ? 'u' : ''
			types += model.includeNumbers ? 'n' : ''
			types += model.includeSpecialCharacters ? 's' : ''

			// prevent infine loop
			if (types.length === 0) {
				return
			}

			let result = ''
			while (result.length < model.length) {
				const type = randomizer.getRandomCharacter(types)
				switch (type) {
					case 'l':
						result += randomizer.getRandomCharacter(LowercaseCharacters)
						break
					case 'u':
						result += randomizer.getRandomCharacter(UppercaseCharacters)
						break
					case 'n':
						result += randomizer.getRandomCharacter(NumberCharacters)
						break
					case 's':
						result += randomizer.getRandomCharacter(model.specialCharacters || DefaultSpecialCharacters)
						break
				}
			}

			this.result = {
				generatedString: result
			}
		}
	}
}
