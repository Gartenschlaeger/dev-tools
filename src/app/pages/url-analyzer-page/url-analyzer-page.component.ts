import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { FormService } from 'src/app/services/form-service.service'

@Component({
    selector: 'app-url-analyzer-page',
    templateUrl: './url-analyzer-page.component.html'
})
export class UrlAnalyzerPageComponent implements OnInit {
    groupUrlAnalyzer!: FormGroup

    constructor(public formService: FormService) {}

    ngOnInit(): void {
        this.groupUrlAnalyzer = this.defineFormGroup()
    }

    defineFormGroup(): FormGroup {
        return new FormGroup({
            url: new FormControl('', {
                validators: [Validators.required]
            })
        })
    }

    submitHandler() {
        if (this.formService.validateForm(this.groupUrlAnalyzer)) {
            console.log('todo')
        }
    }
}
