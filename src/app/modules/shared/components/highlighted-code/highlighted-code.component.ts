import { Clipboard } from '@angular/cdk/clipboard';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';

@Component({
    selector: 'app-highlighted-code',
    templateUrl: './highlighted-code.component.html',
    styleUrls: ['./highlighted-code.component.scss'],
    standalone: false
})
export class HighlightedCodeComponent {
    @Input() code?: string;
    @Input() autoSelect: boolean = true;
    @Input() language: 'json' | 'bash' | 'typescript' = 'json';
    @ViewChild('preElement') preElement!: ElementRef<HTMLPreElement>;

    constructor(
        private _clipboard: Clipboard,
        private _notificationsService: NotificationsService
    ) {}

    public handleCopy() {
        const text = this.preElement.nativeElement.textContent;
        if (text) {
            this._clipboard.copy(text);
            this._notificationsService.show('Copied to clipboard');
        }
    }
}
