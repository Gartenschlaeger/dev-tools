import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FormService } from '../../modules/form/services/form-service.service'
import { TextDiffService } from './services/text-diff-service'

class TextDiffFormModel {
	left: string = ''
	right: string = ''
}

const FormDefaults = new TextDiffFormModel()

@Component({
	selector: 'app-text-diff',
	templateUrl: './text-diff.component.html'
})
export class TextDiffComponent {
	form!: FormGroup

	constructor(private fb: FormBuilder, private formService: FormService, private textDiffService: TextDiffService) {
		this.form = this.defineForm()
	}

	defineForm(): FormGroup {
		return this.fb.group({
			left: [FormDefaults.left, [Validators.required]],
			right: [FormDefaults.right, [Validators.required]]
		})
	}

	async handleSubmit() {
		if (this.formService.validate(this.form)) {
			const model: TextDiffFormModel = this.form.value
			const diff = await this.textDiffService.getDiffsByLines(model.left, model.right)

			// TODO: visualize diffs
			console.log(diff)

			// this.result = diff
		}
	}

	handleReset() {
		this.formService.reset(this.form, FormDefaults)
		//this.result = null
	}
}
