import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SharedDialogsService } from '../../../components/shared-dialogs/services/shared-dialogs.service';
import { ColorPicketFormModel } from '../entities/color-picker-form-model';
import { ColorConverterService, ColorHSL, ColorRGB } from '../services/color-converter.service';
import {
    ExportColorDataItem,
    ExportColorsData,
    ExportColorsSheetComponent
} from './export-colors-sheet/export-colors-sheet.component';

const KEY_LOCAL_STORAGE_FORM = 'color-picker.form.value';
const KEY_LOCAL_STORAGE_PALETTE_VALUES = 'color-picker.palette.values';
const KEY_LOCAL_STORAGE_PALETTE_SELECT = 'color-picker.palette.select';

const InitColor: ColorRGB = { r: 128, g: 128, b: 128 };

@Component({
    selector: 'app-color-converter',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
    form!: UntypedFormGroup;
    palette: (ColorRGB | null)[] = [InitColor];
    selectedPaletteColorIndex: number = 0;
    hexValue: string = '';
    rgbValue: string = '';
    rgbValueDecimal: string = '';
    hslValue: string = '';

    constructor(private _formBuilder: UntypedFormBuilder,
                private _sharedDialogs: SharedDialogsService,
                private _colorConverterService: ColorConverterService,
                private _bottomSheet: MatBottomSheet) {
    }

    ngOnInit() {
        this.form = this.defineForm();
        this.form.valueChanges.subscribe(() => this.updateValues());

        this.keepControlsInSync('valueRN', 'valueRR');
        this.keepControlsInSync('valueGN', 'valueGR');
        this.keepControlsInSync('valueBN', 'valueBR');

        this.keepControlsInSync('valueHN', 'valueHR');
        this.keepControlsInSync('valueSN', 'valueSR');
        this.keepControlsInSync('valueLN', 'valueLR');

        this.form.get('valueRN')?.valueChanges.subscribe(() => this.syncRgbToHsl());
        this.form.get('valueRR')?.valueChanges.subscribe(() => this.syncRgbToHsl());
        this.form.get('valueGN')?.valueChanges.subscribe(() => this.syncRgbToHsl());
        this.form.get('valueGR')?.valueChanges.subscribe(() => this.syncRgbToHsl());
        this.form.get('valueBN')?.valueChanges.subscribe(() => this.syncRgbToHsl());
        this.form.get('valueBR')?.valueChanges.subscribe(() => this.syncRgbToHsl());

        this.form.get('valueHN')?.valueChanges.subscribe(() => this.syncHslToRgb());
        this.form.get('valueHR')?.valueChanges.subscribe(() => this.syncHslToRgb());
        this.form.get('valueSN')?.valueChanges.subscribe(() => this.syncHslToRgb());
        this.form.get('valueSR')?.valueChanges.subscribe(() => this.syncHslToRgb());
        this.form.get('valueLN')?.valueChanges.subscribe(() => this.syncHslToRgb());
        this.form.get('valueLR')?.valueChanges.subscribe(() => this.syncHslToRgb());

        this.loadPalette();
        this.updateValues();
    }

    keepControlsInSync(controlA: string, controlB: string) {
        this.form.get(controlA)?.valueChanges.subscribe((value) => {
            this.form.get(controlB)?.setValue(value, {
                onlySelf: false,
                emitEvent: false,
                emitModelToViewChange: true
            });
        });
        this.form.get(controlB)?.valueChanges.subscribe((value) => {
            this.form.get(controlA)?.setValue(value, {
                onlySelf: false,
                emitEvent: false,
                emitModelToViewChange: true
            });
        });
    }

    defineForm(): UntypedFormGroup {
        const hsl = this._colorConverterService.rbgToHsl(InitColor);
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
        };

        const fromLocalStorageValue = localStorage.getItem(KEY_LOCAL_STORAGE_FORM);
        if (fromLocalStorageValue) {
            model = JSON.parse(fromLocalStorageValue);
        }

        return this._formBuilder.group({
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
        });
    }

    syncRgbToHsl() {
        const model: ColorPicketFormModel = this.form.value;
        const hsl = this._colorConverterService.rbgToHsl(this.toRGB(model));

        this.form.get('valueHN')?.setValue(hsl.h, { onlySelf: true, emitEvent: false, emitModelToViewChange: true });
        this.form.get('valueSN')?.setValue(hsl.s, { onlySelf: true, emitEvent: false, emitModelToViewChange: true });
        this.form.get('valueLN')?.setValue(hsl.l, { onlySelf: true, emitEvent: false, emitModelToViewChange: true });

        this.form.get('valueHR')?.setValue(hsl.h, { onlySelf: true, emitEvent: false, emitModelToViewChange: true });
        this.form.get('valueSR')?.setValue(hsl.s, { onlySelf: true, emitEvent: false, emitModelToViewChange: true });
        this.form.get('valueLR')?.setValue(hsl.l, { onlySelf: true, emitEvent: false, emitModelToViewChange: true });
    }

    syncHslToRgb() {
        const model: ColorPicketFormModel = this.form.value;
        const rgb = this._colorConverterService.hslToRgb(this.toHSL(model));

        this.form.get('valueRN')?.setValue(rgb.r, { onlySelf: true, emitEvent: false, emitModelToViewChange: true });
        this.form.get('valueGN')?.setValue(rgb.g, { onlySelf: true, emitEvent: false, emitModelToViewChange: true });
        this.form.get('valueBN')?.setValue(rgb.b, { onlySelf: true, emitEvent: false, emitModelToViewChange: true });

        this.form.get('valueRR')?.setValue(rgb.r, { onlySelf: true, emitEvent: false, emitModelToViewChange: true });
        this.form.get('valueGR')?.setValue(rgb.g, { onlySelf: true, emitEvent: false, emitModelToViewChange: true });
        this.form.get('valueBR')?.setValue(rgb.b, { onlySelf: true, emitEvent: false, emitModelToViewChange: true });
    }

    updateValues() {
        this.updateHexValue();
        this.updateRgbValue();
        this.updateHslValue();

        this.palette[this.selectedPaletteColorIndex] = this.toRGB(this.form.value);

        this.saveFormValue();
        this.savePalette();
    }

    saveFormValue() {
        localStorage.setItem(KEY_LOCAL_STORAGE_FORM, JSON.stringify(this.form.value));
    }

    savePalette() {
        localStorage.setItem(KEY_LOCAL_STORAGE_PALETTE_VALUES, JSON.stringify(this.palette));
        localStorage.setItem(KEY_LOCAL_STORAGE_PALETTE_SELECT, JSON.stringify(this.selectedPaletteColorIndex));
    }

    loadPalette() {
        const value = localStorage.getItem(KEY_LOCAL_STORAGE_PALETTE_VALUES);
        if (value) {
            this.palette = JSON.parse(value);
        }

        const selection = localStorage.getItem(KEY_LOCAL_STORAGE_PALETTE_SELECT);
        if (selection) {
            this.selectedPaletteColorIndex = JSON.parse(selection);
        }
    }

    updateHexValue() {
        const color = this.toRGB(this.form.value);
        this.hexValue = this._colorConverterService.rgbToHex(color);
    }

    toRGB(model: ColorPicketFormModel): ColorRGB {
        return {
            r: model.valueRN,
            g: model.valueGN,
            b: model.valueBN
        };
    }

    toHSL(model: ColorPicketFormModel): ColorHSL {
        return {
            h: model.valueHN,
            s: model.valueSN,
            l: model.valueLN
        };
    }

    updateRgbValue() {
        const model: ColorPicketFormModel = this.form.value;
        const rgb = this.toRGB(model);

        this.rgbValue = `${rgb.r} ${rgb.g} ${rgb.b}`;
        this.rgbValueDecimal = `${(rgb.r / 255).toFixed(2)} ${(rgb.g / 255).toFixed(2)} ${(rgb.b / 255).toFixed(2)}`;
    }

    updateHslValue() {
        const model: ColorPicketFormModel = this.form.value;
        const hsl = this.toHSL(model);

        this.hslValue = `${hsl.h} ${hsl.s} ${hsl.l}`;
    }

    handlePaletteColorClick(index: number) {
        this.selectedPaletteColorIndex = index;

        const rgb = this.palette[index];
        if (rgb) {
            this.form.patchValue({
                valueRN: rgb.r,
                valueGN: rgb.g,
                valueBN: rgb.b
            });
        } else {
            this.palette[index] = this.toRGB(this.form.value);
        }
    }

    handleAddPaletteColor() {
        const newColor = this.toRGB(this.form.value);
        const newIndex = this.selectedPaletteColorIndex + 1;

        this.palette.splice(newIndex, 0, newColor);
        this.selectedPaletteColorIndex = newIndex;

        this.savePalette();
    }

    handleRemoveColor() {
        if (this.palette.length > 1) {
            this.palette.splice(this.selectedPaletteColorIndex, 1);

            if (this.selectedPaletteColorIndex > 0) {
                this.selectedPaletteColorIndex--;
            } else {
                this.selectedPaletteColorIndex = 0;
            }

            this.handlePaletteColorClick(this.selectedPaletteColorIndex);
        }
    }

    handlePickHex() {
        const hexPattern = /^#?([0-9a-fA-F]{1,2})([0-9a-fA-F]{1,2})([0-9a-fA-F]{1,2})$/;
        this._sharedDialogs.openInputDialog({
            title: 'Pick hexadecimal value',
            format: hexPattern,
            value: this.hexValue
        }).subscribe(result => {
            if (result) {
                const match = hexPattern.exec(result);
                if (match) {
                    const values = [];
                    for (let i = 1; i <= 3; i++) {
                        const v = parseInt(match[i].length == 1 ? match[i] + match[i] : match[i], 16);
                        values.push(v);
                    }

                    this.form.patchValue({
                        valueRN: values[0],
                        valueGN: values[1],
                        valueBN: values[2]
                    });
                }
            }
        });
    }

    handlePickRgb() {
        const rgbPattern = /^(\d{1,3})\s(\d{1,3})\s(\d{1,3})$/;
        this._sharedDialogs.openInputDialog({
            title: 'Pick RGB value',
            format: rgbPattern,
            value: this.rgbValue
        }).subscribe(result => {
            if (result) {
                const match = rgbPattern.exec(result);
                if (match) {
                    const values = match.slice(1).map(v => parseInt(v));
                    this.form.patchValue({
                        valueRN: Math.round(Math.min(255, values[0])),
                        valueGN: Math.round(Math.min(255, values[1])),
                        valueBN: Math.round(Math.min(255, values[2]))
                    });
                }
            }
        });
    }

    public handleClearPalette() {
        this.palette = [{ r: 128, g: 128, b: 128 }];
        this.selectedPaletteColorIndex = 0;
        this.handlePaletteColorClick(this.selectedPaletteColorIndex);
    }

    public handleCreatePalette() {
        const hsl = this.toHSL(this.form.value);

        const newPalette: ColorRGB[] = [];

        let currentL = hsl.l;

        const colorsToGenerate = 10;
        const left = 100 - currentL;
        const step = left / colorsToGenerate;
        for (let i = 0; i < colorsToGenerate; i++) {
            currentL += step;
            const newColorHSL: ColorHSL = {
                h: hsl.h,
                s: hsl.s,
                l: currentL
            };

            newPalette.push(this._colorConverterService.hslToRgb(newColorHSL));
        }

        // TODO: optimize
        for (let i = 0; i < newPalette.length; i++) {
            this.palette.splice(this.selectedPaletteColorIndex + i + 1, 0, newPalette[i]);
        }
    }

    public handleExportPalette() {
        const palette: ExportColorDataItem[] = this.palette.map(c => {
            const color = c!;
            return {
                rgb: color,
                hsl: this._colorConverterService.rbgToHsl(color),
                hex: this._colorConverterService.rgbToHex(color)
            };
        });

        const sheetData: ExportColorsData = {
            palette: palette
        };

        this._bottomSheet.open(ExportColorsSheetComponent, {
            data: sheetData
        });
    }
}
