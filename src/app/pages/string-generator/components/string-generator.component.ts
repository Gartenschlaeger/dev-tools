import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../../modules/shared/services/form-service.service';
import { LoggingService } from '../../../modules/shared/services/logging.service';
import { Randomizer } from '../../../modules/shared/utilities/randomizer';
import { StringGeneratorFormModel } from '../entities/string-generator-form.model';
import { StringGeneratorResultModel } from '../entities/string-generator-result.model';

const LowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
const UppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NumberCharacters = '0123456789';
const DefaultSpecialCharacters = '#$-_&';

const FormDefaults = new StringGeneratorFormModel();

@Component({
    selector: 'app-string-generator',
    templateUrl: './string-generator.component.html',
    standalone: false
})
export class StringGeneratorComponent implements OnInit {
    form!: UntypedFormGroup;
    result?: StringGeneratorResultModel;

    get defaultSpecialCharacters() {
        return DefaultSpecialCharacters;
    }

    constructor(
        route: ActivatedRoute,
        private fb: UntypedFormBuilder,
        private formService: FormService,
        private logger: LoggingService
    ) {}

    ngOnInit() {
        this.form = this.defineForm();
    }

    defineForm(): UntypedFormGroup {
        return this.fb.group({
            includeLowercaseCharacters: [FormDefaults.includeLowercaseCharacters],
            includeUppercaseCharacters: [FormDefaults.includeUppercaseCharacters],
            includeNumbers: [FormDefaults.includeNumbers],
            includeSpecialCharacters: [FormDefaults.includeSpecialCharacters],
            specialCharacters: [FormDefaults.specialCharacters],
            length: [FormDefaults.length, [Validators.pattern('\\d+'), Validators.min(1), Validators.max(99)]]
        });
    }

    handleReset() {
        this.formService.reset(this.form, FormDefaults);
        this.result = undefined;
    }

    handleSubmit() {
        this.logger.debug('handleSubmit()', this.form.valid, this.form);

        if (this.formService.validate(this.form)) {
            const model: StringGeneratorFormModel = this.form.value;

            let types = '';
            types += model.includeLowercaseCharacters ? 'l' : '';
            types += model.includeUppercaseCharacters ? 'u' : '';
            types += model.includeNumbers ? 'n' : '';
            types += model.includeSpecialCharacters ? 's' : '';

            // prevent infine loop
            if (types.length === 0) {
                return;
            }

            let result = '';
            while (result.length < model.length) {
                const type = Randomizer.getRandomCharacter(types);
                switch (type) {
                    case 'l':
                        result += Randomizer.getRandomCharacter(LowercaseCharacters);
                        break;
                    case 'u':
                        result += Randomizer.getRandomCharacter(UppercaseCharacters);
                        break;
                    case 'n':
                        result += Randomizer.getRandomCharacter(NumberCharacters);
                        break;
                    case 's':
                        result += Randomizer.getRandomCharacter(model.specialCharacters || DefaultSpecialCharacters);
                        break;
                }
            }

            this.result = {
                generatedString: result
            };
        }
    }
}
