import { Injectable } from '@angular/core';
import JsonToTS from 'json-to-ts';
import { StringBuilder } from '../../../modules/shared/utilities/string-builder';

@Injectable({
    providedIn: 'root'
})
export class JsonTransformService {

    private parseJsonToObject(json: string): object {
        let obj = JSON.parse(json);
        while (typeof obj !== 'object') {
            obj = JSON.parse(obj);
        }

        return obj;
    }

    public convert(json: string): string {
        const obj = this.parseJsonToObject(json);

        const result = JsonToTS(obj, {
            rootName: 'Main'
        });

        const builder = new StringBuilder();
        for (let i = 0; i < result.length; i++) {
            const typeInterface = result[i];

            builder.appendLine(typeInterface);

            if (i + 1 < result.length) {
                builder.appendLine();
            }
        }

        return builder.build();
    }

}
