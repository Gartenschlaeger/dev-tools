import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/modules/shared/services/form-service.service';

interface DnsResolverFormData {
    domainName: string;
    recordType: string;
}

interface DnsRecordResult {
    name: string;
    ttl: number;
    type: string;
    data: string;
}

const DnsResolverFormDefaults: DnsResolverFormData = {
    domainName: '',
    recordType: 'a'
};

interface DNSRecordTypeMapping {
    [key: number]: string;
}

const GoogleDnsRecordTypes: DNSRecordTypeMapping = {
    1: 'A',
    2: 'NS',
    3: 'MD',
    4: 'MF',
    5: 'CNAME',
    6: 'SOA',
    7: 'MB',
    8: 'MG',
    9: 'MR',
    10: 'NULL',
    11: 'WKS',
    12: 'PTR',
    13: 'HINFO',
    14: 'MINFO',
    15: 'MX',
    16: 'TXT',
    17: 'RP',
    18: 'AFSDB',
    19: 'X25',
    20: 'ISDN',
    21: 'RT',
    22: 'NSAP',
    23: 'NSAP_PTR',
    24: 'SIG',
    25: 'KEY',
    26: 'PX',
    27: 'GPOS',
    28: 'AAAA',
    29: 'LOC',
    30: 'NXT',
    31: 'EID',
    32: 'NIMLOC',
    33: 'SRV',
    34: 'ATMA',
    35: 'NAPTR',
    36: 'KX',
    37: 'CERT',
    38: 'A6',
    39: 'DNAME',
    40: 'SINK',
    41: 'OPT',
    42: 'APL',
    43: 'DS',
    44: 'SSHFP',
    45: 'IPSECKEY',
    46: 'RRSIG',
    47: 'NSEC',
    48: 'DNSKEY',
    49: 'DHCID',
    50: 'NSEC3',
    51: 'NSEC3PARAM',
    52: 'TLSA',
    53: 'SMIMEA',
    55: 'HIP',
    56: 'NINFO',
    57: 'RKEY',
    58: 'TALINK',
    59: 'CDS',
    60: 'CDNSKEY',
    61: 'OPENPGPKEY',
    62: 'CSYNC',
    63: 'ZONEMD'
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

    isLoading = false;
    hasErrors = false;
    results?: DnsRecordResult[];
    displayedColumns: string[] = ['name', 'type', 'ttl', 'data'];

    constructor(private fb: UntypedFormBuilder, private formService: FormService, private http: HttpClient) {}

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

        return this.http.get<GoogleDnsResolveResponse>(url);
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

            this.isLoading = true;
            this.hasErrors = false;
            this.resolveDnsRecords(model.domainName, model.recordType).subscribe(
                (data) => {
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
                (err) => {
                    this.isLoading = false;
                    this.hasErrors = true;
                    console.error(err);
                }
            );
        }
    }
}
