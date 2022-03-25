import { Injectable } from '@angular/core'

export enum LogLevel {
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

	logInternal(logLevel: LogLevel, message?: any, ...optionalParams: any[]) {
		if (logLevel >= this.minLogLevel) {
			switch (logLevel) {
				default:
				case LogLevel.debug:
					console.debug(message, optionalParams)
					break
				case LogLevel.info:
					console.info(message, optionalParams)
					break
				case LogLevel.warning:
					console.warn(message, optionalParams)
					break
				case LogLevel.error:
					console.error(message, optionalParams)
					break
			}
		}
	}
}
