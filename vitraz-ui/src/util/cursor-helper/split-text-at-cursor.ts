export const splitTextAtCursor = (text: string, caretPosition: number) => {
	const beforeCursor = text.slice(0, caretPosition).trim()
	const afterCursor = text.slice(caretPosition).trim()
	return { beforeCursor, afterCursor }
}
