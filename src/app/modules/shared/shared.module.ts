import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs'
import { AlertComponent } from 'src/app/modules/shared/components/alert/alert.component'
import { CodeComponent } from 'src/app/modules/shared/components/code/code.component'
import { TabControlComponent } from 'src/app/modules/shared/components/tab-control/tab-control.component'
import { TabComponent } from 'src/app/modules/shared/components/tab/tab.component'
import { DateService } from 'src/app/modules/shared/services/date.service'
import { LoggingService, LogLevel } from 'src/app/modules/shared/services/logging.service'
import { HighlightedCodeComponent } from './components/highlighted-code/highlighted-code.component'

export interface SharedModuleConfiguration {
	minLogLevel: LogLevel
}

@NgModule({
	declarations: [AlertComponent, CodeComponent, TabControlComponent, TabComponent, HighlightedCodeComponent],
	imports: [CommonModule, RouterModule, HighlightModule],
	exports: [AlertComponent, CodeComponent, HighlightedCodeComponent, TabControlComponent, TabComponent]
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
				},
				{
					provide: HIGHLIGHT_OPTIONS,
					useValue: {
						coreLibraryLoader: () => import('highlight.js/lib/core'),
						//lineNumbersLoader: () => import('highlightjs-line-numbers.js'),
						//lineNumbers: true,
						languages: {
							json: () => import('highlight.js/lib/languages/json')
						}
					}
				}
			]
		}
	}
}
