import { Clipboard } from '@angular/cdk/clipboard';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';

@Component({
    selector: 'app-code',
    templateUrl: './code.component.html',
    styleUrls: ['./code.component.scss'],
    standalone: false
})
export class CodeComponent {
    @Input() autoSelect = false;
    @ViewChild('preElement') preElement!: ElementRef<HTMLPreElement>;

    constructor(
        private clipboard: Clipboard,
        private notifications: NotificationsService
    ) {}

    handleCopy() {
        const text = this.preElement.nativeElement.textContent;
        if (text) {
            this.clipboard.copy(text);
            this.notifications.show('Copied to clipboard');
        }
    }
}
