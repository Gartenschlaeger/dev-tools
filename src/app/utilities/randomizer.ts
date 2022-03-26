function shuffleString(text: string) {
	var a = text.split(''),
		n = a.length

	for (var i = n - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1))
		var tmp = a[i]
		a[i] = a[j]
		a[j] = tmp
	}

	return a.join('')
}

function shuffleArray(arr: string[]) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[arr[i], arr[j]] = [arr[j], arr[i]]
	}
	return arr
}

export { shuffleString, shuffleArray }
