import { Clipboard } from '@angular/cdk/clipboard';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-code',
    templateUrl: './code.component.html',
    styleUrls: ['./code.component.scss']
})
export class CodeComponent {

    @Input() autoSelect = true;

    @ViewChild('preElement') preElement!: ElementRef<HTMLPreElement>;

    constructor(private clipboard: Clipboard,
                private snackBar: MatSnackBar) {
    }

    handleCopy() {
        const text = this.preElement.nativeElement.textContent;
        if (text) {
            this.clipboard.copy(text);
            this.snackBar.open('Copied to clipboard');
        }
    }

}
