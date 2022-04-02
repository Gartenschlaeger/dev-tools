import { Route } from '@angular/router'

export interface CustomRoute extends Route {
	pageTitle?: string
	stickedInNavbar?: boolean
}
