import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ColorHSL, ColorRGB, hslToRgb, rbgToHsl } from '../../utilities/colorconverter'
import { PageService } from '../../utilities/page-service'

export interface ColorPicketFormModel {
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

const InitColor: ColorRGB = { r: 135, g: 206, b: 235 }

@Component({
	selector: 'app-color-converter',
	templateUrl: './color-picker.component.html'
})
export class ColorPickerComponent implements OnInit {
	form!: FormGroup
	palette: (ColorRGB | null)[] = [InitColor]
	selectedPaletteColorIndex: number = 0
	hexValue: string = ''
	rgbValue: string = ''
	hslValue: string = ''

	constructor(private pageService: PageService, private fb: FormBuilder) {}

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

		this.pageService.setPageTitle('Color picker')
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
		const hsl = rbgToHsl(InitColor)

		return this.fb.group({
			valueRN: [InitColor.r],
			valueRR: [InitColor.r],
			valueGN: [InitColor.g],
			valueGR: [InitColor.g],
			valueBN: [InitColor.b],
			valueBR: [InitColor.b],

			valueHN: [hsl.h],
			valueHR: [hsl.h],
			valueSN: [hsl.s],
			valueSR: [hsl.s],
			valueLN: [hsl.l],
			valueLR: [hsl.l]
		})
	}

	syncRgbToHsl() {
		const model: ColorPicketFormModel = this.form.value
		const hsl = rbgToHsl(this.toRGB(model))

		this.form.get('valueHN')?.setValue(hsl.h, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
		this.form.get('valueSN')?.setValue(hsl.s, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
		this.form.get('valueLN')?.setValue(hsl.l, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })

		this.form.get('valueHR')?.setValue(hsl.h, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
		this.form.get('valueSR')?.setValue(hsl.s, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
		this.form.get('valueLR')?.setValue(hsl.l, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
	}

	syncHslToRgb() {
		const model: ColorPicketFormModel = this.form.value
		const rgb = hslToRgb(this.toHSL(model))

		this.form.get('valueRN')?.setValue(rgb.r, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
		this.form.get('valueGN')?.setValue(rgb.g, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
		this.form.get('valueBN')?.setValue(rgb.b, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })

		this.form.get('valueRR')?.setValue(rgb.r, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
		this.form.get('valueGR')?.setValue(rgb.g, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
		this.form.get('valueBR')?.setValue(rgb.b, { onlySelf: true, emitEvent: false, emitModelToViewChange: true })
	}

	updateValues() {
		this.updateHexValue()
		this.updateRgbValue()
		this.updateHslValue()

		this.palette[this.selectedPaletteColorIndex] = this.toRGB(this.form.value)
	}

	updateHexValue() {
		const model: ColorPicketFormModel = this.form.value
		const hexR = model.valueRN.toString(16).padStart(2, '0')
		const hexG = model.valueGN.toString(16).padStart(2, '0')
		const hexB = model.valueBN.toString(16).padStart(2, '0')

		this.hexValue = `#${hexR}${hexG}${hexB}`
	}

	toRGB(model: ColorPicketFormModel): ColorRGB {
		return {
			r: model.valueRN,
			g: model.valueGN,
			b: model.valueBN
		}
	}

	toHSL(model: ColorPicketFormModel): ColorHSL {
		return {
			h: model.valueHN,
			s: model.valueSN,
			l: model.valueLN
		}
	}

	updateRgbValue() {
		const model: ColorPicketFormModel = this.form.value
		const rgb = this.toRGB(model)

		this.rgbValue = `rgb(${rgb.r},${rgb.g},${rgb.b})`
	}

	updateHslValue() {
		const model: ColorPicketFormModel = this.form.value
		const hsl = this.toHSL(model)

		this.hslValue = `hsl(${hsl.h},${hsl.s},${hsl.l})`
	}

	handlePaletteColorClick(index: number) {
		this.selectedPaletteColorIndex = index

		const rgb = this.palette[index]
		if (rgb) {
			this.form.patchValue({
				valueRN: rgb.r,
				valueGN: rgb.g,
				valueBN: rgb.b
			})
		} else {
			this.palette[index] = this.toRGB(this.form.value)
		}
	}

	handleAddPalleteColor() {
		this.palette.push(this.toRGB(this.form.value))
		this.selectedPaletteColorIndex = this.palette.length - 1
	}
}
