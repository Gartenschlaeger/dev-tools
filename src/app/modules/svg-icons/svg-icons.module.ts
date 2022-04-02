import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SvgIconComponent } from 'src/app/modules/svg-icons/svg-icon/svg-icon.component'

export type IconSize = 'sm' | 'md' | 'lg'
export type IconType = 'delete' | 'plus' | 'minus' | 'refresh' | 'hearth' | 'arrowRight' | 'arrowDown' | 'exclamation'

@NgModule({
	imports: [CommonModule],
	declarations: [SvgIconComponent],
	exports: [SvgIconComponent]
})
export class SvgIconsModule {}
