import { INavigationItem } from './navigation.component'

export const items: INavigationItem[] = [
	{
		title: 'MD5 Hash Generator',
		routerLink: 'string-hash-generator/md5'
	},
	{
		title: 'HMAC MD5 Hash Generator',
		routerLink: 'string-hash-generator/md5hmac'
	},
	{
		title: 'SHA1 HMAC Hash Generator',
		routerLink: 'string-hash-generator/sha1'
	}
]
