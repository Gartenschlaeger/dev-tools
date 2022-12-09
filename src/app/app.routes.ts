import { Route } from '@angular/router';
import { Base64Component } from './pages/base64/base64.component';
import { BitCalculatorComponent } from './pages/bit-calculator/bit-calculator.component';
import { ColorPickerComponent } from './pages/color-picker/color-picker.component';
import { DaysBetweenComponent } from './pages/days-between/days-between.component';
import { DockerRunPageComponent } from './pages/docker-run-page/docker-run-page.component';
import { GuidGeneratorComponent } from './pages/guid-generator/guid-generator.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { JsonFormatterComponent } from './pages/json-formatter/json-formatter.component';
import { JsonParserComponent } from './pages/json-parser/json-parser.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { StringGeneratorComponent } from './pages/string-generator/string-generator.component';
import { StringRandomizerComponent } from './pages/string-randomizer/string-randomizer.component';
import { UrlAnalyzerPageComponent } from './pages/url-analyzer-page/url-analyzer-page.component';
import { URLEncoderComponent } from './pages/url-encoder/url-encoder.component';

export const routes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomePageComponent,
        title: 'Home'
    },
    {
        path: 'url-analyzer',
        component: UrlAnalyzerPageComponent,
        title: 'URL Analyzer'
    },
    {
        path: 'url-decoder',
        component: URLEncoderComponent,
        title: 'URL Decoder'
    },
    {
        path: 'url-encoder',
        component: URLEncoderComponent,
        title: 'URL Encoder'
    },
    {
        path: 'docker-run',
        component: DockerRunPageComponent,
        title: 'Docker run'
    },
    {
        path: 'days-between',
        component: DaysBetweenComponent,
        title: 'Days between'
    },
    {
        path: 'guid-generator',
        component: GuidGeneratorComponent,
        title: 'GUID Generator'
    },
    {
        path: 'base64-encoder',
        component: Base64Component,
        title: 'Base64 Encoder'
    },
    {
        path: 'base64-decoder',
        component: Base64Component,
        title: 'Base64 Decoder'
    },
    {
        path: 'json-formatter',
        component: JsonFormatterComponent,
        title: 'JSON Formatter'
    },
    {
        path: 'json-parser',
        component: JsonParserComponent,
        title: 'JSON Parser'
    },
    {
        path: 'json-path',
        loadChildren: () => import('./pages/json-path/json-path.module')
            .then((m) => m.JsonPathModule),
        title: 'JSON Path'
    },
    {
        path: 'string-randomizer',
        component: StringRandomizerComponent,
        title: 'String Randomizer'
    },
    {
        path: 'string-generator',
        component: StringGeneratorComponent,
        title: 'String Generator'
    },
    {
        path: 'string-hash-generator',
        loadChildren: () => import('./pages/string-hash-generator/string-hash-generator.module')
            .then((m) => m.StringHashGeneratorModule)
    },
    {
        path: 'color-picker',
        component: ColorPickerComponent,
        title: 'Color Picker'
    },
    {
        path: 'qrcode-generator',
        loadChildren: () => import('./pages/qrcode-generator/qrcode-generator.module')
            .then((m) => m.QRCodeGeneratorModule),
        title: 'QRCode Generator'
    },
    {
        path: 'bit-calculator',
        component: BitCalculatorComponent,
        title: 'Bit Calculator'
    },
    {
        path: 'text-diff',
        loadChildren: () => import('./pages/text-diff/text-diff.module')
            .then((m) => m.TextDiffModule),
        title: 'Text Diff'
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'Not found'
    }
];
