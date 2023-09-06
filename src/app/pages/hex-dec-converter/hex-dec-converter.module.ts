import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HexDecConverterComponent } from './components/hex-dec-converter/hex-dec-converter.component';

const routes: Route[] = [
    {
        path: '',
        component: HexDecConverterComponent
    }
];

@NgModule({
    declarations: [HexDecConverterComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export default class HexDecConverterModule {}
