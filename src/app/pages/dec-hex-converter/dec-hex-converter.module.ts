import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { DecHexConverterComponent } from './components/dec-hex-converter/dec-hex-converter.component';

const routes: Route[] = [
    {
        path: '',
        component: DecHexConverterComponent
    }
];

@NgModule({
    declarations: [DecHexConverterComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export default class DecHexConverterModule {}
