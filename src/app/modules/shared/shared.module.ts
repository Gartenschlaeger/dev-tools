import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AlertComponent } from 'src/app/modules/shared/components/alert/alert.component'
import { CodeComponent } from 'src/app/modules/shared/components/code/code.component'
import { NavigationLinkComponent } from 'src/app/modules/shared/components/navigation-link/navigation-link.component'
import { NavigationComponent } from 'src/app/modules/shared/components/navigation/navigation.component'
import { PageHeaderComponent } from 'src/app/modules/shared/components/page-header/page-header.component'
import { TabControlComponent } from 'src/app/modules/shared/components/tab-control/tab-control.component'
import { TabComponent } from 'src/app/modules/shared/components/tab/tab.component'
import { DateService } from 'src/app/modules/shared/services/date.service'
import { LoggingService, LogLevel } from 'src/app/modules/shared/services/logging.service'

export interface SharedModuleConfiguration {
	minLogLevel: LogLevel
}

@NgModule({
	declarations: [
		AlertComponent,
		CodeComponent,
		NavigationComponent,
		NavigationLinkComponent,
		PageHeaderComponent,
		TabControlComponent,
		TabComponent
	],
	imports: [CommonModule, RouterModule],
	exports: [
		AlertComponent,
		CodeComponent,
		NavigationComponent,
		NavigationLinkComponent,
		PageHeaderComponent,
		TabControlComponent,
		TabComponent
	]
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
