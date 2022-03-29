import { NgModule } from '@angular/core'
import { Route, RouterModule } from '@angular/router'
import { Base64Component } from 'src/app/pages/base64/base64.component'
import { ColorConverterComponent } from 'src/app/pages/color-converter/color-converter.component'
import { DaysBetweenComponent } from 'src/app/pages/days-between/days-between.component'
import { DockerRunPageComponent } from 'src/app/pages/docker-run-page/docker-run-page.component'
import { GuidGeneratorComponent } from 'src/app/pages/guid-generator/guid-generator.component'
import { HomePageComponent } from 'src/app/pages/home-page/home-page.component'
import { JsonFormatterComponent } from 'src/app/pages/json-formatter/json-formatter.component'
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component'
import { StringGeneratorComponent } from 'src/app/pages/string-generator/string-generator.component'
import { StringRandomizerComponent } from 'src/app/pages/string-randomizer/string-randomizer.component'
import { UrlAnalyzerPageComponent } from 'src/app/pages/url-analyzer-page/url-analyzer-page.component'
import { URLEncoderComponent } from 'src/app/pages/url-encoder/url-encoder.component'

export interface CustomRoute extends Route {
	pageTitle?: string
	stickedInNavbar?: boolean
}

export const routes: CustomRoute[] = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'home'
	},
	{
		pageTitle: 'Home',
		stickedInNavbar: true,
		path: 'home',
		component: HomePageComponent
	},
	{
		pageTitle: 'URL Analyzer',
		path: 'url-analyzer',
		component: UrlAnalyzerPageComponent
	},
	{
		pageTitle: 'URL Decoder',
		path: 'url-decoder',
		component: URLEncoderComponent
	},
	{
		pageTitle: 'URL Encoder',
		path: 'url-encoder',
		component: URLEncoderComponent
	},
	{
		pageTitle: 'Docker Run',
		path: 'docker-run',
		component: DockerRunPageComponent
	},
	{
		pageTitle: 'Days between',
		path: 'days-between',
		component: DaysBetweenComponent
	},
	{
		pageTitle: 'Guid Generator',
		path: 'guid-generator',
		component: GuidGeneratorComponent
	},
	{
		pageTitle: 'Base64 Encoder',
		path: 'base64-encoder',
		component: Base64Component
	},
	{
		pageTitle: 'Base64 Decoder',
		path: 'base64-decoder',
		component: Base64Component
	},
	{
		pageTitle: 'JSON Formatter',
		path: 'json-formatter',
		component: JsonFormatterComponent
	},
	{
		pageTitle: 'String Randomizer',
		path: 'string-randomizer',
		component: StringRandomizerComponent
	},
	{
		pageTitle: 'String Generator',
		path: 'string-generator',
		component: StringGeneratorComponent
	},
	{
		pageTitle: 'Color converter',
		path: 'color-converter',
		component: ColorConverterComponent
	},
	{
		path: '**',
		component: NotFoundComponent
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
