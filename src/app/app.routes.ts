import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export interface ExtendedRoute extends Route {
    pined?: boolean;
    icon?: string;
    visible?: boolean;
    hideInNav?: boolean;
}

export const routes: ExtendedRoute[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
        hideInNav: true
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
        icon: 'home',
        pined: true,
        hideInNav: true
    },
    {
        path: 'url-analyzer',
        loadChildren: () => import('./pages/url-analyzer/url-analyzer.module')
            .then((m) => m.UrlAnalyzerModule),
        title: 'URL Analyzer',
        icon: 'link'
    },
    {
        path: 'url-decoder',
        loadChildren: () => import('./pages/url-encoder/url-encoder.module')
            .then((m) => m.UrlEncoderModule),
        title: 'URL Decoder',
        icon: 'link'
    },
    {
        path: 'url-encoder',
        loadChildren: () => import('./pages/url-encoder/url-encoder.module')
            .then((m) => m.UrlEncoderModule),
        title: 'URL Encoder',
        icon: 'link'
    },
    {
        path: 'docker-run',
        loadChildren: () => import('./pages/docker-run/docker-run.module')
            .then((m) => m.DockerRunModule),
        title: 'Docker run',
        icon: 'terminal'
    },
    {
        path: 'days-between',
        loadChildren: () => import('./pages/days-between/days-between.module')
            .then((m) => m.DaysBetweenModule),
        title: 'Days between',
        icon: 'date_range'
    },
    {
        path: 'guid-generator',
        loadChildren: () => import('./pages/guid-generator/guid-generator.module')
            .then((m) => m.GuidGeneratorModule),
        title: 'GUID Generator',
        icon: 'tag'
    },
    {
        path: 'base64-encoder',
        loadChildren: () => import('./pages/base64/base64.module')
            .then((m) => m.Base64Module),
        title: 'Base64 Encoder',
        icon: 'tag'
    },
    {
        path: 'base64-decoder',
        loadChildren: () => import('./pages/base64/base64.module')
            .then((m) => m.Base64Module),
        title: 'Base64 Decoder',
        icon: 'tag'
    },
    {
        path: 'json-formatter',
        loadChildren: () => import('./pages/json-formatter/json-formatter.module')
            .then((m) => m.JsonFormatterModule),
        title: 'JSON Formatter',
        icon: 'format_align_left'
    },
    {
        path: 'json-parser',
        loadChildren: () => import('./pages/json-parser/json-parser.module')
            .then((m) => m.JsonParserModule),
        title: 'JSON Parser',
        icon: 'code'
    },
    {
        path: 'json-path',
        loadChildren: () => import('./pages/json-path/json-path.module')
            .then((m) => m.JsonPathModule),
        title: 'JSON Path',
        icon: 'call_merge'
    },
    {
        path: 'string-randomizer',
        loadChildren: () => import('./pages/string-randomizer/string-randomizer.module')
            .then((m) => m.StringRandomizerModule),
        title: 'String Randomizer',
        icon: 'shuffle'
    },
    {
        path: 'random-string',
        loadChildren: () => import('./pages/string-generator/string-generator.module')
            .then((m) => m.StringGeneratorModule),
        title: 'Random String',
        icon: 'shuffle'
    },
    {
        path: 'md5-hmac-hash',
        loadChildren: () => import('./pages/string-hash-generator/string-hash-generator.module')
            .then((m) => m.StringHashGeneratorModule),
        title: 'MD5 HMAC Hash',
        icon: 'fingerprint'
    },
    {
        path: 'md5-hash',
        loadChildren: () => import('./pages/string-hash-generator/string-hash-generator.module')
            .then((m) => m.StringHashGeneratorModule),
        title: 'MD5 Hash',
        icon: 'fingerprint'
    },
    {
        path: 'sha1-hash',
        loadChildren: () => import('./pages/string-hash-generator/string-hash-generator.module')
            .then((m) => m.StringHashGeneratorModule),
        title: 'SHA1 Hash',
        icon: 'fingerprint'
    },
    {
        path: 'color-picker',
        loadChildren: () => import('./pages/color-picker/color-picker.module')
            .then((m) => m.ColorPickerModule),
        title: 'Color Picker',
        icon: 'palette'
    },
    {
        path: 'qrcode-generator',
        loadChildren: () => import('./pages/qrcode-generator/qrcode-generator.module')
            .then((m) => m.QRCodeGeneratorModule),
        title: 'QRCode Generator',
        icon: 'qr_code'
    },
    {
        path: 'bit-calculator',
        loadChildren: () => import('./pages/bit-calculator/bit-calculator.module')
            .then((m) => m.BitCalculatorModule),
        title: 'Bit Calculator',
        icon: 'calculate'
    },
    {
        path: 'text-diff',
        loadChildren: () => import('./pages/text-diff/text-diff.module')
            .then((m) => m.TextDiffModule),
        title: 'Text Diff',
        icon: 'difference'
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'Not found',
        hideInNav: true
    }
];
