export class Randomizer {
    public static shuffleString(text: string) {
        var a = text.split(''),
            n = a.length;

        for (var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }

        return a.join('');
    }

    public static shuffleArray(arr: string[]) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    public static getBoolean(): boolean {
        return Math.random() >= 0.5;
    }

    public static getNumber(max: number) {
        return Math.floor(Math.random() * (max + 1));
    }

    public static getRandomElement(arr: any[]) {
        const index = this.getNumber(arr.length - 1);
        return arr[index];
    }

    public static getRandomCharacter(characters: string) {
        const index = this.getNumber(characters.length - 1);
        return characters[index];
    }
}
