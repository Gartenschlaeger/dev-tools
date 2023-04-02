export interface GoodleDNSRecordTypeMapping {
    [key: number]: string;
}

export const GoogleDnsRecordTypes: GoodleDNSRecordTypeMapping = {
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

export interface GoogleDnsResolveResponse {
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

export interface GoogleDnsResolveAnswerResponse {
    name: string;
    type: number;
    TTL: number;
    data: string;
}

export interface GoogleDnsResolveQuestionResponse {
    name: string;
    type: number;
}
