import { INavigationItem } from './components/navigation/navigation.component'

export const NavigationItems: INavigationItem[] = [
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
