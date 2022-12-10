export class StringBuilder {

    content = '';

    append(...args: any[]): StringBuilder {
        if (args && args.length) {
            for (let i = 0; i < args.length; i++) {
                this.content += args[i];
            }
        }

        return this;
    }

    build(): string {
        return this.content;
    }

}
