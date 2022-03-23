import { Component, OnInit } from '@angular/core'
import { v4 as uuidv4 } from 'uuid'

@Component({
	selector: 'app-guid-generator',
	templateUrl: './guid-generator.component.html'
})
export class GuidGeneratorComponent implements OnInit {
	guid?: string
	guidMinified?: string

	ngOnInit() {
		this.generateGuid()
	}

	generateGuid() {
		this.guid = uuidv4()
		this.guidMinified = this.guid.replace(/-/g, '')
	}

	handleGenerate() {
		this.generateGuid()
	}
}
