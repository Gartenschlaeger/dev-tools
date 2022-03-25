import { Component, Input } from '@angular/core'
import { SvgIconSizes } from 'src/app/components/svg-icon/types'

@Component({
	selector: 'svg-plus-icon',
	templateUrl: './plus-icon.component.html'
})
export class PlusIconComponent {
	@Input() size: SvgIconSizes = 'md'
}
