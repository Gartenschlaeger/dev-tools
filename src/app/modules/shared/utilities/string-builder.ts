export class StringBuilder {
    content = '';

    append(...texts: string[]): StringBuilder {
        if (texts && texts.length) {
            for (let text of texts) {
                this.content += text;
            }
        }

        return this;
    }

    appendLine(line?: string): StringBuilder {
        if (line) {
            this.content += line;
        }

        this.content += '\n';

        return this;
    }

    build(): string {
        return this.content;
    }
}
