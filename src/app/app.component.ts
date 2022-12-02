import { Component, ViewChild } from '@angular/core'
import { MatSidenav } from '@angular/material/sidenav'
import { Router } from '@angular/router'
import { INavigationItem } from './components/navigation/navigation.component'

@Component({
	selector: '[app-root]',
	templateUrl: './app.component.html'
})
export class AppComponent {
	title = 'dev-tools'

	@ViewChild('sidenav') sidenav!: MatSidenav

	constructor(private router: Router) {}

	handleNavigationItemClick(item: INavigationItem) {
		this.router.navigateByUrl(item.routerLink)
		this.sidenav.close()
	}
}
