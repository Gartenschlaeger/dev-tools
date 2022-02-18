import { Component, Input, OnInit } from '@angular/core'
import { NgModel } from '@angular/forms'

@Component({
    selector: 'form-validation-message',
    templateUrl: './form-validation-message.component.html'
})
export class FormValidationMessageComponent implements OnInit {
    @Input() control?: NgModel

    constructor() {}

    ngOnInit(): void {}
}
