import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class DateService {
    public DaysBetween(from: Date, to: Date): number {
        const differenceInTime = to.getTime() - from.getTime()
        const differenceInDays = differenceInTime / (1000 * 3600 * 24)

        return Math.round(differenceInDays)
    }

    public MonthsBetween(from: Date, to: Date): number {
        var months: number
        months = (to.getFullYear() - from.getFullYear()) * 12
        months -= from.getMonth()
        months += to.getMonth()

        return Math.round(months)
    }

    public YearsBetween(from: Date, to: Date): number {
        const differenceInYears = to.getFullYear() - from.getFullYear()

        return Math.round(differenceInYears)
    }
}
