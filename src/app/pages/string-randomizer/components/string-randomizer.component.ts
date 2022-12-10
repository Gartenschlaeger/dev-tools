import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormService } from '../../../modules/shared/services/form-service.service';
import { Randomizer } from '../../../modules/shared/utilities/randomizer';
import { StringRandomizerFormModel } from '../entities/string-randomizer-form.model';
import { StringRandomizerResultModel } from '../entities/string-randomizer-result.model';

const FormDefaults = new StringRandomizerFormModel();

@Component({
    selector: 'app-string-randomizer',
    templateUrl: './string-randomizer.component.html'
})
export class StringRandomizerComponent implements OnInit {
    form!: UntypedFormGroup;
    result?: StringRandomizerResultModel;

    constructor(private fb: UntypedFormBuilder, private formService: FormService) {
    }

    ngOnInit() {
        this.form = this.defineForm();
    }

    defineForm(): UntypedFormGroup {
        return this.fb.group({
            sourceText: [FormDefaults.sourceText, [Validators.required]],
            trimResult: [FormDefaults.trimResult],
            splitIntoWords: [FormDefaults.splitIntoWords]
        });
    }

    handleReset() {
        this.formService.reset(this.form, FormDefaults);
        this.result = undefined;
    }

    handleSubmit() {
        if (this.formService.validate(this.form)) {
            const model: StringRandomizerFormModel = this.form.value;

            let randomizedValue: string;

            if (model.splitIntoWords) {
                const words = model.sourceText.split(' ');
                const shuffledArray = Randomizer.shuffleArray(words);
                randomizedValue = shuffledArray.join(' ');
            } else {
                randomizedValue = Randomizer.shuffleString(model.sourceText);
            }

            if (model.trimResult) {
                randomizedValue = randomizedValue.trim();
            }

            this.result = {
                randomizedValue
            };
        }
    }
}
