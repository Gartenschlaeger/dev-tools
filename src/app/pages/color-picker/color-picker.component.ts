import { Component, OnInit } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ColorHSL, ColorRGB, hslToRgb, rbgToHsl } from '../../utilities/colorconverter'
import { PageService } from '../../utilities/page-service'

const KEY_LOCAL_STORAGE_FORM = 'color-picker.form.value'
const KEY_LOCAL_STORAGE_PALETTE_VALUES = 'color-picker.palette.values'
const KEY_LOCAL_STORAGE_PALETTE_SELECT = 'color-picker.palette.select'

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
	form!: UntypedFormGroup
	palette: (ColorRGB | null)[] = [InitColor]
	selectedPaletteColorIndex: number = 0
	hexValue: string = ''
	rgbValue: string = ''
	rgbValueDecimal: string = ''
	hslValue: string = ''

	constructor(private pageService: PageService, private fb: UntypedFormBuilder) {}

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

		this.loadPalette()
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

	defineForm(): UntypedFormGroup {
		const hsl = rbgToHsl(InitColor)
		let model: ColorPicketFormModel = {
			valueRN: InitColor.r,
			valueRR: InitColor.r,
			valueGN: InitColor.g,
			valueGR: InitColor.g,
			valueBN: InitColor.b,
			valueBR: InitColor.b,

			valueHN: hsl.h,
			valueHR: hsl.h,
			valueSN: hsl.s,
			valueSR: hsl.s,
			valueLN: hsl.l,
			valueLR: hsl.l
		}

		const fromLocalStorageValue = localStorage.getItem(KEY_LOCAL_STORAGE_FORM)
		if (fromLocalStorageValue) {
			const fromLocalStorageModel: ColorPicketFormModel = JSON.parse(fromLocalStorageValue)
			model = fromLocalStorageModel
		}

		return this.fb.group({
			valueRN: [model.valueRN],
			valueRR: [model.valueRR],
			valueGN: [model.valueGN],
			valueGR: [model.valueGR],
			valueBN: [model.valueBN],
			valueBR: [model.valueBR],

			valueHN: [model.valueHN],
			valueHR: [model.valueHR],
			valueSN: [model.valueSN],
			valueSR: [model.valueSR],
			valueLN: [model.valueLN],
			valueLR: [model.valueLR]
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

		this.saveFormValue()
		this.savePalette()
	}

	saveFormValue() {
		localStorage.setItem(KEY_LOCAL_STORAGE_FORM, JSON.stringify(this.form.value))
	}

	savePalette() {
		localStorage.setItem(KEY_LOCAL_STORAGE_PALETTE_VALUES, JSON.stringify(this.palette))
		localStorage.setItem(KEY_LOCAL_STORAGE_PALETTE_SELECT, JSON.stringify(this.selectedPaletteColorIndex))
	}

	loadPalette() {
		const value = localStorage.getItem(KEY_LOCAL_STORAGE_PALETTE_VALUES)
		if (value) {
			const model = JSON.parse(value)
			this.palette = model
		}

		const selection = localStorage.getItem(KEY_LOCAL_STORAGE_PALETTE_SELECT)
		if (selection) {
			const model = JSON.parse(selection)
			this.selectedPaletteColorIndex = model
		}
	}

	updateHexValue() {
		const model: ColorPicketFormModel = this.form.value
		const hexR = model.valueRN.toString(16).padStart(2, '0')
		const hexG = model.valueGN.toString(16).padStart(2, '0')
		const hexB = model.valueBN.toString(16).padStart(2, '0')

		this.hexValue = `${hexR}${hexG}${hexB}`
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

		this.rgbValue = `${rgb.r} ${rgb.g} ${rgb.b}`
		this.rgbValueDecimal = `${(rgb.r / 255).toFixed(2)} ${(rgb.g / 255).toFixed(2)} ${(rgb.b / 255).toFixed(2)}`
	}

	updateHslValue() {
		const model: ColorPicketFormModel = this.form.value
		const hsl = this.toHSL(model)

		this.hslValue = `${hsl.h} ${hsl.s} ${hsl.l}`
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

		this.savePalette()
	}

	handleRemoveColor() {
		if (this.palette.length > 1) {
			this.palette.splice(this.selectedPaletteColorIndex, 1)

			if (this.selectedPaletteColorIndex > 0) {
				this.selectedPaletteColorIndex--
			} else {
				this.selectedPaletteColorIndex = 0
			}

			this.handlePaletteColorClick(this.selectedPaletteColorIndex)
		}
	}

	handlePickHex() {
		const pickedValue = prompt('Hex color (RGB or RRGGBB):', this.hexValue)
		if (pickedValue) {
			const regex = new RegExp('^#?([0-9a-fA-F]{1,2})([0-9a-fA-F]{1,2})([0-9a-fA-F]{1,2})$')
			const match = regex.exec(pickedValue)
			if (match) {
				const values = []
				for (let i = 1; i <= 3; i++) {
					const v = parseInt(match[i].length == 1 ? match[i] + match[i] : match[i], 16)
					values.push(v)
				}

				this.form.patchValue({
					valueRN: values[0],
					valueGN: values[1],
					valueBN: values[2]
				})
			}
		}
	}

	handlePickRgbDec() {
		const pickedValue = prompt('RGB (r g b):', this.rgbValueDecimal)
		if (pickedValue) {
			const parts = pickedValue.split(' ', 3)
			if (parts.length === 3) {
				// parse values
				const values = [parseFloat(parts[0].trim()), parseFloat(parts[1].trim()), parseFloat(parts[2].trim())]

				// check for valid values
				for (let i = 0; i < values.length; i++) {
					if (values[i] < 0 || values[i] > 1) {
						return
					}
				}

				this.form.patchValue({
					valueRN: Math.round(values[0] * 255),
					valueGN: Math.round(values[1] * 255),
					valueBN: Math.round(values[2] * 255)
				})
			}
		}
	}
}
