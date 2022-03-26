import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'app-highlighted-code',
	templateUrl: './highlighted-code.component.html'
})
export class HighlightedCodeComponent implements OnInit {
	@Input() code?: string
	@Input() autoselect: boolean = true
	@Input() language: 'json' | 'bash' = 'json'

	constructor() {}

	ngOnInit(): void {}
}
