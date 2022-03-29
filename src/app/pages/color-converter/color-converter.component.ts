import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { PageComponent } from 'src/app/pages/PageComponent'
import * as colors from '../../utilities/colorconverter'

@Component({
	selector: 'app-color-converter',
	templateUrl: './color-converter.component.html'
})
export class ColorConverterComponent extends PageComponent implements OnInit {
	form!: FormGroup
	hexValue: string = ''
	rgbValue: string = ''
	hslValue: string = ''

	constructor(private route: ActivatedRoute, private fb: FormBuilder) {
		super(route)
	}

	ngOnInit() {
		this.form = this.defineForm()
		this.form.valueChanges.subscribe(() => this.updateConvertedValues())

		this.keepControlsInSync('valueR')
		this.keepControlsInSync('valueG')
		this.keepControlsInSync('valueB')

		this.updateConvertedValues()
	}

	defineForm(): FormGroup {
		return this.fb.group({
			valueR: [128],
			valueG: [128],
			valueB: [128]
		})
	}

	keepControlsInSync(controlName: string) {
		this.form.get(controlName)?.valueChanges.subscribe((value) => {
			this.form
				?.get(controlName)
				?.setValue(value, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
		})
	}

	updateConvertedValues() {
		this.hexValue = this.getHexValue()
		this.rgbValue = this.getRgbValue()

		const hsl = colors.rbgToHsl(
			parseInt(this.form.value.valueR),
			parseInt(this.form.value.valueG),
			parseInt(this.form.value.valueB)
		)

		this.hslValue = `hsl(${Math.round(hsl[0])},${Math.round(hsl[1])},${Math.round(hsl[2])})`
	}

	getHexValue() {
		const hexR = this.form.value.valueR.toString(16).padStart(2, '0')
		const hexG = this.form.value.valueG.toString(16).padStart(2, '0')
		const hexB = this.form.value.valueB.toString(16).padStart(2, '0')

		return `#${hexR}${hexG}${hexB}`
	}

	getRgbValue() {
		return `rgb(${this.form.value.valueR},${this.form.value.valueG},${this.form.value.valueB})`
	}
}
