import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/modules/shared/services/form-service.service';
import { GoogleDnsRecordTypes } from '../entities/google';
import { GoogleDnsResolverService } from '../services/google-dns-resolver.service';

interface DnsResolverFormData {
    domainName: string;
    recordType: string;
}

const DnsResolverFormDefaults: DnsResolverFormData = {
    domainName: '',
    recordType: 'a'
};

interface DnsRecordResult {
    name: string;
    type: string;
    ttl: number;
    data: string;
}

@Component({
    selector: 'app-dns-resolver',
    templateUrl: './dns-resolver.component.html',
    styleUrls: ['./dns-resolver.component.scss'],
    standalone: false
})
export class DnsResolverComponent implements OnInit {
    form!: UntypedFormGroup;
    recordTypes = ['a', 'aaaa', 'mx', 'ns', 'txt', 'cname', 'srv', 'soa', 'any'];

    isLoading = false;
    hasErrors = false;
    results?: DnsRecordResult[];
    displayedColumns: string[] = ['name', 'type', 'ttl', 'data'];

    constructor(
        private fb: UntypedFormBuilder,
        private formService: FormService,
        private googleDnsResolver: GoogleDnsResolverService
    ) {}

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

    handleReset() {
        this.formService.reset(this.form, DnsResolverFormDefaults);
        this.results = undefined;
        this.isLoading = false;
        this.hasErrors = false;
    }

    handleSubmit() {
        if (this.formService.validate(this.form)) {
            const model: DnsResolverFormData = this.form.value;

            this.results = undefined;
            this.isLoading = true;
            this.hasErrors = false;

            this.googleDnsResolver.resolve(model.domainName, model.recordType).subscribe({
                next: (data) => {
                    if (data.Answer) {
                        this.results = data.Answer.map((a) => {
                            return {
                                name: a.name,
                                type: GoogleDnsRecordTypes[a.type],
                                ttl: a.TTL,
                                data: a.data
                            };
                        });
                    } else {
                        this.results = [];
                    }

                    this.isLoading = false;
                    this.hasErrors = false;
                },
                error: (err) => {
                    this.isLoading = false;
                    this.hasErrors = true;

                    console.error(err);
                }
            });
        }
    }
}
