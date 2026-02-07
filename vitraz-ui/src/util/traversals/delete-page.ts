function deleteFromBlankPage(page: any, blockId: any) {
	let filtered: any[] = []
	page.config.buildingBlocks.forEach((block: any) => {
		if (block.type == "page.display") {
			if (block.page.id !== blockId) {
				block.page = deletePage(block.page, blockId)
				filtered.push(block)
			}
		} else {
			filtered.push(block)
		}
	})

	page.config.buildingBlocks = filtered
	return page
}

export function deletePage(page: any, blockId: any) {
	//TODO: REMOVE AFTER REFACTORE
	delete page.root
	delete page.ident
	delete page.mode

	if (page.type == "blank") {
		page = deleteFromBlankPage(page, blockId)
	}
	return page
}
