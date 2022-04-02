import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { QRCodeModule } from 'angular2-qrcode'
import { SharedModule } from '../../modules/shared/shared.module'
import { QrCodeGeneratorComponent } from './qrcode-generator.component'

const routes: Routes = [
	{
		path: '',
		component: QrCodeGeneratorComponent
	}
]

@NgModule({
	declarations: [],
	imports: [CommonModule, SharedModule, QRCodeModule]
})
export class QRCodeGeneratorModule {}
