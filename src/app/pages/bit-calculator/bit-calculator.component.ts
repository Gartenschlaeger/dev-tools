import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { FormService } from '../../modules/shared/services/form-service.service';

interface BitCalculatorFormModel {
    byte1: boolean[];
    byte2: boolean[];
    byte3: boolean[];
    byte4: boolean[];
}

interface BitCalculatorResults {
    binaryRepresentation: string;
    decimalRepresentation: string;
}

@Component({
    selector: 'app-bit-calculator',
    templateUrl: './bit-calculator.component.html'
})
export class BitCalculatorComponent implements OnInit {
    form!: UntypedFormGroup;
    results: BitCalculatorResults | null = null;

    constructor(private fb: UntypedFormBuilder, private formService: FormService) {
    }

    ngOnInit() {
        this.defineForm();
        this.calculateValues();
    }

    defineForm() {
        const form = this.fb.group({
            byte1: this.defineByte(),
            byte2: this.defineByte(),
            byte3: this.defineByte(),
            byte4: this.defineByte()
        });

        form.valueChanges.subscribe(() => this.calculateValues());

        this.form = form;
    }

    defineByte(): UntypedFormArray {
        const controls = [];
        for (let i = 0; i < 8; i++) {
            controls.push(this.fb.control(false));
        }

        return this.fb.array(controls);
    }

    isBitSet(model: BitCalculatorFormModel, byte: number, bit: number) {
        switch (byte) {
            case 0:
                return model.byte1[bit];
            case 1:
                return model.byte2[bit];
            case 2:
                return model.byte3[bit];
            case 3:
                return model.byte4[bit];
        }

        throw new Error(`invalid byte or bit index, byte = ${byte}, bit = ${bit}`);
    }

    calculateValues() {
        const model: BitCalculatorFormModel = this.form.value;

        let binary = '';
        let decimal = BigInt(0);

        for (let byte = 0; byte < 4; byte++) {
            for (let bit = 0; bit < 8; bit++) {
                let isSet = this.isBitSet(model, byte, bit);

                if (isSet) {
                    const bitIndex = byte * 8 + bit;
                    const decimalValue = BigInt(BigInt(1) << BigInt(bitIndex));

                    binary += '1';
                    decimal += decimalValue;
                } else {
                    binary += '0';
                }
            }

            binary += ' ';
        }

        this.results = {
            binaryRepresentation: binary.trim(),
            decimalRepresentation: decimal.toLocaleString()
        };
    }

    handleSetBits(byte: number, setTo: boolean) {
        const bits: boolean[] = [];
        for (let i = 0; i < 8; i++) {
            bits.push(setTo);
        }

        const patchValue: any = {};
        patchValue['byte' + (1 + byte)] = bits;

        this.form.patchValue(patchValue);
    }

    handleReset() {
        this.formService.reset(this.form);

        this.calculateValues();
    }
}
