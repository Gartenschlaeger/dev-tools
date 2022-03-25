import { Injectable } from '@angular/core'

export enum LogLevel {
	trace,
	debug,
	info,
	warning,
	error
}

@Injectable({
	providedIn: 'root'
})
export class LoggingService {
	constructor(private minLogLevel: LogLevel) {}

	trace(message?: any, ...optionalParams: any[]) {
		this.logInternal(LogLevel.trace, message, optionalParams)
	}

	debug(message?: any, ...optionalParams: any[]) {
		this.logInternal(LogLevel.debug, message, optionalParams)
	}

	info(message?: any, ...optionalParams: any[]) {
		this.logInternal(LogLevel.info, message, optionalParams)
	}

	warning(message?: any, ...optionalParams: any[]) {
		this.logInternal(LogLevel.warning, message, optionalParams)
	}

	error(message?: any, ...optionalParams: any[]) {
		this.logInternal(LogLevel.error, message, optionalParams)
	}

	logInternal(logLevel: LogLevel, message: any, optionalParams: any[]) {
		if (logLevel >= this.minLogLevel) {
			console.log(`[${LogLevel[logLevel].toUpperCase()}] ${message}`, ...optionalParams)
		}
	}
}
