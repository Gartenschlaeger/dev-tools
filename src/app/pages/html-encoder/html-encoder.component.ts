import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-html-encoder',
    templateUrl: './html-encoder.component.html',
    standalone: false
})
export class HtmlEncoderComponent implements OnInit {
    fb = inject(FormBuilder);
    form = this.fb.group({
        text: this.fb.control('')
    });

    result = signal('');

    private enocodeHtml(text: string) {
        const textArea = document.createElement('textarea');
        textArea.innerText = text;

        const result = textArea.innerHTML;
        textArea.remove();

        return result;
    }

    private encodeSpecialChars(html: string) {
        return html.replace(/[&<>"'äöüÄÖÜß]/g, function (match) {
            switch (match) {
                case "'":
                    return '&#39;';
                case '"':
                    return '&quot;';
                case 'ä':
                    return '&auml;';
                case 'ö':
                    return '&ouml;';
                case 'ü':
                    return '&uuml;';
                case 'Ä':
                    return '&Auml;';
                case 'Ö':
                    return '&Ouml;';
                case 'Ü':
                    return '&Uuml;';
                case 'ß':
                    return '&szlig;';
                default:
                    return match;
            }
        });
    }

    ngOnInit(): void {
        this.form.valueChanges.subscribe((value) => {
            const input = value.text || '';

            let result = this.enocodeHtml(input);
            result = this.encodeSpecialChars(result);

            this.result.set(result);
        });
    }
}
