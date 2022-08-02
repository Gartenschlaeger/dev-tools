import { Component, OnDestroy, OnInit } from '@angular/core'

@Component({
	selector: 'app-unix-timestamp',
	templateUrl: './unix-timestamp.component.html'
})
export class UnixTimestampComponent implements OnInit, OnDestroy {
	intervalId!: number
	currentTimestamp: string = '123'

	constructor() {}

	updateCurrentTimestamp() {
		const timestamp = this.getUnixTimestamp()
		this.currentTimestamp = timestamp.toFixed(0)
	}

	getUnixTimestamp(): number {
		const date = new Date()
		const seconds = date.getTime() / 1000

		return seconds
	}

	ngOnInit(): void {
		this.updateCurrentTimestamp()
		this.intervalId = window.setInterval(() => this.updateCurrentTimestamp(), 1000)
	}

	ngOnDestroy(): void {
		console.log('clear interval')
		clearInterval(this.intervalId)
	}
}
