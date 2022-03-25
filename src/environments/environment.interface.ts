export enum LogLevel {
	debug,
	info,
	warning,
	error
}

export interface Environment {
	production: boolean
	minLogLevel: LogLevel
}
