import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-form-section',
    templateUrl: './form-section.component.html'
})
export class FormSectionComponent {
    @Input() title?: string
}
