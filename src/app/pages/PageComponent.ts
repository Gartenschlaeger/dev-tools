import { ActivatedRoute } from '@angular/router'
import { CustomRoute } from '../modules/shared/entities/custom-route'

export abstract class PageComponent {
	public pageTitle?: string

	constructor(route: ActivatedRoute) {
		const config = route.routeConfig as CustomRoute
		if (config) {
			this.pageTitle = config.pageTitle
		}
	}
}
