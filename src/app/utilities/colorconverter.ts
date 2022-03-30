function rbgToHsl(r: number, g: number, b: number) {
	r /= 255
	g /= 255
	b /= 255

	const l = Math.max(r, g, b)
	const s = l - Math.min(r, g, b)
	const h = s ? (l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s) : 0

	return [
		60 * h < 0 ? 60 * h + 360 : 60 * h,
		100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
		(100 * (2 * l - s)) / 2
	]
}

const hslToRgb = (h: number, s: number, l: number) => {
	s /= 100
	l /= 100

	const k = (n: number) => (n + h / 30) % 12
	const a = s * Math.min(l, 1 - l)
	const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))

	return [255 * f(0), 255 * f(8), 255 * f(4)]
}

export { rbgToHsl, hslToRgb }
