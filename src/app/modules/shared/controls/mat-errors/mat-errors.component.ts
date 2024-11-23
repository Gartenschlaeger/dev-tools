import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-mat-errors',
    templateUrl: './mat-errors.component.html',
    standalone: false
})
export class MatErrorsComponent {
    @Input() control: AbstractControl | null = null;
}
