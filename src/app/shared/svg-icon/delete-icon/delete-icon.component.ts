import { Component, Input } from '@angular/core'
import { SvgIconSizes } from 'src/app/shared/svg-icon/types'

@Component({
    selector: 'svg-delete-icon',
    templateUrl: './delete-icon.component.html'
})
export class DeleteIconComponent {
    @Input() size: SvgIconSizes = 'md'
}
