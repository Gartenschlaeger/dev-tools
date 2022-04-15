import { Component, OnInit } from '@angular/core'
import { PageService } from '../../utilities/page-service'

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
	constructor(private pageService: PageService) {}

	ngOnInit() {
		this.pageService.resetTitle()
	}
}
