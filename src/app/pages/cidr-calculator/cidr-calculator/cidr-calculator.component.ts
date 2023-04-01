import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Netmask } from 'netmask';
import { FormService } from 'src/app/modules/shared/services/form-service.service';

interface CidrCalculatorForm {
    ipOcted1: number;
    ipOcted2: number;
    ipOcted3: number;
    ipOcted4: number;
    fixedBits: number;
}

const CidrCalculatorFormDefaults: CidrCalculatorForm = {
    ipOcted1: 192,
    ipOcted2: 168,
    ipOcted3: 0,
    ipOcted4: 0,
    fixedBits: 24
};

interface CidrCalculatorResults {
    broadcast: string;
    firstIp: string;
    lastIp: string;
    amount: number;
}

@Component({
    selector: 'app-cidr-calculator',
    templateUrl: './cidr-calculator.component.html',
    styleUrls: ['./cidr-calculator.component.scss']
})
export class CidrCalculatorComponent implements OnInit {
    form!: UntypedFormGroup;
    results?: CidrCalculatorResults;

    constructor(private fb: UntypedFormBuilder, private formService: FormService) {}

    ngOnInit() {
        this.form = this.fb.group({
            ipOcted1: this.fb.control(CidrCalculatorFormDefaults.ipOcted1, [
                Validators.required,
                Validators.min(0),
                Validators.max(255)
            ]),
            ipOcted2: this.fb.control(CidrCalculatorFormDefaults.ipOcted2, [
                Validators.required,
                Validators.min(0),
                Validators.max(255)
            ]),
            ipOcted3: this.fb.control(CidrCalculatorFormDefaults.ipOcted3, [
                Validators.required,
                Validators.min(0),
                Validators.max(255)
            ]),
            ipOcted4: this.fb.control(CidrCalculatorFormDefaults.ipOcted4, [
                Validators.required,
                Validators.min(0),
                Validators.max(255)
            ]),
            fixedBits: this.fb.control(CidrCalculatorFormDefaults.fixedBits, [
                Validators.required,
                Validators.min(0),
                Validators.max(32)
            ])
        });

        this.form.valueChanges.subscribe(() => this.calculate());

        this.calculate();
    }

    private calculate() {
        if (this.formService.validate(this.form)) {
            const pretty = this.getPrettyCidr();

            const netmask = new Netmask(pretty);

            this.results = {
                broadcast: netmask.broadcast,
                firstIp: netmask.first,
                lastIp: netmask.last,
                amount: netmask.size
            };
        }
    }

    private getPrettyCidr() {
        const value: CidrCalculatorForm = this.form.value;
        return `${value.ipOcted1}.${value.ipOcted2}.${value.ipOcted3}.${value.ipOcted4}/${value.fixedBits}`;
    }

    handleReset() {
        this.formService.reset(this.form, CidrCalculatorFormDefaults);
    }
}
