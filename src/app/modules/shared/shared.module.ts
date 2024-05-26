import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule, TitleStrategy } from '@angular/router';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { AlertComponent } from './components/alert/alert.component';
import { CodeComponent } from './components/code/code.component';
import { HighlightedCodeComponent } from './components/highlighted-code/highlighted-code.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { CustomErrorStateMatcher } from './controls/custom-error-state-matcher';
import { MatErrorsComponent } from './controls/mat-errors/mat-errors.component';
import { MaterialDefaults } from './material/material-defaults';
import { CustomTitleStrategyService } from './routing/custom-title-strategy.service';
import { DateUtilitiesService } from './services/DateUtilitiesService';
import { FormService } from './services/form-service.service';
import { LogLevel, LoggingService } from './services/logging.service';
import { NotificationsService } from './services/notifications.service';

export interface SharedModuleConfiguration {
    minLogLevel: LogLevel;
}

@NgModule({
    declarations: [AlertComponent, CodeComponent, HighlightedCodeComponent, PageHeaderComponent, MatErrorsComponent],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        PageHeaderComponent,
        AlertComponent,
        CodeComponent,
        HighlightedCodeComponent,
        MatCardModule,
        MatIconModule,
        MatSliderModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
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
        MatMenuModule,
        MatTreeModule,
        MatSnackBarModule,
        MatBottomSheetModule,
        MatErrorsComponent,
        MatTableModule,
        MatProgressSpinnerModule
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HighlightModule,
        MatCardModule,
        MatIconModule,
        MatSliderModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
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
        MatTreeModule,
        MatSnackBarModule,
        MatBottomSheetModule,
        MatTableModule,
        MatProgressSpinnerModule
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class SharedModule {
    static forRoot(config: SharedModuleConfiguration): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
                FormService,
                DateUtilitiesService,
                NotificationsService,
                {
                    provide: LoggingService,
                    useFactory: () => new LoggingService(config.minLogLevel),
                    multi: false
                },
                {
                    provide: TitleStrategy,
                    useClass: CustomTitleStrategyService
                },
                {
                    provide: HIGHLIGHT_OPTIONS,
                    useValue: {
                        coreLibraryLoader: () => import('highlight.js/lib/core'),
                        languages: {
                            json: () => import('highlight.js/lib/languages/json'),
                            bash: () => import('highlight.js/lib/languages/bash'),
                            typescript: () => import('highlight.js/lib/languages/typescript')
                        }
                    }
                },
                {
                    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
                    useValue: MaterialDefaults.matFormFieldDefaultOptions
                },
                {
                    provide: ErrorStateMatcher,
                    useClass: CustomErrorStateMatcher
                },
                {
                    provide: TitleStrategy,
                    useClass: CustomTitleStrategyService
                }
            ]
        };
    }
}
