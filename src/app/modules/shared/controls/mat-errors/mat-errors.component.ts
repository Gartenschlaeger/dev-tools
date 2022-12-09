import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-mat-errors',
    templateUrl: './mat-errors.component.html'
})
export class MatErrorsComponent {
    @Input() control!: AbstractControl;
}
