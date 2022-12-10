import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { SharedModule } from '../../modules/shared/shared.module';
import { QrCodeGeneratorComponent } from './components/qrcode-generator.component';

const routes: Route[] = [
    {
        path: '',
        component: QrCodeGeneratorComponent
    }
];

@NgModule({
    declarations: [QrCodeGeneratorComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule, QRCodeModule]
})
export class QRCodeGeneratorModule {
}
