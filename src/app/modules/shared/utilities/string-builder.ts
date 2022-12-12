export class StringBuilder {

    content = '';

    private appendInternal(...args: any[]): StringBuilder {
        if (args && args.length) {
            for (let i = 0; i < args.length; i++) {
                this.content += args[i];
            }
        }

        return this;
    }

    append(...args: any[]): StringBuilder {
        this.appendInternal(args);
        return this;
    }

    appendLine(...args: any[]): StringBuilder {
        this.appendInternal(args);
        this.appendInternal('\n');
        return this;
    }

    build(): string {
        return this.content;
    }

}
