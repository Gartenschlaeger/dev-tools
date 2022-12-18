import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
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
        this.json = JSON.stringify(data.palette, undefined, '  ');
    }
}
