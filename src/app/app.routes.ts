import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'url-analyzer',
        loadChildren: () => import('./pages/url-analyzer/url-analyzer.module')
            .then((m) => m.UrlAnalyzerModule),
        title: 'URL Analyzer'
    },
    {
        path: 'url-decoder',
        loadChildren: () => import('./pages/url-encoder/url-encoder.module')
            .then((m) => m.UrlEncoderModule),
        title: 'URL Decoder'
    },
    {
        path: 'url-encoder',
        loadChildren: () => import('./pages/url-encoder/url-encoder.module')
            .then((m) => m.UrlEncoderModule),
        title: 'URL Encoder'
    },
    {
        path: 'docker-run',
        loadChildren: () => import('./pages/docker-run/docker-run.module')
            .then((m) => m.DockerRunModule),
        title: 'Docker run'
    },
    {
        path: 'days-between',
        loadChildren: () => import('./pages/days-between/days-between.module')
            .then((m) => m.DaysBetweenModule),
        title: 'Days between'
    },
    {
        path: 'guid-generator',
        loadChildren: () => import('./pages/guid-generator/guid-generator.module')
            .then((m) => m.GuidGeneratorModule),
        title: 'GUID Generator'
    },
    {
        path: 'base64-encoder',
        loadChildren: () => import('./pages/base64/base64.module')
            .then((m) => m.Base64Module),
        title: 'Base64 Encoder'
    },
    {
        path: 'base64-decoder',
        loadChildren: () => import('./pages/base64/base64.module')
            .then((m) => m.Base64Module),
        title: 'Base64 Decoder'
    },
    {
        path: 'json-formatter',
        loadChildren: () => import('./pages/json-formatter/json-formatter.module')
            .then((m) => m.JsonFormatterModule),
        title: 'JSON Formatter'
    },
    {
        path: 'json-parser',
        loadChildren: () => import('./pages/json-parser/json-parser.module')
            .then((m) => m.JsonParserModule),
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
        loadChildren: () => import('./pages/string-randomizer/string-randomizer.module')
            .then((m) => m.StringRandomizerModule),
        title: 'String Randomizer'
    },
    {
        path: 'string-generator',
        loadChildren: () => import('./pages/string-generator/string-generator.module')
            .then((m) => m.StringGeneratorModule),
        title: 'String Generator'
    },
    {
        path: 'string-hash-generator',
        loadChildren: () => import('./pages/string-hash-generator/string-hash-generator.module')
            .then((m) => m.StringHashGeneratorModule)
    },
    {
        path: 'color-picker',
        loadChildren: () => import('./pages/color-picker/color-picker.module')
            .then((m) => m.ColorPickerModule),
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
        loadChildren: () => import('./pages/bit-calculator/bit-calculator.module')
            .then((m) => m.BitCalculatorModule),
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
