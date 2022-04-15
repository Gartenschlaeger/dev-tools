import { Injectable } from '@angular/core'
import { Title } from '@angular/platform-browser'

@Injectable({
	providedIn: 'root'
})
export class PageService {
	constructor(private title: Title) {}

	setPageTitle(title?: string) {
		if (title) {
			this.title.setTitle('DevTools - ' + title)
		} else {
			this.resetTitle()
		}
	}

	resetTitle() {
		this.title.setTitle('DevTools')
	}
}
