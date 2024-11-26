import { updateBlock } from "../../reducers/page-reducer"
import { DropStrategy } from "./drop-strategy"

function findPageById(page, targetId) {
	if (page.id === targetId) {
		return page
	}

	if (page.config && page.config.pages && Array.isArray(page.config.pages)) {
		for (const nestedPage of page.config.pages) {
			const result = findPageById(nestedPage, targetId)
			if (result) {
				return result
			}
		}
	}

	return null
}

export class ToolbarDropStrategy implements DropStrategy {
	execute(dropTarget, selectedBlocks, blocks, page, activeCarousel, dispatch, setDropTarget) {
		if (!dropTarget) return

		const dragIndex = selectedBlocks[0]?.index
		const hoverIndex = dropTarget.index

		if (dragIndex === hoverIndex) return

		const targetIndex = dropTarget.position === "top" ? hoverIndex : hoverIndex

		const filteredBlocks = blocks.filter((block) => block !== null)
		const [movedBlock] = filteredBlocks.splice(dragIndex, 1)
		filteredBlocks.splice(targetIndex, 0, movedBlock)

		const carouselPage = findPageById(page, activeCarousel)
		const targetPage = carouselPage || page

		dispatch(
			updateBlock({
				...targetPage,
				config: {
					...targetPage.config,
					buildingBlocks: filteredBlocks,
				},
			}),
		)
	}
}
