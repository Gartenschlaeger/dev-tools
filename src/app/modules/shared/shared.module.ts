import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs'
import { FormModule } from '../form/form.module'
import { FormService } from '../form/services/form-service.service'
import { SvgIconsModule } from '../svg-icons/svg-icons.module'
import { AlertComponent } from './components/alert/alert.component'
import { CodeComponent } from './components/code/code.component'
import { HighlightedCodeComponent } from './components/highlighted-code/highlighted-code.component'
import { PageHeaderComponent } from './components/page-header/page-header.component'
import { TabControlComponent } from './components/tab-control/tab-control.component'
import { TabComponent } from './components/tab/tab.component'
import { DateService } from './services/date.service'
import { LoggingService, LogLevel } from './services/logging.service'

export interface SharedModuleConfiguration {
	minLogLevel: LogLevel
}

@NgModule({
	declarations: [
		PageHeaderComponent,
		AlertComponent,
		CodeComponent,
		HighlightedCodeComponent,
		TabControlComponent,
		TabComponent
	],
	imports: [CommonModule, RouterModule, ReactiveFormsModule, HighlightModule, FormModule, SvgIconsModule],
	exports: [
		ReactiveFormsModule,
		FormModule,
		SvgIconsModule,
		PageHeaderComponent,
		AlertComponent,
		CodeComponent,
		HighlightedCodeComponent,
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
				FormService,
				{
					provide: LoggingService,
					useFactory: () => new LoggingService(config.minLogLevel),
					multi: false
				},
				{
					provide: HIGHLIGHT_OPTIONS,
					useValue: {
						coreLibraryLoader: () => import('highlight.js/lib/core'),
						languages: {
							json: () => import('highlight.js/lib/languages/json'),
							bash: () => import('highlight.js/lib/languages/bash')
						}
					}
				}
			]
		}
	}
}
