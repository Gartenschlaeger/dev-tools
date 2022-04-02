import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { JsonPathComponent } from './json-path.component'

const routes: Routes = [
	{
		path: '',
		component: JsonPathComponent
	}
]

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forChild(routes)]
})
export class JsonPathModule {}
