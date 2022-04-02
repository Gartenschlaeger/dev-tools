function isEmpty(value: string | null | undefined) {
	if (value === undefined || value === null) {
		return true
	}

	return value.length === 0
}

export { isEmpty }
