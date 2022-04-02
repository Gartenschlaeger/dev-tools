import { Route } from '@angular/router'
import { Base64Component } from './pages/base64/base64.component'
import { ColorPickerComponent } from './pages/color-picker/color-picker.component'
import { DaysBetweenComponent } from './pages/days-between/days-between.component'
import { DockerRunPageComponent } from './pages/docker-run-page/docker-run-page.component'
import { GuidGeneratorComponent } from './pages/guid-generator/guid-generator.component'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { JsonFormatterComponent } from './pages/json-formatter/json-formatter.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'
import { StringGeneratorComponent } from './pages/string-generator/string-generator.component'
import { StringRandomizerComponent } from './pages/string-randomizer/string-randomizer.component'
import { UrlAnalyzerPageComponent } from './pages/url-analyzer-page/url-analyzer-page.component'
import { URLEncoderComponent } from './pages/url-encoder/url-encoder.component'

export const routes: Route[] = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'home'
	},
	{
		path: 'home',
		component: HomePageComponent
	},
	{
		path: 'url-analyzer',
		component: UrlAnalyzerPageComponent
	},
	{
		path: 'url-decoder',
		component: URLEncoderComponent
	},
	{
		path: 'url-encoder',
		component: URLEncoderComponent
	},
	{
		path: 'docker-run',
		component: DockerRunPageComponent
	},
	{
		path: 'days-between',
		component: DaysBetweenComponent
	},
	{
		path: 'guid-generator',
		component: GuidGeneratorComponent
	},
	{
		path: 'base64-encoder',
		component: Base64Component
	},
	{
		path: 'base64-decoder',
		component: Base64Component
	},
	{
		path: 'json-formatter',
		component: JsonFormatterComponent
	},
	{
		path: 'json-path',
		loadChildren: () => import('./pages/json-path/json-path.module').then((m) => m.JsonPathModule)
	},
	{
		path: 'string-randomizer',
		component: StringRandomizerComponent
	},
	{
		path: 'string-generator',
		component: StringGeneratorComponent
	},
	{
		path: 'string-hash-generator',
		loadChildren: () =>
			import('./pages/string-hash-generator/string-hash-generator.module').then(
				(m) => m.StringHashGeneratorModule
			)
	},
	{
		path: 'color-picker',
		component: ColorPickerComponent
	},
	{
		path: 'qrcode-generator',
		loadChildren: () =>
			import('./pages/qrcode-generator/qrcode-generator.module').then((m) => m.QRCodeGeneratorModule)
	},
	{
		path: '**',
		component: NotFoundComponent
	}
]
