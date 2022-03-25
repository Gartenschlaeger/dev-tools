import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DateService } from 'src/app/services/date.service'
import { FormService } from 'src/app/services/form-service.service'
import { FormFieldErrorsComponent } from 'src/app/shared/form-field-errors/form-field-errors.component'
import { FormFooterComponent } from 'src/app/shared/form-footer/form-footer.component'
import { FormSectionComponent } from 'src/app/shared/form-section/form-section.component'
import { FormTextfieldComponent } from 'src/app/shared/form-textfield/form-textfield.component'
import { NavigationLinkComponent } from 'src/app/shared/navigation-link/navigation-link.component'
import { NavigationComponent } from 'src/app/shared/navigation/navigation.component'
import { PageHeaderComponent } from 'src/app/shared/page-header/page-header.component'
import { SvgIconModule } from 'src/app/shared/svg-icon/svg-icon.module'
import { TabControlComponent } from 'src/app/shared/tab-control/tab-control.component'
import { TabComponent } from 'src/app/shared/tab/tab.component'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DaysBetweenComponent } from './pages/days-between/days-between.component'
import { DockerRunPageComponent } from './pages/docker-run-page/docker-run-page.component'
import { GuidGeneratorComponent } from './pages/guid-generator/guid-generator.component'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { UrlAnalyzerPageComponent } from './pages/url-analyzer-page/url-analyzer-page.component'
import { URLDecoderPageComponent } from './pages/url-decoder-page/url-decoder-page.component'
import { AlertComponent } from './shared/alert/alert.component'
import { CodeComponent } from './shared/code/code.component'

@NgModule({
	declarations: [
		AppComponent,
		NavigationComponent,
		NavigationLinkComponent,
		HomePageComponent,
		UrlAnalyzerPageComponent,
		DockerRunPageComponent,
		PageHeaderComponent,
		FormFieldErrorsComponent,
		FormFooterComponent,
		TabComponent,
		TabControlComponent,
		FormSectionComponent,
		FormTextfieldComponent,
		DaysBetweenComponent,
		CodeComponent,
		URLDecoderPageComponent,
		AlertComponent,
		GuidGeneratorComponent
	],
	imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, ReactiveFormsModule, SvgIconModule],
	providers: [FormService, DateService],
	bootstrap: [AppComponent]
})
export class AppModule {}
