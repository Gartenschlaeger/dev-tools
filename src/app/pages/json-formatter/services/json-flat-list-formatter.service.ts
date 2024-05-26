import { Injectable } from '@angular/core';

@Injectable()
export class JsonFlatListParserService {
    private convertToJsonPathValue(json: any, parentKey: string = ''): string[] {
        let result: string[] = [];

        for (let key in json) {
            if (json.hasOwnProperty(key)) {
                let fullPath = parentKey ? `${parentKey}.${key}` : key;

                if (Array.isArray(json[key])) {
                    json[key].forEach((element: any, index: number) => {
                        if (typeof element === 'object' && element !== null) {
                            const subResult = this.convertToJsonPathValue(element, `${fullPath}[${index}]`);
                            result = result.concat(subResult);
                        } else {
                            result.push(`${fullPath}[${index}] = ${JSON.stringify(element)}`);
                        }
                    });
                } else if (typeof json[key] === 'object' && json[key] !== null) {
                    const subResult = this.convertToJsonPathValue(json[key], fullPath);
                    result = result.concat(subResult);
                } else {
                    result.push(`${fullPath} = ${JSON.stringify(json[key])}`);
                }
            }
        }

        return result;
    }

    public format(json: string, sort: boolean = false): string {
        let obj = JSON.parse(json);
        if (typeof obj === 'string') {
            obj = JSON.parse(obj);
        }

        const result = this.convertToJsonPathValue(obj);
        if (sort) {
            result.sort();
        }

        return result.join('\n');
    }
}
