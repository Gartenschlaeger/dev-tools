import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { LoggingService } from 'src/app/modules/shared/services/logging.service'
import { PageComponent } from 'src/app/pages/PageComponent'
import * as colors from '../../utilities/colorconverter'

export interface ColorConverterFormModel {
	valueRN: number
	valueGN: number
	valueBN: number
	valueRR: number
	valueGR: number
	valueBR: number

	valueHN: number
	valueSN: number
	valueLN: number
	valueHR: number
	valueSR: number
	valueLR: number
}

@Component({
	selector: 'app-color-converter',
	templateUrl: './color-converter.component.html'
})
export class ColorConverterComponent extends PageComponent implements OnInit {
	form!: FormGroup
	hexValue: string = ''
	rgbValue: string = ''
	hslValue: string = ''

	constructor(route: ActivatedRoute, private fb: FormBuilder, private logger: LoggingService) {
		super(route)
	}

	ngOnInit() {
		this.form = this.defineForm()
		this.form.valueChanges.subscribe(() => this.updateValues())

		this.keepControlsInSync('valueRN', 'valueRR')
		this.keepControlsInSync('valueGN', 'valueGR')
		this.keepControlsInSync('valueBN', 'valueBR')

		this.keepControlsInSync('valueHN', 'valueHR')
		this.keepControlsInSync('valueSN', 'valueSR')
		this.keepControlsInSync('valueLN', 'valueLR')

		this.form.get('valueRN')?.valueChanges.subscribe(() => this.syncRgbToHsl())
		this.form.get('valueRR')?.valueChanges.subscribe(() => this.syncRgbToHsl())
		this.form.get('valueGN')?.valueChanges.subscribe(() => this.syncRgbToHsl())
		this.form.get('valueGR')?.valueChanges.subscribe(() => this.syncRgbToHsl())
		this.form.get('valueBN')?.valueChanges.subscribe(() => this.syncRgbToHsl())
		this.form.get('valueBR')?.valueChanges.subscribe(() => this.syncRgbToHsl())

		this.form.get('valueHN')?.valueChanges.subscribe(() => this.syncHslToRgb())
		this.form.get('valueHR')?.valueChanges.subscribe(() => this.syncHslToRgb())
		this.form.get('valueSN')?.valueChanges.subscribe(() => this.syncHslToRgb())
		this.form.get('valueSR')?.valueChanges.subscribe(() => this.syncHslToRgb())
		this.form.get('valueLN')?.valueChanges.subscribe(() => this.syncHslToRgb())
		this.form.get('valueLR')?.valueChanges.subscribe(() => this.syncHslToRgb())

		this.updateValues()
	}

	keepControlsInSync(controlA: string, controlB: string) {
		this.form.get(controlA)?.valueChanges.subscribe((value) => {
			this.form.get(controlB)?.setValue(value, { onlySelf: false, emitEvent: false, emitModelToViewChange: true })
		})
		this.form.get(controlB)?.valueChanges.subscribe((value) => {
			this.form.get(controlA)?.setValue(value, { onlySelf: false, emitEvent: false, emitModelToViewChange: true })
		})
	}

	defineForm(): FormGroup {
		const init = { r: 135, g: 206, b: 235 }
		const hsl = colors.rbgToHsl(init.r, init.g, init.b)

		return this.fb.group({
			valueRN: [init.r],
			valueRR: [init.r],
			valueGN: [init.g],
			valueGR: [init.g],
			valueBN: [init.b],
			valueBR: [init.b],

			valueHN: [Math.round(hsl[0])],
			valueHR: [Math.round(hsl[0])],
			valueSN: [Math.round(hsl[1])],
			valueSR: [Math.round(hsl[1])],
			valueLN: [Math.round(hsl[2])],
			valueLR: [Math.round(hsl[2])]
		})
	}

	syncRgbToHsl() {
		const model: ColorConverterFormModel = this.form.value

		const hsl = colors.rbgToHsl(model.valueRN, model.valueGN, model.valueBN)
		const h = Math.round(hsl[0])
		const s = Math.round(hsl[1])
		const l = Math.round(hsl[2])

		this.form.get('valueHN')?.setValue(h, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
		this.form.get('valueSN')?.setValue(s, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
		this.form.get('valueLN')?.setValue(l, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })

		this.form.get('valueHR')?.setValue(h, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
		this.form.get('valueSR')?.setValue(s, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
		this.form.get('valueLR')?.setValue(l, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })

		// this.logger.debug('syncRgbToHsl', h, s, l)
	}

	syncHslToRgb() {
		const model: ColorConverterFormModel = this.form.value

		const rgb = colors.hslToRgb(model.valueHN, model.valueSN, model.valueLN)
		const r = Math.round(rgb[0])
		const g = Math.round(rgb[1])
		const b = Math.round(rgb[2])

		this.form.get('valueRN')?.setValue(r, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
		this.form.get('valueGN')?.setValue(g, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
		this.form.get('valueBN')?.setValue(b, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })

		this.form.get('valueRR')?.setValue(r, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
		this.form.get('valueGR')?.setValue(g, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
		this.form.get('valueBR')?.setValue(b, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })

		// this.logger.debug('syncHslToRgb', r, g, b)
	}

	updateValues() {
		// this.logger.debug('updateValues', this.form.value)

		this.updateHexValue()
		this.updateRgbValue()
		this.updateHslValue()
	}

	updateHexValue() {
		const model: ColorConverterFormModel = this.form.value
		const hexR = model.valueRN.toString(16).padStart(2, '0')
		const hexG = model.valueGN.toString(16).padStart(2, '0')
		const hexB = model.valueBN.toString(16).padStart(2, '0')

		this.hexValue = `#${hexR}${hexG}${hexB}`
	}

	updateRgbValue() {
		const model: ColorConverterFormModel = this.form.value

		this.rgbValue = `rgb(${model.valueRN},${model.valueGN},${model.valueBN})`
	}

	updateHslValue() {
		const model: ColorConverterFormModel = this.form.value

		const hsl = colors.rbgToHsl(model.valueRN, model.valueGN, model.valueBN)
		const h = Math.round(hsl[0])
		const s = Math.round(hsl[1])
		const l = Math.round(hsl[2])

		this.hslValue = `hsl(${h},${s},${l})`
	}
}
