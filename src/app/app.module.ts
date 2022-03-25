import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NavigationLinkComponent } from 'src/app/components/navigation-link/navigation-link.component'
import { NavigationComponent } from 'src/app/components/navigation/navigation.component'
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component'
import { FormModule } from 'src/app/modules/form/form.module'
import { SharedModule } from 'src/app/modules/shared/shared.module'
import { SvgIconModule } from 'src/app/modules/svg-icon/svg-icon.module'
import { URLEncoderComponent } from 'src/app/pages/url-encoder/url-encoder.component'
import { environment } from 'src/environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { Base64Component } from './pages/base64/base64.component'
import { DaysBetweenComponent } from './pages/days-between/days-between.component'
import { DockerRunPageComponent } from './pages/docker-run-page/docker-run-page.component'
import { GuidGeneratorComponent } from './pages/guid-generator/guid-generator.component'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'
import { UrlAnalyzerPageComponent } from './pages/url-analyzer-page/url-analyzer-page.component'

@NgModule({
	declarations: [
		AppComponent,
		PageHeaderComponent,
		NavigationComponent,
		NavigationLinkComponent,
		HomePageComponent,
		UrlAnalyzerPageComponent,
		DockerRunPageComponent,
		DaysBetweenComponent,
		URLEncoderComponent,
		GuidGeneratorComponent,
		Base64Component,
		NotFoundComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		FormModule.forRoot(),
		SharedModule.forRoot({ minLogLevel: environment.minLogLevel }),
		SvgIconModule.forRoot()
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
