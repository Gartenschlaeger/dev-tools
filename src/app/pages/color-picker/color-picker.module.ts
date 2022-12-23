import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { ColorPickerComponent } from './components/color-picker.component';
import { ExportColorsSheetComponent } from './components/export-colors-sheet/export-colors-sheet.component';
import { ColorConverterService } from './services/color-converter.service';
import {
    ColorPickerPlaceholderDialogComponent
} from './components/color-picker-placeholder-dialog/color-picker-placeholder-dialog.component';

const routes: Route[] = [
    {
        path: '',
        component: ColorPickerComponent
    }
];

@NgModule({
    declarations: [ColorPickerComponent, ExportColorsSheetComponent, ColorPickerPlaceholderDialogComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
    providers: [ColorConverterService]
})
export default class ColorPickerModule {
}
