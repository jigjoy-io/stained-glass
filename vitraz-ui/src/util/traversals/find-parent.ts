function traversBlankPage(page: any, innerPage: any, parent: any) {
	for (let i = 0; i < page.config.buildingBlocks.length; i++) {
		if (page.config.buildingBlocks[i].type == "page-tile") {
			if (page.config.buildingBlocks[i].page.id == innerPage.id) {
				return page
			}
		}
	}

	for (let i = 0; i < page.config.buildingBlocks.length; i++) {
		if (page.config.buildingBlocks[i].type == "page-tile") {
			parent = traversePage(page.config.buildingBlocks[i].page, innerPage, parent)
		}
	}

	return parent
}

export function traversePage(page: any, innerPage: any, parent: any) {
	if (page.type == "blank") {
		parent = traversBlankPage(page, innerPage, parent)
	}

	return parent
}

export function findParent(page: any, innerPage: any) {
	return traversePage(page, innerPage, null)
}
