import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AlertComponent } from 'src/app/components/alert/alert.component'
import { CodeComponent } from 'src/app/components/code/code.component'
import { NavigationLinkComponent } from 'src/app/components/navigation-link/navigation-link.component'
import { NavigationComponent } from 'src/app/components/navigation/navigation.component'
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component'
import { SvgIconModule } from 'src/app/components/svg-icon/svg-icon.module'
import { TabControlComponent } from 'src/app/components/tab-control/tab-control.component'
import { TabComponent } from 'src/app/components/tab/tab.component'
import { FormModule } from 'src/app/modules/form/form.module'
import { SharedModule } from 'src/app/modules/shared/shared.module'
import { environment } from 'src/environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DaysBetweenComponent } from './pages/days-between/days-between.component'
import { DockerRunPageComponent } from './pages/docker-run-page/docker-run-page.component'
import { GuidGeneratorComponent } from './pages/guid-generator/guid-generator.component'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { UrlAnalyzerPageComponent } from './pages/url-analyzer-page/url-analyzer-page.component'
import { URLDecoderPageComponent } from './pages/url-decoder-page/url-decoder-page.component'

@NgModule({
	declarations: [
		AppComponent,
		NavigationComponent,
		NavigationLinkComponent,
		HomePageComponent,
		UrlAnalyzerPageComponent,
		DockerRunPageComponent,
		PageHeaderComponent,
		TabComponent,
		TabControlComponent,
		DaysBetweenComponent,
		CodeComponent,
		URLDecoderPageComponent,
		AlertComponent,
		GuidGeneratorComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		FormModule.forRoot(),
		SharedModule.forRoot({ minLogLevel: environment.minLogLevel }),
		SvgIconModule
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
