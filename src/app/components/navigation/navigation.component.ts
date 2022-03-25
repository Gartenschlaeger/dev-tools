import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { routes } from 'src/app/app-routing.module'

export interface INavigationItem {
	title: string
	routerLink: string
	isVisible: boolean
}

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
	@ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>

	stickedItems: INavigationItem[] = []
	items: INavigationItem[] = []

	ngOnInit(): void {
		routes.forEach((route) => {
			if (route.path && route.pageTitle) {
				if (route.stickedInNavbar !== true) {
					this.items.push({
						title: route.pageTitle,
						routerLink: route.path,
						isVisible: true
					})
				} else {
					this.stickedItems.push({
						title: route.pageTitle,
						routerLink: route.path,
						isVisible: true
					})
				}
			}
		})

		this.stickedItems.sort((a, b) => a.title.localeCompare(b.title))
		this.items.sort((a, b) => a.title.localeCompare(b.title))
	}

	handleSearch(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			this.searchInput.nativeElement.value = ''
		}

		const searchValue = this.searchInput.nativeElement.value.toLowerCase()
		this.items.forEach((item) => {
			item.isVisible = item.title.toLowerCase().indexOf(searchValue) !== -1
		})
	}
}
