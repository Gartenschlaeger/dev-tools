import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'app-url-analyzer-page',
    templateUrl: './url-analyzer-page.component.html'
})
export class UrlAnalyzerPageComponent implements OnInit {
    url?: string

    public urlAnalyzerFormGroup!: FormGroup

    ngOnInit(): void {
        this.urlAnalyzerFormGroup = this.generateFormGroup()
    }

    generateFormGroup(): FormGroup {
        return new FormGroup({
            url: new FormControl('', {
                validators: [Validators.required]
            })
        })
    }

    submitHandler() {
        if (this.urlAnalyzerFormGroup.valid) {
            console.log('todo')
        }
    }
}
