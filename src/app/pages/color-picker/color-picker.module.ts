import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { ColorPickerComponent } from './components/color-picker.component';
import { ExportColorsSheetComponent } from './components/export-colors-sheet/export-colors-sheet.component';

const routes: Route[] = [
    {
        path: '',
        component: ColorPickerComponent
    }
];

@NgModule({
    declarations: [ColorPickerComponent, ExportColorsSheetComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class ColorPickerModule {
}
