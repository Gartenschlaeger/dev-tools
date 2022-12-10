export class JsonParserResultModel {
    formattedValue?: string;
    errorMessage?: string;

    reset() {
        this.formattedValue = undefined;
        this.errorMessage = undefined;
    }
}
