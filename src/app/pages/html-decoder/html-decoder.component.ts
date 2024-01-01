import { Component, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';

const MAX_DECODE_COUNTER = 100;

@Component({
    selector: 'app-html-decoder',
    templateUrl: './html-decoder.component.html'
})
export class HtmlDecoderComponent {
    fb = inject(FormBuilder);
    form = this.fb.group({
        text: this.fb.control('')
    });

    result = signal('');
    timesDecoded = signal(0);

    private decodeHtml(html: string) {
        const el = document.createElement('textarea');
        el.innerHTML = html;

        const result = el.innerText;
        el.remove();

        return result;
    }

    ngOnInit(): void {
        this.form.valueChanges.subscribe((value) => {
            let input = value.text || '';
            let result = input;
            let decodeCounter = 0;

            do {
                result = input;
                input = this.decodeHtml(input);
                decodeCounter++;
            } while (input !== result && decodeCounter < MAX_DECODE_COUNTER);

            this.timesDecoded.set(decodeCounter - 1);
            this.result.set(result);
        });
    }
}
