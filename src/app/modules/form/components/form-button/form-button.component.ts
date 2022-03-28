import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
	selector: 'app-form-button',
	templateUrl: './form-button.component.html'
})
export class FormButtonComponent {
	@Input() id: string | null = null
	@Input() type: 'button' | 'submit' = 'button'
	@Input() color: 'primary' | 'secondary' | 'danger' = 'primary'
	@Input() disabled: boolean = false
	@Output() click = new EventEmitter<MouseEvent>()

	handleClick(event: MouseEvent) {
		this.click.emit(event)
	}
}
