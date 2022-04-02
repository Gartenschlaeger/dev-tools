import { INavigationItem } from './navigation.component'

export const items: INavigationItem[] = [
	{ title: 'Home', routerLink: 'home', isSticked: true },
	{ title: 'Base64 Encoder', routerLink: 'base64-encoder' },
	{ title: 'Base64 Decoder', routerLink: 'base64-decoder' },
	{ title: 'Color Picker', routerLink: 'color-picker' },
	{ title: 'Days between', routerLink: 'days-between' },
	{ title: 'Docker run', routerLink: 'docker-run' },
	{ title: 'Guid Generator', routerLink: 'guid-generator' },
	{ title: 'JSON Formatter', routerLink: 'json-formatter' },
	{ title: 'JSON Path', routerLink: 'json-path' },
	{ title: 'QR Code Generator', routerLink: 'qrcode-generator' },
	{ title: 'Random String Generator', routerLink: 'string-generator' },
	{ title: 'MD5 Hash Generator', routerLink: 'string-hash-generator/md5' },
	{ title: 'HMAC MD5 Hash Generator', routerLink: 'string-hash-generator/md5hmac' },
	{ title: 'SHA1 HMAC Hash Generator', routerLink: 'string-hash-generator/sha1' },
	{ title: 'String Randomizer', routerLink: 'string-randomizer' },
	{ title: 'URL Analyzer', routerLink: 'url-analyzer' },
	{ title: 'URL Decoder', routerLink: 'url-decoder' },
	{ title: 'URL Encoder', routerLink: 'url-encoder' }
]
