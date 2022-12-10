export class StringGeneratorFormModel {
    includeLowercaseCharacters: boolean = true;
    includeUppercaseCharacters: boolean = true;
    includeNumbers: boolean = true;
    includeSpecialCharacters: boolean = false;
    specialCharacters: string = '';
    length: number = 25;
}
