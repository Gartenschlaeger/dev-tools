import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { PageService } from '../../utilities/page-service';

export class GuidGeneratorModel {
    addDashes: boolean = true;
    addCurlyBraces: boolean = false;
}

const FormDefaultValues = new GuidGeneratorModel();

@Component({
    selector: 'app-guid-generator',
    templateUrl: './guid-generator.component.html'
})
export class GuidGeneratorComponent implements OnInit {
    form!: UntypedFormGroup;
    guid?: string;

    constructor(private fb: UntypedFormBuilder, private route: ActivatedRoute, private pageService: PageService) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            addDashes: [FormDefaultValues.addDashes],
            addCurlyBraces: [FormDefaultValues.addCurlyBraces]
        });

        this.form.valueChanges.subscribe(() => {
            this.generateGuid();
        });

        this.generateGuid();

        this.pageService.setPageTitle('Guid Generator');
    }

    generateGuid() {
        const model: GuidGeneratorModel = this.form.value;

        this.guid = uuidv4();

        if (!model.addDashes) {
            this.guid = this.guid.replace(/-/g, '');
        }
        if (model.addCurlyBraces) {
            this.guid = `{${this.guid}}`;
        }
    }

    handleGenerate() {
        this.generateGuid();
    }
}
