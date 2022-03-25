import { Component, Input } from '@angular/core'
import { SvgIconSizes } from 'src/app/modules/svg-icon/svg-icon.module'

@Component({
	selector: 'svg-delete-icon',
	templateUrl: './delete-icon.component.html'
})
export class DeleteIconComponent {
	@Input() size: SvgIconSizes = 'md'
}
