export class DateUtilitiesService {
    convertToUnixTimestamp(date: Date): number {
        const milliseconds = date.getTime();
        return Math.floor(milliseconds / 1000.0);
    }

    getUnixTimestamp(): number {
        const date = new Date();
        return this.convertToUnixTimestamp(date);
    }

    getUtcDateByTimestamp(timestamp: number): Date {
        const date = new Date();
        date.setTime(timestamp * 1000);

        return date;
    }

    formatDate(date: Date, toUtc?: boolean): string {
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

    formatTimestamp(timestamp: number, toUtc?: boolean): string {
        const date = new Date();
        date.setTime(timestamp * 1000);

        return this.formatDate(date, toUtc);
    }

    addSeconds(date: Date, amount: number): Date {
        const newDate = new Date(date);
        newDate.setSeconds(date.getSeconds() + amount);

        return newDate;
    }

    addMinutes(date: Date, amount: number): Date {
        const newDate = new Date(date);
        newDate.setMinutes(date.getMinutes() + amount);

        return newDate;
    }

    addHours(date: Date, amount: number): Date {
        const newDate = new Date(date);
        newDate.setHours(date.getHours() + amount);

        return newDate;
    }

    addDays(date: Date, amount: number): Date {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + amount);

        return newDate;
    }

    addMonths(date: Date, amount: number): Date {
        const newDate = new Date(date);
        newDate.setMonth(date.getMonth() + amount);

        return newDate;
    }

    addYears(date: Date, amount: number): Date {
        const newDate = new Date(date);
        newDate.setFullYear(date.getFullYear() + amount);

        return newDate;
    }

    daysBetween(from: Date, to: Date): number {
        const differenceInTime = to.getTime() - from.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        return Math.round(differenceInDays);
    }

    monthsBetween(from: Date, to: Date): number {
        let months: number;
        months = (to.getFullYear() - from.getFullYear()) * 12;
        months -= from.getMonth();
        months += to.getMonth();

        return Math.round(months);
    }

    yearsBetween(from: Date, to: Date): number {
        const differenceInYears = to.getFullYear() - from.getFullYear();

        return Math.round(differenceInYears);
    }
}
