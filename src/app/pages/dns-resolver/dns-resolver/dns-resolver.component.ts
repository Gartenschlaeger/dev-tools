import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/modules/shared/services/form-service.service';

interface DnsResolverFormData {
    domainName: string;
    recordType: string;
}

const DnsResolverFormDefaults: DnsResolverFormData = {
    domainName: '',
    recordType: 'a'
};

interface GoogleDnsResolveResponse {
    Status: number;
    TC: boolean;
    RD: boolean;
    RA: boolean;
    AD: boolean;
    CD: boolean;
    Question: GoogleDnsResolveQuestionResponse[];
    Answer: GoogleDnsResolveAnswerResponse[];
    Comment: string;
}

interface GoogleDnsResolveAnswerResponse {
    name: string;
    type: number;
    TTL: number;
    data: string;
}

interface GoogleDnsResolveQuestionResponse {
    name: string;
    type: number;
}

@Component({
    selector: 'app-dns-resolver',
    templateUrl: './dns-resolver.component.html',
    styleUrls: ['./dns-resolver.component.scss']
})
export class DnsResolverComponent implements OnInit {
    form!: UntypedFormGroup;
    recordTypes = ['a', 'aaaa', 'mx', 'ns', 'txt', 'cname', 'any'];

    constructor(private fb: UntypedFormBuilder, private formService: FormService) {}

    ngOnInit() {
        this.form = this.fb.group({
            domainName: this.fb.control(DnsResolverFormDefaults.domainName, {
                validators: [Validators.required]
            }),
            recordType: this.fb.control(DnsResolverFormDefaults.recordType, {
                validators: [Validators.required]
            })
        });
    }

    resolveDnsRecords(domainName: string, recordType: string) {
        const url = `https://dns.google/resolve?name=${encodeURIComponent(domainName)}&type=${encodeURIComponent(
            recordType
        )}`;

        fetch(url)
            .then((res) => res.json())
            .then((res: GoogleDnsResolveResponse) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    handleReset() {
        this.formService.reset(this.form, DnsResolverFormDefaults);
    }

    handleResolve() {
        if (this.formService.validate(this.form)) {
            const model: DnsResolverFormData = this.form.value;

            const result = this.resolveDnsRecords(model.domainName, model.recordType);
            console.log(result);
        }
    }
}
