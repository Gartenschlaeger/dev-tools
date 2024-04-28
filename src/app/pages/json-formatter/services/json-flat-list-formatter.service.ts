import { Injectable } from '@angular/core';
import { LoggingService } from 'src/app/modules/shared/services/logging.service';

@Injectable()
export class JsonFlatListParserService {
    constructor(private logger: LoggingService) {}

    private convertToJsonPathValue(json: any, parentKey: string = ''): string[] {
        let result: string[] = [];

        for (let key in json) {
            if (json.hasOwnProperty(key)) {
                let fullPath = parentKey ? `${parentKey}.${key}` : key;

                if (typeof json[key] === 'object' && json[key] !== null) {
                    result = result.concat(this.convertToJsonPathValue(json[key], fullPath));
                } else {
                    result.push(`${fullPath} = ${JSON.stringify(json[key])}`);
                }
            }
        }

        return result;
    }

    public format(json: string): string {
        const obj = JSON.parse(json);
        const result = this.convertToJsonPathValue(obj).sort();
        return result.join('\n');
    }
}
