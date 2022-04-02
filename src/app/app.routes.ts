import { CustomRoute } from './modules/shared/entities/custom-route'
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

export const AppRoutes: CustomRoute[] = [
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
		pageTitle: 'JSON Path',
		path: 'json-path',
		loadChildren: () => import('./pages/json-path/json-path.module').then((m) => m.JsonPathModule)
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
		pageTitle: 'Color picker',
		path: 'color-picker',
		component: ColorPickerComponent
	},
	{
		pageTitle: 'QR Code Generator',
		path: 'qrcode-generator',
		loadChildren: () =>
			import('./pages/qrcode-generator/qrcode-generator.module').then((m) => m.QRCodeGeneratorModule)
	},
	{
		path: '**',
		component: NotFoundComponent
	}
]
