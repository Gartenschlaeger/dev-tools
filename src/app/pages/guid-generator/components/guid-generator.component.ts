import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { v4 as uuidv4, v7 as uuidv7 } from 'uuid';
import { GuidGeneratorModel } from '../entities/guid-generator.model';

const FormDefaultValues = new GuidGeneratorModel();
const LocalStorageKey = 'guid-generator.form';

@Component({
    selector: 'app-guid-generator',
    templateUrl: './guid-generator.component.html',
    standalone: false
})
export class GuidGeneratorComponent implements OnInit {
    form!: UntypedFormGroup;
    guids?: string[];

    constructor(private fb: UntypedFormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
            addDashes: [FormDefaultValues.addDashes],
            addCurlyBraces: [FormDefaultValues.addCurlyBraces],
            version: [FormDefaultValues.version],
            count: [FormDefaultValues.count]
        });

        this.form.valueChanges.subscribe(() => {
            this.saveFormValues();
        });

        this.loadFormValues();
        this.generateGuids();
    }

    saveFormValues() {
        const formValues = this.form.value;
        localStorage.setItem(LocalStorageKey, JSON.stringify(formValues));
    }

    loadFormValues() {
        const savedValues = localStorage.getItem(LocalStorageKey);
        if (savedValues) {
            const formValues = JSON.parse(savedValues);
            this.form.patchValue(formValues);
        }
    }

    generateGuid(model: GuidGeneratorModel): string {
        let guid;

        switch (model.version) {
            case 'v4':
                guid = uuidv4();
                break;
            case 'v7':
                guid = uuidv7();
                break;
        }

        if (!model.addDashes) {
            guid = guid.replace(/-/g, '');
        }
        if (model.addCurlyBraces) {
            guid = `{${guid}}`;
        }

        return guid;
    }

    generateGuids() {
        let guids: string[] = [];

        const model: GuidGeneratorModel = this.form.value;

        for (let i = 0; i < model.count; i++) {
            guids.push(this.generateGuid(model));
        }

        this.guids = guids;
    }

    handleGenerate() {
        this.generateGuids();
    }
}
