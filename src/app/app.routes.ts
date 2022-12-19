import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export interface ExtendedRoute extends Route {
    pined?: boolean;
    icon?: string;
    visible?: boolean;
    hideInNav?: boolean;
    selected?: boolean;
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
        pined: true
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
        path: 'date-calculator',
        loadChildren: () => import('./pages/days-between/date-calculator.module')
            .then((m) => m.DateCalculatorModule),
        title: 'Date Calculator',
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
        path: 'json-path',
        loadChildren: () => import('./pages/json-path/json-path.module')
            .then((m) => m.JsonPathModule),
        title: 'JSON Path Analyzer',
        icon: 'call_merge'
    },
    {
        path: 'json-type-converter',
        loadChildren: () => import('./pages/json-type-converter/json-type-converter.module')
            .then(m => m.JsonTypeConverterModule),
        title: 'JSON Type Converter',
        icon: 'swap_horiz'
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
        title: 'Random String Generator',
        icon: 'shuffle'
    },
    {
        path: 'md5-hmac-hash',
        loadChildren: () => import('./pages/string-hash-generator/string-hash-generator.module')
            .then((m) => m.StringHashGeneratorModule),
        title: 'MD5 HMAC Hash Generator',
        icon: 'fingerprint'
    },
    {
        path: 'md5-hash',
        loadChildren: () => import('./pages/string-hash-generator/string-hash-generator.module')
            .then((m) => m.StringHashGeneratorModule),
        title: 'MD5 Hash Generator',
        icon: 'fingerprint'
    },
    {
        path: 'sha1-hash',
        loadChildren: () => import('./pages/string-hash-generator/string-hash-generator.module')
            .then((m) => m.StringHashGeneratorModule),
        title: 'SHA1 Hash Generator',
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
        title: 'Text Compare',
        icon: 'difference'
    },
    {
        path: 'unix-timestamp',
        loadChildren: () => import('./pages/unix-timestamp/unix-timestamp.module')
            .then(m => m.UnixTimestampModule),
        title: 'Unix Timestamp Converter',
        icon: 'schedule'
    },
    {
        path: 'chmod-calculator',
        loadChildren: () => import('./pages/chmod-calculator/chmod-calculator.module')
            .then(m => m.ChmodCalculatorModule),
        title: 'Chmod Calculator',
        icon: 'lock_open'
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'Page not found',
        hideInNav: true
    }
];
