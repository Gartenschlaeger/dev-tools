import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { QRCodeModule } from 'angular2-qrcode'
import { CustomRoute } from '../../modules/shared/entities/custom-route'
import { SharedModule } from '../../modules/shared/shared.module'
import { QrCodeGeneratorComponent } from './qrcode-generator.component'

const routes: CustomRoute[] = [
	{
		pageTitle: 'QR Code Generator',
		path: '',
		component: QrCodeGeneratorComponent
	}
]

@NgModule({
	declarations: [QrCodeGeneratorComponent],
	imports: [CommonModule, RouterModule.forChild(routes), SharedModule, QRCodeModule]
})
export class QRCodeGeneratorModule {}
