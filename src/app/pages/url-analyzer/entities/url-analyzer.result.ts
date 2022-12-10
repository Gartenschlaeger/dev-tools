export class UrlAnalyzerResult {
    hostname?: string;
    port?: string;
    path?: string;
    queryString?: string;
    queryStringValues: { name: string; value: string }[] = [];
    fragment?: string;
}
