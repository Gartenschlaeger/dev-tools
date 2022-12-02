import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { items } from '../../app.navigation-items'
import { INavigationItem } from '../../entities/INavigationItem'

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
	searchForm!: FormGroup
	items: INavigationItem[] = []
	stickedItems: INavigationItem[] = []

	@Output() itemClicked = new EventEmitter<INavigationItem>()

	constructor(private fb: FormBuilder, private router: Router) {}

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

	private clearSearchField() {
		this.searchForm.patchValue({ query: '' })
	}

	handleSearchKeyup(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			this.clearSearchField()
		}
	}

	handleClearSearchField() {
		this.clearSearchField()
	}

	handleItemClick(item: INavigationItem) {
		this.clearSearchField()
		this.itemClicked.emit(item)
	}
}
