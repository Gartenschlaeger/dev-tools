import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleDnsResolveResponse } from '../entities/google';

@Injectable()
export class GoogleDnsResolverService {
    constructor(private http: HttpClient) {}

    resolve(domainName: string, recordType: string) {
        const url = `https://dns.google/resolve?name=${encodeURIComponent(domainName)}&type=${encodeURIComponent(
            recordType
        )}`;

        return this.http.get<GoogleDnsResolveResponse>(url);
    }
}
