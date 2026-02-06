function traversBlankPage(page: any, block: any) {
	for (let i = 0; i < page.config.buildingBlocks.length; i++) {
		if (page.config.buildingBlocks[i].id == block.id) {
			page.config.buildingBlocks[i] = block
			return page
		} else if (page.config.buildingBlocks[i].type == "page.display") {
			page.config.buildingBlocks[i].page = traversPage(page.config.buildingBlocks[i].page, block)
		}
	}
	return page
}

function traversPage(page: any, block: any) {
	//TODO: REMOVE AFTER REFACTORE
	delete page.root
	delete page.ident
	delete page.mode

	delete block.root
	delete block.ident
	delete block.mode

	if (page.id == block.id) {
		page = block
		return page
	} else if (page.type == "blank") {
		page = traversBlankPage(page, block)
	}
	return page
}

export function replaceBlock(page: any, block: any) {
	let newPage = traversPage(page, block)
	return newPage
}
