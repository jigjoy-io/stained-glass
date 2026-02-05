function addToBlankPage(page: any, payload: any) {
	page.config.buildingBlocks.push(payload.block)
	return page
}

export function pushBlock(page: any, payload: any) {
	if (page.type == "blank") {
		return addToBlankPage(page, payload)
	}
}
