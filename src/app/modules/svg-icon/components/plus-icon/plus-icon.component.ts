import { Component, Input } from '@angular/core'
import { SvgIconSizes } from 'src/app/modules/svg-icon/svg-icon.module'

@Component({
	selector: 'svg-plus-icon',
	templateUrl: './plus-icon.component.html'
})
export class PlusIconComponent {
	@Input() size: SvgIconSizes = 'md'
}
