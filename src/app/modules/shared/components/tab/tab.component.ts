import { Component, Input } from '@angular/core'

@Component({
	selector: 'app-tab',
	templateUrl: './tab.component.html'
})
export class TabComponent {
	@Input() label: string = ''
	isActive: boolean = false
}
