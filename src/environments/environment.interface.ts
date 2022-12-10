import { LogLevel } from 'src/app/modules/shared/services/logging.service';

export interface Environment {
    production: boolean;
    minLogLevel: LogLevel;
}
