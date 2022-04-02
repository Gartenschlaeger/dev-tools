import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { routes } from '../../app.routes'
import { items } from './app.navigation-items'

export interface INavigationItem {
	title: string
	routerLink: string
	isVisible?: boolean
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

	ngOnInit() {
		this.defineSearchForm()

		this.addRoutesAsNavigationItems()

		items.forEach((item) => this.items.push(item))

		this.stickedItems.sort((a, b) => a.title.localeCompare(b.title))
		this.items.sort((a, b) => a.title.localeCompare(b.title))

		this.items.map((item) => (item.isVisible = true))
	}

	addRoutesAsNavigationItems() {
		routes.forEach((route) => {
			if (route.path && route.pageTitle) {
				if (route.stickedInNavbar !== true) {
					this.items.push({
						title: route.pageTitle,
						routerLink: route.path
					})
				} else {
					this.stickedItems.push({
						title: route.pageTitle,
						routerLink: route.path
					})
				}
			}
		})
	}

	defineSearchForm() {
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
	}

	handleSearchKeyup(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			this.searchForm.patchValue({ query: '' })
		}
	}
}
