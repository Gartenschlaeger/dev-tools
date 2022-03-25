import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormModule } from 'src/app/modules/form/form.module'
import { SharedModule } from 'src/app/modules/shared/shared.module'
import { SvgIconModule } from 'src/app/modules/svg-icon/svg-icon.module'
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
		HomePageComponent,
		UrlAnalyzerPageComponent,
		DockerRunPageComponent,
		DaysBetweenComponent,
		URLDecoderPageComponent,
		GuidGeneratorComponent
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
