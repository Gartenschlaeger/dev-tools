import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { StringBuilder } from '../../../../modules/shared/utilities/string-builder';
import { ColorRGB } from '../../services/colorconverter';

export interface ExportColorsData {
    palette: ColorRGB[];
}

@Component({
    selector: 'app-export-colors-sheet',
    templateUrl: './export-colors-sheet.component.html',
    styleUrls: ['./export-colors-sheet.component.scss']
})
export class ExportColorsSheetComponent {
    json?: string;

    constructor(@Inject(MAT_BOTTOM_SHEET_DATA) data: ExportColorsData) {
        let builder = new StringBuilder();
        builder.appendLine('[');
        for (let i = 0; i < data.palette.length; i++) {
            builder.append('  ');
            builder.append(JSON.stringify(data.palette[i]));
            if (i + 1 < data.palette.length) {
                builder.append(',');
            }
            builder.appendLine();
        }
        builder.appendLine(']');

        this.json = builder.build();
    }
}
