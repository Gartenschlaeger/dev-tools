import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
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
	stickedItems: INavigationItem[] = []
	items: INavigationItem[] = []

	searchForm!: FormGroup

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.searchForm = this.fb.group({
			query: ['']
		})

		this.searchForm.valueChanges.subscribe(() => {
			const queryValue: string = this.searchForm.get('query')?.value?.toLowerCase()?.trim()
			if (queryValue) {
				this.items.forEach((item) => {
					item.isVisible = item.title.toLowerCase().indexOf(queryValue) !== -1
				})
			} else {
				this.items.forEach((item) => (item.isVisible = true))
			}
		})

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

		// if (!environment.production) {
		// 	for (let i = 0; i < 100; i++) {
		// 		this.items.push({
		// 			title: 'Test ' + i,
		// 			routerLink: '',
		// 			isVisible: true
		// 		})
		// 	}
		// }

		this.stickedItems.sort((a, b) => a.title.localeCompare(b.title))
		this.items.sort((a, b) => a.title.localeCompare(b.title))
	}

	handleSearchKeyup(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			this.searchForm.patchValue({ query: '' })
		}
	}
}
