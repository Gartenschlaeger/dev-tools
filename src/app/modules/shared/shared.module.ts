import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { FormModule } from '../form/form.module';
import { FormService } from '../form/services/form-service.service';
import { AlertComponent } from './components/alert/alert.component';
import { CodeComponent } from './components/code/code.component';
import { HighlightedCodeComponent } from './components/highlighted-code/highlighted-code.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { TabControlComponent } from './components/tab-control/tab-control.component';
import { TabComponent } from './components/tab/tab.component';
import { MaterialDefaults } from './material-defaults';
import { DateService } from './services/date.service';
import { LoggingService, LogLevel } from './services/logging.service';

export interface SharedModuleConfiguration {
    minLogLevel: LogLevel;
}

@NgModule({
    declarations: [
        AlertComponent,
        CodeComponent,
        HighlightedCodeComponent,
        TabControlComponent,
        TabComponent,
        PageHeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HighlightModule,
        FormModule,
        MatCardModule,
        MatIconModule,
        MatSliderModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatRadioModule,
        MatInputModule,
        MatSelectModule,
        MatListModule,
        MatTabsModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        FormModule,
        PageHeaderComponent,
        AlertComponent,
        CodeComponent,
        HighlightedCodeComponent,
        TabControlComponent,
        TabComponent,
        MatCardModule,
        MatIconModule,
        MatSliderModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatRadioModule,
        MatInputModule,
        MatSelectModule,
        MatListModule,
        MatTabsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatMenuModule
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
                },
                {
                    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
                    useValue: MaterialDefaults.matFormFieldDefaultOptions
                }
            ]
        };
    }
}
