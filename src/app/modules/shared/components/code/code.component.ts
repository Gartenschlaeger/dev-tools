import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-code',
    templateUrl: './code.component.html'
})
export class CodeComponent {
    @Input() autoselect = true;
    @Input() scrollable = true;
}
