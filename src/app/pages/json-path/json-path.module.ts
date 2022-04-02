import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CustomRoute } from '../../modules/shared/entities/custom-route'
import { SharedModule } from '../../modules/shared/shared.module'
import { JsonPathComponent } from './json-path.component'

const routes: CustomRoute[] = [
	{
		pageTitle: 'JSON Path',
		path: '',
		component: JsonPathComponent
	}
]

@NgModule({
	declarations: [JsonPathComponent],
	imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class JsonPathModule {}
