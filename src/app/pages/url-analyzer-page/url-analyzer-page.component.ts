import { Component, ElementRef, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms'

@Component({
    selector: 'app-url-analyzer-page',
    templateUrl: './url-analyzer-page.component.html',
})
export class UrlAnalyzerPageComponent {
    url?: string

    @ViewChild('form') form!: ElementRef<HTMLFormElement>

    onSubmit(form: NgForm) {
        console.log('onSubmit', form)
    }

    onReset() {
        this.url = ''
    }
}
