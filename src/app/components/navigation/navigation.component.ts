import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { items } from '../../app.navigation-items'

export interface INavigationItem {
	title: string
	routerLink: string
	isVisible?: boolean
	isSticked?: boolean
}

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
	searchForm!: FormGroup
	items: INavigationItem[] = []
	stickedItems: INavigationItem[] = []

	constructor(private fb: FormBuilder) {}

	ngOnInit() {
		this.defineSearchForm()

		items.forEach((item) => {
			item.isVisible = true

			if (item.isSticked) {
				this.stickedItems.push(item)
			} else {
				this.items.push(item)
			}
		})

		this.items.sort((a, b) => a.title.localeCompare(b.title))
		this.stickedItems.sort((a, b) => a.title.localeCompare(b.title))
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
