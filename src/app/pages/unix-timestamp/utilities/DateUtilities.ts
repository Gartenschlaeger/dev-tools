export class DateUtilities {
    static convertToUnixTimestamp(date: Date): number {
        const milliseconds = date.getTime();
        return Math.floor(milliseconds / 1000.0);
    }

    static getUnixTimestamp(): number {
        const date = new Date();
        return this.convertToUnixTimestamp(date);
    }

    static formatDate(date: Date, toUtc?: boolean) {
        return date.toLocaleString('en-UK', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            weekday: 'short',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'longOffset',
            timeZone: toUtc ? 'UTC' : undefined
        });
    }

    static formatTimestamp(timestamp: number, toUtc?: boolean) {
        const date = new Date();
        date.setTime(timestamp * 1000);

        return this.formatDate(date, toUtc);
    }
}
