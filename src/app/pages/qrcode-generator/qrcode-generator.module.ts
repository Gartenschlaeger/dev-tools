import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
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
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule, QRCodeComponent]
})
export default class QRCodeGeneratorModule {}
