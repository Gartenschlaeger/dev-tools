import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { DateService } from 'src/app/modules/shared/services/date.service'
import { LoggingService, LogLevel } from 'src/app/modules/shared/services/logging.service'

export interface SharedModuleConfiguration {
	minLogLevel: LogLevel
}

@NgModule({
	declarations: [],
	imports: [CommonModule]
})
export class SharedModule {
	static forRoot(config: SharedModuleConfiguration): ModuleWithProviders<SharedModule> {
		return {
			ngModule: SharedModule,
			providers: [
				DateService,
				{
					provide: LoggingService,
					useFactory: () => new LoggingService(config.minLogLevel),
					multi: false
				}
			]
		}
	}
}
