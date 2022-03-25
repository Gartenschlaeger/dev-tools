import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { DeleteIconComponent } from 'src/app/modules/svg-icon/components/delete-icon/delete-icon.component'
import { PlusIconComponent } from 'src/app/modules/svg-icon/components/plus-icon/plus-icon.component'

export type SvgIconSizes = 'sm' | 'md' | 'lg'

@NgModule({
	imports: [CommonModule],
	declarations: [DeleteIconComponent, PlusIconComponent],
	exports: [DeleteIconComponent, PlusIconComponent]
})
export class SvgIconModule {
	static forRoot(): ModuleWithProviders<SvgIconModule> {
		return {
			ngModule: SvgIconModule,
			providers: []
		}
	}
}
