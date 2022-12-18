import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { StringBuilder } from '../../../../modules/shared/utilities/string-builder';
import { ColorHSL, ColorRGB } from '../../services/color-converter.service';
import {
    ColorPickerPlaceholderDialogComponent
} from '../color-picker-placeholder-dialog/color-picker-placeholder-dialog.component';

export interface ExportColorsData {
    palette: ExportColorDataItem[];
}

export interface ExportColorDataItem {
    rgb: ColorRGB;
    hsl: ColorHSL;
    hex: string;
}

const defaultFormat = '$r $g $b';

@Component({
    selector: 'app-export-colors-sheet',
    templateUrl: './export-colors-sheet.component.html',
    styleUrls: ['./export-colors-sheet.component.scss']
})
export class ExportColorsSheetComponent {
    output?: string;
    data: ExportColorsData;
    form = new FormGroup({
        exportFormat: new FormControl<string>(defaultFormat)
    });

    constructor(@Inject(MAT_BOTTOM_SHEET_DATA) data: ExportColorsData,
                private _matDialog: MatDialog) {
        this.data = data;
        this.buildOutput();
    }

    buildOutput() {
        const formatString = this.form.value.exportFormat!;

        let builder = new StringBuilder();
        for (let i = 0; i < this.data.palette.length; i++) {
            const color = this.data.palette[i];

            let line = formatString;
            line = line.replace(/\$i/, String(i));
            line = line.replace(/\$n2/, String(i + 1).padStart(2, '0'));
            line = line.replace(/\$n3/, String(i + 1).padStart(3, '0'));
            line = line.replace(/\$n/, String(i + 1));
            line = line.replace(/\$hex/, String(color.hex));
            line = line.replace(/\$r/, String(color.rgb.r));
            line = line.replace(/\$g/, String(color.rgb.g));
            line = line.replace(/\$b/, String(color.rgb.b));
            line = line.replace(/\$h/, String(color.hsl.h));
            line = line.replace(/\$s/, String(color.hsl.s));
            line = line.replace(/\$l/, String(color.hsl.l));

            builder.appendLine(line);
        }

        this.output = builder.build();
    }

    handleFormat() {
        this.buildOutput();
    }

    public handleHelp() {
        this._matDialog.open(ColorPickerPlaceholderDialogComponent, {
            autoFocus: false
        });
    }
}
