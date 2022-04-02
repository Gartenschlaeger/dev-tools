import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CustomRoute } from '../../modules/shared/entities/custom-route'
import { SharedModule } from '../../modules/shared/shared.module'
import { StringHashGeneratorComponent } from './string-hash-generator.component'

const routes: CustomRoute[] = [
	{
		path: ':algorithm',
		component: StringHashGeneratorComponent
	}
]

@NgModule({
	declarations: [StringHashGeneratorComponent],
	imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class StringHashGeneratorModule {}
