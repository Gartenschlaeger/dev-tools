import { INavigationItem } from './entities/INavigationItem'

export const items: INavigationItem[] = [
	// { title: 'Home', routerLink: 'home', icon: 'home', isSticked: true },
	{ title: 'Base64 Encoder', routerLink: 'base64-encoder', icon: 'tag' },
	{ title: 'Base64 Decoder', routerLink: 'base64-decoder', icon: 'tag' },
	{ title: 'Color Picker', routerLink: 'color-picker', icon: 'palette' },
	{ title: 'Days between', routerLink: 'days-between', icon: 'date_range' },
	{ title: 'Docker run', routerLink: 'docker-run', icon: 'terminal' },
	{ title: 'Guid Generator', routerLink: 'guid-generator', icon: 'tag' },
	{ title: 'JSON Formatter', routerLink: 'json-formatter', icon: 'format_align_left' },
	{ title: 'JSON Parser', routerLink: 'json-parser', icon: 'code' },
	{ title: 'JSON Path', routerLink: 'json-path', icon: 'call_merge' },
	{ title: 'QR Code Generator', routerLink: 'qrcode-generator', icon: 'qr_code' },
	{ title: 'Random String Generator', routerLink: 'string-generator', icon: 'shuffle' },
	{ title: 'MD5 Hash Generator', routerLink: 'string-hash-generator/md5', icon: 'fingerprint' },
	{ title: 'HMAC MD5 Hash Generator', routerLink: 'string-hash-generator/md5hmac', icon: 'fingerprint' },
	{ title: 'SHA1 HMAC Hash Generator', routerLink: 'string-hash-generator/sha1', icon: 'fingerprint' },
	{ title: 'String Randomizer', routerLink: 'string-randomizer', icon: 'shuffle' },
	{ title: 'URL Analyzer', routerLink: 'url-analyzer', icon: 'link' },
	{ title: 'URL Decoder', routerLink: 'url-decoder', icon: 'link' },
	{ title: 'URL Encoder', routerLink: 'url-encoder', icon: 'link' },
	{ title: 'Bit Calculator', routerLink: 'bit-calculator', icon: 'calculate' },
	{ title: 'Text Diff', routerLink: 'text-diff', icon: 'difference' }
]
