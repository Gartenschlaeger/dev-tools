import { Injectable } from '@angular/core'
import { LogLevel } from 'src/environments/environment.interface'
import { environment } from '../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class LoggingService {
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
		if (logLevel >= environment.minLogLevel) {
			console.log(message, optionalParams)
		}
	}
}
