import { Component, Input } from '@angular/core'

@Component({
	selector: 'app-navigation-link',
	templateUrl: './navigation-link.component.html'
})
export class NavigationLinkComponent {
	@Input() name?: string
	@Input() routerUrl?: string
}
